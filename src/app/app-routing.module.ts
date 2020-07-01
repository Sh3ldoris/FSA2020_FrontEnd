import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksComponent} from './pages/books/books.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginFormComponent} from './pages/login-form/login-form.component';
import {RegistrationFormComponent} from './pages/registration-form/registration-form.component';
import {LikedBooksComponent} from './pages/liked-books/liked-books.component';


const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: LoginFormComponent},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'likes', component: LikedBooksComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
