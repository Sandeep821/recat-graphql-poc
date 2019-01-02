import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import logo from './logo.svg';
import './App.css';

//get the data from graphQl API
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { reduce } from 'async';

class App extends Component {
  render() {
    const client = new ApolloClient({
      uri: "https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex"
    });

    const userTile = {
      color: '#333',
      padding: '10px',
      margin: '10px',
      border: '1px solid'
    }
    return (
      <ApolloProvider client={client}>
      <div>
        <h2>Employee Info Apollo app</h2>
      </div>

       <Query
    query={gql`
      {
        allUsers {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.allUsers.map(({ id, name }) => (
        <div key={id} style={userTile} >
          <p><strong>Employee ID : </strong> {`${id}`}</p>
          <p><strong>Emplyee Name : </strong> {` ${name}`}</p>
        </div>
      ));
    }}
  </Query>
    </ApolloProvider>
      
    );
  }
}

export default App;
