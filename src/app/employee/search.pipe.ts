import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform 
{

  transform(items: any, filter: any, defaultFilter: boolean): any 
  {
   
    console.log(filter);
    console.log(defaultFilter);
    if (!filter){
      return items;
    }

    if (!Array.isArray(items))
    {
      
      return items;
    }

    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter); // get all keys of filter

      if (defaultFilter) { // if you give default filter like if i want filter data based on name by default
        return items.filter(item =>
            filterKeys.reduce((x, keyName) =>
                (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
          });
        });
      }
    }
  }
}
   /*

  }*/



