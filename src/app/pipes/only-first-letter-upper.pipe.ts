import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyFirstLetterUpper',
})
export class OnlyFirstLetterUpperPipe implements PipeTransform {
  transform(value: string): unknown {
    return `${value[0].toUpperCase()}${value.substr(1)}`;
  }
}
