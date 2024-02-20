import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './module/sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './module/sign-in/sign-in.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { MyInterceptor } from './Interceptor/interceptor.interceptor';
import { DashboardComponent } from './module/home/dashboard.component';
import { ProjectsComponent } from './module/projects/projects.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    ProjectsComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:MyInterceptor,multi:true}],
  bootstrap:[AppComponent]
})
export class AppModule { }
