import React from 'react';
import Dashboard from "./pages/Dashboard";
// import Homepage from './pages/Homepage';

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
       <div className="flex-column justify-flex-start min-100-vh">
         {/* <Header /> */}
         <div className="container">
    {/* <Homepage />  */}
    <Dashboard />
    </div>
    {/* <Footer /> */}
    </div>
    </ApolloProvider>
  );
}

export default App;
