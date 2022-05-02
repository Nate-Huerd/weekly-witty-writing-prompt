import React from 'react';
import './App.css';
import Dashboard from "./pages/Dashboard";
import Homepage from './pages/Homepage';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';





const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    {/* <Dashboard /> */}
    <Homepage />
    </ApolloProvider>
  );
}

export default App;
