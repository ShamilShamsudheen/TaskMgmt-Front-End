import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  // standalone: true,
  // imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private toastr:ToastrService,
    private router:Router
  ){}
  logout(): void {
    localStorage.removeItem('userToken');
    this.toastr.success('Logout Successfully!', 'Success', { timeOut: 3000 })
    this.router.navigate(['/login'])
  }
  navigate() {
    this.router.navigate(['/groups'])
    }
}
