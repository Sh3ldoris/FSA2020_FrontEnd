import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {BooksService} from '../services/books.service';
import {Book} from '../models/book';

@Component({
  selector: 'app-new-book-modal',
  templateUrl: './new-book-modal.component.html',
  styleUrls: ['./new-book-modal.component.scss']
})
export class NewBookModalComponent implements OnInit {

  form: FormGroup;
  isISBNUnique = true;
  isTitleUnique = true;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private router: Router,
              private bookService: BooksService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      plot: ['']
    });
  }

  submit() {
    const newBook = new Book();
    newBook.title = this.form.get('title').value;
    newBook.author = this.form.get('author').value;
    newBook.isbn = this.form.get('isbn').value;
    newBook.plot = this.form.get('plot').value;

    this.bookService.addBook(newBook)
      .subscribe(
        data => {
        },
        error => {
          if (error.status === 403) {
            this.router.navigate(['/login']);
          }
          if (error.status === 200) {
            this.activeModal.close('Save click');
          }
          if (error.status === 406) {
            console.log('chyba');
            this.isISBNUnique = false;
          }
          console.log('Updating failed: ' + error.error);
        });
  }

}
