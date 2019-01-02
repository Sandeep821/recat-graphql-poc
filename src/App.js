import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './App.css';

//get the data from graphQl API
import { Query } from "react-apollo";
import gql from "graphql-tag";
let year = 1;

class App extends Component {

  constructor () {
    super()
    this.state = {
      year: 0
    }
    this.showyearlyData = this.showyearlyData.bind(this)
    }

    showyearlyData (yr) {
    console.log('showyearlyData', yr);
    this.setState({ year : yr})
    }

  render() {
    const client = new ApolloClient({
      uri: "/vehicle/graphql/",
      fetchOptions: {
        mode: 'no-cors'
    }
    });

    const userTile = {
      color: '#333',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid'
    }
    const header = {
      padding: '10px',
    }



    return (
      <ApolloProvider client={client}>
      <div style={header}>
        <h2>REACT GRAPHQL Apollo sample app</h2>
      <div>
      &nbsp;<button onClick={() => this.showyearlyData(0)} type="button" class="btn btn-lg btn-primary">2019</button> &nbsp;
      <button onClick={() => this.showyearlyData(1)} type="button" class="btn btn-lg btn-default">2018</button>&nbsp;
      <button onClick={() => this.showyearlyData(2)} type="button" class="btn btn-lg btn-default">2017</button>

    </div>
    </div>

    <Query
    query={gql`
    {
      GetModelTrimsByYear(brand:VW, country:USA, modelSalesYears:["2019", "2018", "2019"]){
        data{
          salesYear,
          modelTrims{
            data{
              modelName,
              modelSalesYear,
              media{
                imageUrl
              }
            }
          }
        }
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      console.log('got the data', data.GetModelTrimsByYear.data[year].modelTrims.data);
     return data.GetModelTrimsByYear.data[this.state.year].modelTrims.data.map(({ modelName, modelSalesYear, media }) => (
       <div className="">
        <div className="col-sm-3">
        <div  style={userTile} >
        <img width="200" src={` ${media.imageUrl}`} alt={modelName}/>
          <p><strong>{` ${modelName} ${modelSalesYear}`}</strong> </p>
        </div>
        </div>
       </div>
       
        
      ));
    }}
  </Query>
    </ApolloProvider>
   
    );
  }
}

export default App;
