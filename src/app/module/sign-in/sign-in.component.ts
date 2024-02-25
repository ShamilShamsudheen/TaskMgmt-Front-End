import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  // standalone: true,
  // imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;
  private Response?: string;
  loginForm!: FormGroup;
  constructor(private http: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
        this.toastrService.overlayContainer = this.toastContainer;
  }
  onSubmit(): void {
    const userDetails = this.loginForm.value;
    if (this.loginForm.valid) {
      const headers = new HttpHeaders({
        'Content-type': 'application/json'
      });
      this.apiService.login(userDetails)
        .subscribe(
          (res) => {

            localStorage.setItem('userToken', res)
            this.toastr.success('Login Successfully!', 'Success', { timeOut: 3000 })
            this.router.navigate(["/groups"])
          },
          (err) => {
            this.Response = err
          }
        )
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
// @ViewChild(ToastContainerDirective, { static: true })
//   toastContainer: ToastContainerDirective;

//   constructor(private toastrService: ToastrService) {}
//   ngOnInit() {
//     this.toastrService.overlayContainer = this.toastContainer;
//   }