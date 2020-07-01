import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {LikedBook} from '../models/liked-book';
import {Book} from '../models/book';
import {element} from 'protractor';
import {BehaviorSubject, Observable} from 'rxjs';
import {Notes} from '../models/notes';

@Injectable({
  providedIn: 'root'
})
export class LikedBooksService {

  private baseUserUrl = 'api/user/';

  constructor(private tokenService: TokenService,
              private http: HttpClient) { }

  public getAllLikedBooks() {
    if (this.tokenService.getUsername() !== '' && this.tokenService.getAuthority() !== 'ADMIN') {
      return this.http.get<LikedBook[]>(this.baseUserUrl + 'books/all?username=' + this.tokenService.getUsername());
    }
  }

  public likeBook(book: Book) {
      return this.http.post<LikedBook>(this.baseUserUrl + 'books/like?username=' + this.tokenService.getUsername(), book);
  }

  public unlike(bookId: number) {
    return this.http.delete(this.baseUserUrl + 'books/unLike?bookId=' + bookId + '&username=' + this.tokenService.getUsername());
  }

  public updateNote(bookId: number, notes: Notes): Observable<LikedBook> {
    return this.http.put<LikedBook>(this.baseUserUrl + 'book/update-note?bookId=' + bookId + '&username='
      + this.tokenService.getUsername(), notes, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
