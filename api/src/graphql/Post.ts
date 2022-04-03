import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("content");
    t.boolean("published");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("drafts", {
      type: "Post",
      async resolve(_root, _args, ctx) {
        return await ctx.db.post.findMany({ where: { published: false } });
      },
    });

    t.list.field("posts", {
      type: "Post",
      async resolve(_root, _args, ctx) {
        return await ctx.db.post.findMany({ where: { published: true } });
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createDraft", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const draft = await ctx.db.post.create({
          data: {
            title: args.title,
            content: args.content,
          },
        });
        return draft;
      },
    });

    t.nonNull.field("publish", {
      type: "Post",
      args: {
        draftId: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        try {
          const publishedDraft = await ctx.db.post.update({
            where: { id: args.draftId },
            data: { published: true },
          });

          return publishedDraft;
        } catch (error) {
          const prismaError = error as PrismaClientKnownRequestError;

          if (prismaError.code === "P2025") {
            throw new Error(`Post with id ${args.draftId} not found`);
          }

          throw new Error("An error occured");
        }
      },
    });
  },
});
