import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './App.css';

//get the data from graphQl API
import { Query } from "react-apollo";
import gql from "graphql-tag";
let year = 1;

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      year: 0,
      userPick: ''
    }
    this.showyearlyData = this.showyearlyData.bind(this);
    this.userPick = this.userPick.bind(this);
    }

    showyearlyData (yr) {
    console.log('showyearlyData', yr);
    this.setState({ year : yr})
    }

    userPick (e) {
      console.log('user picked ', e.target.value)
     // this.setState({userPick : 'test'})
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

    }
    const header = {
      padding: '10px',
      paddingBottom: '20px',
      border: '1px solid #ccc',
      margin: '15px',
      backgroundColor: '#ddd'
    
    }



    return (
      <ApolloProvider client={client}>
      <div style={header} className="navbar navbar-dark bg-dark shadow-sm">
        <h2>React > GraphQl > Apollo sample app</h2>
      </div>

      <div className="col-sm-12 sub-header" >
        &nbsp;<button onClick={() => this.showyearlyData(0)} type="button" className={"btn btn-lg " + (this.state.year === 0 ? 'btn-primary' : 'btn-default')}>2019</button>&nbsp;
        <button onClick={() => this.showyearlyData(1)} type="button" className={"btn btn-lg " + (this.state.year === 1 ? 'btn-primary' : 'btn-default')}>2018</button>&nbsp;
        <button onClick={() => this.showyearlyData(2)} type="button" className={"btn btn-lg " + (this.state.year === 2 ? 'btn-primary' : 'btn-default')}>2017</button>
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
        <div style={userTile} className="tile" >
         {/*  <input type="radio" id={modelName} value={modelName} onClick={this.userPick}/> */}
          <img width="200" src={` ${media.imageUrl}`} alt={modelName}/>
          <p><strong>{` ${modelName}, ${modelSalesYear}`}</strong> </p>
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
