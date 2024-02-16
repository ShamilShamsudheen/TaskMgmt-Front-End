import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
// import {environment} from '../../../environments/environment'


@Component({
  selector: 'app-sign-up',
  // standalone: true,
  // imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  private Response?:string;
  public IsRefferal:Boolean=false;
  signupForm!: FormGroup;
  // domain!:environment.domain;
  constructor(private formBuilder: FormBuilder , private http:HttpClient,private router:Router,private apiService:ApiService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['Username', [Validators.required, Validators.minLength(4)]],
      email: ['email@mail.com', [Validators.required, Validators.email]],
      password: ['****',[Validators.required, Validators.minLength(8)]],
      groupName: ['Group Name',[Validators.required,Validators.minLength(5)]],
      // refferalCode:['',[Validators.required]]
    });
  }

  public onSubmit():void{
    
    const userDetails = this.signupForm.value;
    if(this.signupForm.valid){
      this.apiService.signUp(userDetails)
      .subscribe(
        (res) => {
          this.Response = res
          
          this.router.navigate(['/login']) 
        },
        (err) =>{
          this.Response = err
        }
      ) 
    }else{
      this.signupForm.markAllAsTouched();
    }
  }
  addRefferal():void{
    this.IsRefferal = !this.IsRefferal;
  }

}
