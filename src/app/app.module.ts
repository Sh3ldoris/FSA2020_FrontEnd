import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BooksComponent} from './pages/books/books.component';
import { HomeComponent } from './pages/home/home.component';
import {LocalStorageModule} from 'angular-2-local-storage';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { LikedBooksComponent } from './pages/liked-books/liked-books.component';
import {AuthInterceptor} from './auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { SearchBooksPipe } from './search-books.pipe';
import { UpdateDetailModalComponent } from './update-detail-moda/update-detail-modal.component';
import { LikeDetailModalComponent } from './like-detail-modal/like-detail-modal.component';
import { NewBookModalComponent } from './new-book-modal/new-book-modal.component';
import { SearchLikedBookPipe } from './search-liked-book.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    LoginFormComponent,
    NavigationComponent,
    RegistrationFormComponent,
    LikedBooksComponent,
    FooterComponent,
    DetailModalComponent,
    SearchBooksPipe,
    UpdateDetailModalComponent,
    LikeDetailModalComponent,
    NewBookModalComponent,
    SearchLikedBookPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    NgbModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
