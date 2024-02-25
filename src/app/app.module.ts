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
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#ffffff",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),
    ToastrModule.forRoot({
      timeOut: 30000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      
      iconClasses: {
        error: 'toast-error', 
        success: 'toast-success', 
      },
    }),
    BrowserAnimationsModule,
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:MyInterceptor,multi:true}],
  bootstrap:[AppComponent]
})
export class AppModule { }
