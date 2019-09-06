import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import Routes from './routes';
import GlobalStyles from './styles/global';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: 'bearer b3bfc2a67f101c3af17611ea6fd76db761bb23d4'
    }
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Routes />
    </ApolloProvider>
  );
}

export default App;
