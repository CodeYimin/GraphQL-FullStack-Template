import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft: Post;
  publish: Post;
};


export type MutationCreateDraftArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationPublishArgs = {
  draftId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  drafts: Array<Maybe<Post>>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type DraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type DraftsQuery = { __typename?: 'Query', drafts: Array<{ __typename?: 'Post', id?: string | null, content?: string | null, published?: boolean | null, title?: string | null } | null> };


export const DraftsDocument = gql`
    query Drafts {
  drafts {
    id
    content
    published
    title
  }
}
    `;

/**
 * __useDraftsQuery__
 *
 * To run a query within a React component, call `useDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDraftsQuery(baseOptions?: Apollo.QueryHookOptions<DraftsQuery, DraftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftsQuery, DraftsQueryVariables>(DraftsDocument, options);
      }
export function useDraftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftsQuery, DraftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftsQuery, DraftsQueryVariables>(DraftsDocument, options);
        }
export type DraftsQueryHookResult = ReturnType<typeof useDraftsQuery>;
export type DraftsLazyQueryHookResult = ReturnType<typeof useDraftsLazyQuery>;
export type DraftsQueryResult = Apollo.QueryResult<DraftsQuery, DraftsQueryVariables>;