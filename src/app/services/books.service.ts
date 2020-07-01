import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TokenService} from './token.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = 'api/books/';
  private adminUrl = 'api/admin/';

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  public getAllBooks() {
    return this.http.get<Book[]>(this.baseUrl + 'all');
  }

  public updateBook(book: Book): Observable<Book> {
    if (this.auth.isUserAdmin()) {
      return this.http.put<Book>('api/admin/update', book, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  public deleteBook(id: number) {
    if (this.auth.isUserAdmin()) {
      return this.http.delete(this.adminUrl + 'delete?id=' + id);
    }

  }

  public addBook(newBook: Book) {
    if (this.auth.isUserAdmin()) {
      console.log('som tu');
      return this.http.post<any>(this.adminUrl + 'add', newBook);
    }
  }
}
