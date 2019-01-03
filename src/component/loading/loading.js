import React, { Component } from 'react';
import './loading.css';
let width = 10;
let bar = width + ' %';

export default class Loading extends Component {
    render() {
      return (
       <div className="col-sm-12 loading">
       <div class="loader"> </div>
       </div>
      );
    }
  }