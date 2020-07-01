import {IBook} from '../interfaces/i-book';

export class Book implements IBook{
  public id: number;
  public title: string;
  public author: string;
  public plot: string;
  public isbn: string;
  public isLiked = false;
}
