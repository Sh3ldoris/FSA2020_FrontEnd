import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Book} from '../../models/book';
import {LikedBook} from '../../models/liked-book';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LikedBooksService} from '../../services/liked-books.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[];
  slides: any = [[]];
  userButtons: any[] = [
    {url: '/signin'},
    {url: '/registration'}];

  constructor(private authService: AuthService,
              private bookService: BooksService,
              private http: HttpClient,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadData();
  }

  get getAuthService() {
    return this.authService;
  }

  private loadData() {
    this.bookService.getAllBooks()
      .subscribe( data => {
          this.books = data;
        },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/signin']);
          }
        });

  }

}
