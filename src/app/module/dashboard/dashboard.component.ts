import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';

@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  showGroupCreateForm:boolean = false;  
  GroupData:any;
  constructor(private router:Router,private apiService:ApiService){}
  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if(token){
      this.apiService.groups()
      .subscribe(
        (res) =>{
          console.log("Success",res);
          
          this.GroupData = res;
        }
      )
    }else{
      this.router.navigate(["/login"])
    }
    
  }
  OnclickView(groupId:number):void{
    this.router.navigate([`/groups/${groupId}/projects`]);
  }
  OnClickHome():void{
    this.router.navigate(['/groups'])
  }
  logout():void{
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
  }
  onClickGroupCreate():void{
    this.showGroupCreateForm = !this.showGroupCreateForm;
  }

}
