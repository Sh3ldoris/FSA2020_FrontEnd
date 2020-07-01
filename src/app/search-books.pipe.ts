import { Pipe, PipeTransform } from '@angular/core';
import {Book} from './models/book';

@Pipe({
  name: 'searchBooks'
})
export class SearchBooksPipe implements PipeTransform {

  transform(value: Book[], searchTitle: string): Book[] {
    if (!searchTitle) {
      return value;
    }
    return value.filter(
      (book) => (book.title.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())) ||
                      (book.author.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())));
  }

}
