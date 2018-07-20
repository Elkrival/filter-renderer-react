import React, { Component } from 'react';

class SelectedFilterElement extends Component {
    constructor(props) {
        super(props); 
        this.state = {data : null }
    }
    
 render(){
     const {filters, remove, clearAll} = this.props
  return(
      <div>
      {this.handleRender(filters, remove)}
      <div>{filters.length ? <button onClick={() => clearAll(filters)}>Remove all </button> : null }</div>
      </div>
  )
 }
 handleRender(filters, handleRemove) {
   return filters.length ? filters.map(filter => <div key={filter}>{filter} <button onClick={() => handleRemove(filter, filters)}>Delete</button></div>) : <div>Sup</div>;
 }
}
export default SelectedFilterElement;