import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from "./pages/Dashboard";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
// import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';


import Header from './components/Header';
import Footer from './components/Footer';

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
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Homepage />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
