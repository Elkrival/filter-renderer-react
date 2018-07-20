
    import data from './data.json';

    let head = data.facets.text.list.filter(el => el.displayName !== "Color");
    export function filters (func) {
        return function(filterResponse) {
          return func.apply(func, filterResponse)
        }
    }
    function getFilterObjectFromAPI() {
     const facets = Array.from(arguments);
     return propertyFunction(valueFunction(facets));
    }
    
    function propertyFunction(array) {
      return array.map(getFilterList)
    }
    function valueFunction(list) {
      return list.map(el => {
       return { 
        displayName: el.displayName, 
        facetName: el.facetName, 
        values: Array.from(el.values)
        .filter((el,index) => index % 2 === 0)
        .map((filter) => (setInitialFilterObject(filter, el.facetName)))
        }
      })
    }

          
    export const filterers = filters(getFilterObjectFromAPI);
    let keys = filterers(head).map(filter => Object.keys(filter))
    let sameAs = filterers(head).map((val, index) =>{
        for(const item in val) {
            return { [item]: Object.values(val[item]) }
        }
    })
    // console.log(sameAs)
     for(const key in filterers(head)) {
          for(const item in filterers(head)[key]) {
        //    console.log(item, filterers(head)[key][item])
         }
     }
   function getFilterList(facet) {
    return {  
        filterName: facet.displayName.split(' ').length > 1 ? 
        facet.displayName.split(' ')[1] : facet.displayName , filterValues: facet.values };
   }

   function setInitialFilterObject(filter, facetName){
    return filter.includes('_') ? ({ displayName: filter.split('_').length > 1 ? filter.split('_')[1] : filter, id: `${facetName}:"${filter}"`}) : { displayName: filter, id: `${facetName}:"${filter}"` }
   }