import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './module/sign-in/sign-in.component';
import { SignUpComponent } from './module/sign-up/sign-up.component';
import { ProjectsComponent } from './module/projects/projects.component';
import { AuthGuard } from './Gards/authGard/auth.guard';
import { LoginGuard } from './Gards/loginGard/login.guard';
import { DashboardComponent } from './module/home/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent ,canActivate:[LoginGuard]},
  { path: 'signup', component: SignUpComponent },
  { 
    path: 'groups', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'groups/:groupId/projects', 
    component: ProjectsComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
