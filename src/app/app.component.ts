import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public IsLogged:boolean = false;
  constructor(
    private router:Router,
    private toastr:ToastrService,
    ){}
  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if(token){
      this.IsLogged = true;
    }
  }
  // logout(): void {
  //   localStorage.removeItem('userToken');
  //   this.toastr.success('Logout Successfully!', 'Success', { timeOut: 3000 })
  //   this.router.navigate(['/login'])
  // }
  title = 'Taskmgmt-FrontEnd';

}
