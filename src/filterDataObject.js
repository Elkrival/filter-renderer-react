
    import data from './data.json';

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
        .map((filter) => (el.facetName.toLowerCase()).includes('color') ? setColorsFilterMap(filter, el.facetName) :setInitialFilterObject(filter, el.facetName))
        }
      })
    }

          
    export const filterers = filters(getFilterObjectFromAPI);
    let keys = filterers(data).map(filter => Object.keys(filter))
    let sameAs = filterers(data).map((val, index) =>{
        for(const item in val) {
            return { [item]: Object.values(val[item]) }
        }
    })
     for(const key in filterers(data)) {
          for(const item in filterers(data)[key]) {
            filterers(data)[key]
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
   function setColorsFilterMap(filter, facetName) {
       return {
           displayName: filter,
           id: `${facetName}:"${filter}"`,
           imagePath: `https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/category/color-swatches/${filter}.gif`
       }
   }