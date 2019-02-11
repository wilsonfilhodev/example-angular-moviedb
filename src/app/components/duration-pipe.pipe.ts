import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value && args && args === 'min') {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return minutes ? `${hours}h${minutes}min` : `${hours}h`;
    }
    return value;
  }
}
