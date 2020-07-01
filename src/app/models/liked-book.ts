import {Book} from './book';
import {User} from './user';
import {ILikedBook} from '../interfaces/i-liked-book';
import {IBook} from '../interfaces/i-book';

export class LikedBook implements ILikedBook{
  notes: string;
  book: IBook;

}
