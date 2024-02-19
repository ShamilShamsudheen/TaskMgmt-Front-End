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
  constructor(private router:Router,private apiService:ApiService,private route:ActivatedRoute){}
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      const id = params['id']
      
    });
    if(this.groupId){
      this.apiService.projects(this.groupId)
      .subscribe(
        (res) =>{
          console.log(res);
        }
      )
    }else{
      console.log("Tere is no Projects in this Group.");
      
    }
  }

}
