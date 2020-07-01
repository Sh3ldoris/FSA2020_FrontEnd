import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../models/book';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth/auth.service';
import {LikedBooksService} from '../services/liked-books.service';
import {Router} from '@angular/router';
import {LikedBook} from '../models/liked-book';
import {IBook} from '../interfaces/i-book';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Notes} from '../models/notes';

@Component({
  selector: 'app-like-detail-modal',
  templateUrl: './like-detail-modal.component.html',
  styleUrls: ['./like-detail-modal.component.scss']
})
export class LikeDetailModalComponent implements OnInit {

  @Input() like: LikedBook;
  isNoteUpdating = false;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private fb: FormBuilder,
              private likedBooksService: LikedBooksService,
              private router: Router) {
    this.form = this.fb.group({
      notes: []
    });
  }

  ngOnInit(): void {
  }

  unlikeBook(book: IBook) {
    if (!this.authService.isUserAdmin()) {
      this.likedBooksService.unlike(book.id).subscribe(
        data => {
          this.activeModal.close('Save click');
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

  addNote() {
    this.form = this.fb.group({
      notes : [this.like.notes]
    });
    this.isNoteUpdating = true;
  }

  updateNote() {
    const note = new Notes();
    note.notes = this.form.get('notes').value;
    this.likedBooksService.updateNote(this.like.book.id, note)
      .subscribe(response => {
        this.activeModal.close('Save click');
      }, error => {
        if (error.status === 403) {
          this.router.navigate(['/signin']);
        } else {
          console.log(error);
        }
      });
  }

}
