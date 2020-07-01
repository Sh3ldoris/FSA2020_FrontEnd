import { Pipe, PipeTransform } from '@angular/core';
import {LikedBook} from './models/liked-book';

@Pipe({
  name: 'searchLikedBook'
})
export class SearchLikedBookPipe implements PipeTransform {

  transform(value: LikedBook[], searchTitle: string): LikedBook[] {
    if (!searchTitle) {
      return value;
    }
    return value.filter(
      (like) => (like.book.title.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())) ||
        (like.book.author.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase())));
  }

}
