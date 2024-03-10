import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
import { ToastrService } from 'ngx-toastr';

export interface projectDto{
  projectName:String,
  projectDescription:String
}

@Component({
  selector: 'app-projects',
  // standalone: true,
  // imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  showProjectForm:boolean = false;
  newProject:projectDto = {projectName:'',projectDescription:''};
  private groupId!: number;
  public loading: boolean = false;
  ProjectData: any;
  primaryColour: string | undefined = '#1976d2';
  secondaryColour: string | undefined;
  loadingTemplate!: TemplateRef<Element>;
  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute,private toastr:ToastrService) { }
  ngOnInit(): void {
    this.loading = true;
    console.log(this.loading);
    this.route.params.subscribe(params => {
      this.groupId = parseInt(params['groupId']);
    });

    if (this.groupId) {
      this.apiService.projects(this.groupId)
        .subscribe(
          (res) => {
            this.ProjectData = res;
            console.log( "success",res);
            this.loading = false;
          }
        )
    }
  }
  OnClickHome(): void {
    this.router.navigate(['/groups'])
  }
  logout(): void {
    this.loading = true;
    localStorage.removeItem('userToken');
    this.toastr.success('Logout Successfully!', 'Success', { timeOut: 3000 })
    this.router.navigate(['/login'])
    this.loading = false;
  }
  onCancel():void {
    this.showProjectForm = false;
  }
  onSubmit():void {
    console.log("submitted Project Details",this.newProject);
    this.apiService.createProject(this.newProject,this.groupId)
      .subscribe(
        (res) => {
          this.loading = true;
          this.toastr.success('Project Created Successfully!', 'Success', { timeOut: 3000 })
        },
        (err) => {
          console.log(err, "failed creation");
          this.toastr.success(`Failed Creation:${err}`, 'Failed', { timeOut: 3000 })
        }
      )
    this.showProjectForm = false;
  }
  onClickProjectCreate():void {
    this.showProjectForm = true;
  }
  onClickView(projectId:number):void{
    this.router.navigate([`/groups/${this.groupId}/projects/${projectId}/tasks`])
  }

}
