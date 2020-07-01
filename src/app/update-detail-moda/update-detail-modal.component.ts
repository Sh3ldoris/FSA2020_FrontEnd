import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../models/book';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BooksService} from '../services/books.service';


@Component({
  selector: 'app-update-detail-moda',
  templateUrl: './update-detail-modal.component.html',
  styleUrls: ['./update-detail-modal.component.scss']
})
export class UpdateDetailModalComponent implements OnInit {

  @Input() book: Book;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private router: Router,
              private bookService: BooksService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      isbn: [this.book.isbn, Validators.required],
      plot: [this.book.plot]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.book.title = this.form.get('title').value;
    this.book.author = this.form.get('author').value;
    this.book.isbn = this.form.get('isbn').value;
    this.book.plot = this.form.get('plot').value;

    this.bookService.updateBook(this.book)
      .subscribe(
        data => {},
        error => {
          console.log('Updating failed: ' + error);
        });
    this.activeModal.close('Save click');
  }

}
