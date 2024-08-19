import { Routes } from '@angular/router';
import { AllTodosComponent } from './components/all-todos/all-todos.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'todos', component:AllTodosComponent},
];
