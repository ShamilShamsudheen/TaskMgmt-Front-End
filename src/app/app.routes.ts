import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './module/sign-in/sign-in.component';
import { SignUpComponent } from './module/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { ProjectsComponent } from './module/projects/projects.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'groups', component: DashboardComponent ,canActivate:[authGuard]},
  { path: 'groups/:groupId/projects', component: ProjectsComponent,canActivate:[authGuard]},
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}