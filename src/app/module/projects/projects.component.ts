import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-projects',
  // standalone: true,
  // imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  private groupId?: number;
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
      console.log(this.groupId);
    });

    if (this.groupId) {
      this.apiService.projects(this.groupId)
        .subscribe(
          (res) => {
            
            this.ProjectData = res;
            console.log( "success",res);
            this.loading = false;
            console.log(this.loading);

          },
          (err) => {
            this.loading = false;
            console.error(err);
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

}
