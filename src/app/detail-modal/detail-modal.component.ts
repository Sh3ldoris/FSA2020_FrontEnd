import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Book} from '../models/book';
import {AuthService} from '../auth/auth.service';
import {LikedBook} from '../models/liked-book';
import {LikedBooksService} from '../services/liked-books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

  @Input() book: Book;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private likedBooksService: LikedBooksService,
              private router: Router) {}

  ngOnInit(): void {
  }

  get getAuthService() {
    return this.authService;
  }

  likeNewBook(book: Book) {
    if (!this.authService.isUserAdmin()) {
      this.likedBooksService.likeBook(book).subscribe(
        data => {
          book.isLiked = true;
        },
        error => {
          if (error.status === 403) {
            this.activeModal.close('Close click');
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
            this.activeModal.close('Close click');
            this.router.navigate(['/signin']);
          }
          console.log(error);
        });
    }
  }

}
