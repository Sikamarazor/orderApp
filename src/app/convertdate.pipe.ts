import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'convertdate'
})
export class ConvertdatePipe implements PipeTransform {

  transform(values: any, dateText: any): any {
    console.log(values);
    return moment(values.toDate()).format('YYYY/MM/DD h:mm:ss a');
  }

}
