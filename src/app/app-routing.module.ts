import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./_helpers/auth.guard";
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskDetailsComponent} from "./task-details/task-details.component";
import {TaskCreateComponent} from "./task-create/task-create.component";
import {TaskEditComponent} from "./task-edit/task-edit.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'task-list', component: TaskListComponent },
      { path: 'task-create', component: TaskCreateComponent },
      { path: 'task-details', component: TaskDetailsComponent },
      { path: 'task-edit', component: TaskEditComponent },
    ] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
