import React, { Component } from 'react';
import  { filterers } from './filterDataObject';
import './App.css';
import FilterJumbotron from './filtersContainer'
import data from './data.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }
  
  render() {
    return (
      <div className="App">
        <button className="btn btn--orange" onClick={() => this.handleDataSubmit()}>Filters</button>
        <FilterJumbotron data={this.state.data}/>
      </div>
    );
  }
handleDataSubmit(){
 let filterDataResponse = data.facets.text.list.filter(el => el.displayName !== "Color")
  // let a = filterers(filterDataResponse);
  return this.setState((state)=> state.data = filterers(filterDataResponse))
}
}

export default App;
