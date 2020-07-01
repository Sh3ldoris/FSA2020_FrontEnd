import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BooksService} from '../../services/books.service';
import {AuthService} from '../../auth/auth.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DetailModalComponent} from '../../detail-modal/detail-modal.component';
import {UpdateDetailModalComponent} from '../../update-detail-moda/update-detail-modal.component';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../services/token.service';
import {LikedBook} from '../../models/liked-book';
import {LikedBooksService} from '../../services/liked-books.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[];
  searchTitle: string;

  constructor(private bookService: BooksService,
              private authService: AuthService,
              private modalService: NgbModal,
              private tokenService: TokenService,
              private likedBooksService: LikedBooksService,
              private router: Router,
              private http: HttpClient) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.bookService.getAllBooks()
      .subscribe( data => {
        if (this.authService.isUserLoggedIn() && !this.authService.isUserAdmin()) {
          data.forEach((element) => {
            this.http.get<LikedBook>('api/user/book?id=' + element.id + '&username=' + this.tokenService.getUsername())
              .subscribe(
                (value) => {
                  if (value != null) {
                    element.isLiked = true;
                  } else {
                    element.isLiked = false;
                  }
                });
          });
        }
        this.books = data;
      },
        error => {
            if (error.status === 403) {
              this.router.navigate(['/signin']);
            }
        });

  }

  get getAuthService() {
    return this.authService;
  }


  openDetail(book: Book) {
    const modalRef = this.modalService.open(DetailModalComponent, { centered: true })
      .componentInstance.book = book;
  }

  updateDetail(book: Book) {
    const modalRef = this.modalService.open(UpdateDetailModalComponent, { centered: true });
    modalRef.componentInstance.book = book;
    modalRef.result.then(
      (result) => {
        if (result === 'Save click') {
          this.loadData();
        }
      },
      error => {
        if (error.status === 403) {
          this.router.navigate(['/signin']);
        }
        console.log(error.status);
      });
  }

  likeNewBook(book: Book) {
    if (!this.authService.isUserAdmin()) {
      this.likedBooksService.likeBook(book).subscribe(
        data => {
         book.isLiked = true;
        },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/signin']);
          }
          console.log(error.status);
        });
    }
  }

  unlikeBook(book: Book) {
    if (this.authService.isUserLoggedIn() && !this.authService.isUserAdmin()) {
      this.likedBooksService.unlike(book.id).subscribe(
          data => {
            book.isLiked = false;
          },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/signin']);
          }
          console.log(error);
        });
    }
  }

  deleteBook(id: number) {
    console.log(id);
    if (this.authService.isUserLoggedIn() && this.authService.isUserAdmin()) {
      this.bookService.deleteBook(id).subscribe(
        () => {
            this.loadData();
        }, error => {
          console.log(error);
        });
    }
  }

}
