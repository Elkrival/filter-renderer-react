import React, { Component } from 'react';
import SelectedFilterComponent from './FilterElement'

class FilterJumbotron extends Component { 
    constructor(props){
        super(props)
        this.state = {
            opacity: 0, 
            hide: true,
            currentlySelected: null,
            selectedFilters: [],
            applyingFilters: []
        }
    }
    render() {
        const { data } = this.props;
        return(
            <div>
            <div className="filter--list--holder"> {this.handleDataFeed(data)}</div>
            <SelectedFilterComponent filters={this.state.selectedFilters} remove={this.handleRemove.bind(this)} clearAll={this.removeAllFilters.bind(this)}/>
                                      <button onClick={() => this.applyAllFilters(data)}>Apply</button>
            </div>
        )
    }
 handleDataFeed(feed) {
  return feed != null ? feed.map((filters, index) => 
  <div key={index}> 
  <button onClick={() => this.handleOpenFilter(filters.filterName)}>{filters.filterName}</button> 
  <div key={index} style={{opacity: 0}} ref={filters.filterName}>{this.handleFilterValues(filters.filterValues)}</div>
  </div>)
    :
  <div> Click Button</div>
 }
 handleOpenFilter(reference){
  this.handleCloseFilter(this.state.currentlySelected);
  this.refs[reference].style.opacity = 1;
  this.setState({ currentlySelected : reference},function(state) {
   return state
  })
 }
 handleFilterValues(filterValues) {
    return filterValues.map(filter => <button key={filter.id} disabled={!this.state.hide} ref={filter.displayName} onClick={() => this.handleFilterSelection(filter.displayName)}>{filter.displayName}</button>)
 }
 handleCloseFilter(reference) {
    return reference != null ?  this.refs[reference].style.opacity = this.state.opacity : null
 }
 handleFilterSelection(filter) {
 this.refs[filter].disabled = this.state.hide
  this.setState({ selectedFilters: [...this.state.selectedFilters, filter]}, function(state) {
      return state
  })
 }
 handleRemove(filter, filters) {
    let getIndex = filters.indexOf(filter);
    let tail = filters;
    this.refs[filter].disabled = !this.state.hide
     this.setState({ selectedFilters: [...this.state.selectedFilters.filter((el, index) => index !== getIndex)]}, function(){
    })
  }
  applyAllFilters(data) {
   return this.state.selectedFilters.map(el => {     
       let value = data.filter(element => (element.filterValues.find(filterData => filterData.displayName === el)))[0].filterValues.filter(value => value.displayName === el)[0].id
    return this.setState(previousState =>({applyingFilters :[...previousState.applyingFilters, value].filter((elem, pos, arr) => arr.indexOf(elem) == pos)}), function(){
        console.log(this.makeFilterObject(this.state.applyingFilters))
       return this.makeFilterObject(this.state.applyingFilters)
    })
  })
}
   makeFilterObject(filters) {
    return Array.isArray(filters) && filters.length ? filters.reduce((previousFilter, nextFilter) => `${previousFilter} OR ${nextFilter}`) : [];
  }
  removeAllFilters(filter) {
   filter.map(el => this.refs[el].disabled = !this.state.hide)
   this.setState((previousState) =>({ selectedFilters: []}))
   console.log(this.state.selectedFilters)
  }
}

export default FilterJumbotron