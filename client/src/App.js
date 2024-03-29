import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleStory from "./pages/SingleStory";
import Signup from "./pages/Signup";
import Top5 from './pages/Top5'
import Userspage from './pages/Userspage'
import Donate from './pages/Donate'
import DonateSuccess from './pages/DonateSucess'

import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
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
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/story/:id" element={<SingleStory />} />
              <Route path='/Top5' element={<Top5/>} />
              <Route path='/Userspage' element={<Userspage/>} />
              <Route path='/Donate' element={<Donate/>}/>
              <Route path="/success" element={<DonateSuccess/>}/>
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
