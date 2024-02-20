import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';

@Component({
  selector: 'app-sign-in',
  // standalone: true,
  // imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  private Response?:string;
  loginForm!:FormGroup;
  constructor(private http:HttpClient,private formbuilder:FormBuilder,private router:Router,private apiService:ApiService){}
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    });
  }
  onSubmit():void{
    const userDetails = this.loginForm.value;
    if(this.loginForm.valid){
      const headers = new HttpHeaders({
        'Content-type' : 'application/json'
    });
      this.apiService.login(userDetails)
      .subscribe(
        (res) => {

          localStorage.setItem('userToken',res)
          this.router.navigate(["/groups"])
        },
        (err) =>{
          this.Response = err
        }
      ) 
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}
