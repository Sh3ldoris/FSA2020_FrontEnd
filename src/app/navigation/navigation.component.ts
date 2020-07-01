import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {TokenService} from '../services/token.service';
import {AuthService} from '../auth/auth.service';
import {LikedBooksService} from '../services/liked-books.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateDetailModalComponent} from '../update-detail-moda/update-detail-modal.component';
import {Router} from '@angular/router';
import {NewBookModalComponent} from '../new-book-modal/new-book-modal.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() menu: any[];
  navbarOpen = false;

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private modalService: NgbModal,
              private router: Router) {
  }

  get getTokenStorage() {
    return this.tokenService;
  }

  get getAuthService() {
    return this.authService;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openNewBookForm() {
    const modalRef = this.modalService.open(NewBookModalComponent, { centered: true });
    modalRef.result.then(
      () => {},
      error => {
        if (error.status === 403) {
          this.router.navigate(['/signin']);
        }
        console.log(error.status);
      });
  }


}
