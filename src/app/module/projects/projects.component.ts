import { Component, OnInit, TemplateRef } from '@angular/core';
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

  private groupId?: number;

  ProjectData: any;
  loading: boolean = false;
  primaryColour: string | undefined = '#1976d2';
  secondaryColour: string | undefined;
  loadingTemplate!: TemplateRef<Element>;
  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = parseInt(params['groupId'])
    });
    if (this.groupId) {
      this.loading = true;
      this.apiService.projects(this.groupId)
        .subscribe(
          (res) => {
            this.loading = false;
            this.ProjectData = res;
            console.log(res);

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
    this.router.navigate(['/login']);
    this.loading = false;
  }

}
