import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Center, ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <Flex p="2">
        <ColorModeSwitcher ml="auto" />
      </Flex>
      <Center>Hello world!</Center>
    </ChakraProvider>
  </ApolloProvider>
);
