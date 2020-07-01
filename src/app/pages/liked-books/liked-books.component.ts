import { Component, OnInit } from '@angular/core';
import {LikedBook} from '../../models/liked-book';
import {LikedBooksService} from '../../services/liked-books.service';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {LikeDetailModalComponent} from '../../like-detail-modal/like-detail-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-liked-books',
  templateUrl: './liked-books.component.html',
  styleUrls: ['./liked-books.component.scss']
})
export class LikedBooksComponent implements OnInit {

  likedBooks: LikedBook[];
  searchTitle: string;

  constructor(private likedBooksService: LikedBooksService,
              private authService: AuthService,
              private router: Router,
              private modalService: NgbModal) {
    this.loadData();
  }

  ngOnInit(): void {
  }

  private loadData() {
    this.likedBooksService.getAllLikedBooks()
      .subscribe(data => {
        this.likedBooks = data;
      });
  }

  get getAuthService() {
    return this.authService;
  }

  openDetail(like: LikedBook) {
    const modalRef = this.modalService.open(LikeDetailModalComponent, { centered: true });
    modalRef.componentInstance.like = like;
    modalRef.result.then(
      (result) => {
        if (result === 'Save click') {
          this.loadData();
        }
      }, error => {});
  }

  unlikeBook(like: LikedBook) {
    if (!this.authService.isUserAdmin()) {
      console.log(like.book.id);
      this.likedBooksService.unlike(like.book.id).subscribe(
        data => {
          this.loadData();
        },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/signin']);
          }
          console.log(error);
        });
    }
  }




}
