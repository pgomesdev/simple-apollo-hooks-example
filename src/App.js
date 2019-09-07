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
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
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
