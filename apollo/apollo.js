import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `http://203.151.136.127:10001/api/getFarmID/69d3a3a1-8448-4a02-9f32-0bcab693d351`,
  cache: new InMemoryCache(),
});

export default client;
