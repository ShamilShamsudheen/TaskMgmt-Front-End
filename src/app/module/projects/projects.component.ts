import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';


@Component({
  selector: 'app-projects',
  // standalone: true,
  // imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  private groupId?:number;

  ProjectData:any;
  constructor(private router:Router,private apiService:ApiService,private route:ActivatedRoute){}
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.groupId = parseInt(params['groupId'])
    });
    if(this.groupId){
      this.apiService.projects(this.groupId)
      .subscribe(
        (res) =>{
          this.ProjectData = res;
          console.log(res);
          
        },
        (err) =>{
          console.error(err);
          
        }
        )
      
    }
  }
  OnClickHome():void{
    this.router.navigate(['/groups'])
  }
  logout():void{
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
  }

}
