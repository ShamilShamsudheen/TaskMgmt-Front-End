import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../../modal/delete-conformation-modal/delete-conformation-modal.component';

export interface projectDto {
  projectName: String,
  projectDescription: String
}

@Component({
  selector: 'app-projects',
  // standalone: true,
  // imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projectIdToEdit!: number;
  showProjectEditForm: boolean = false;
  showProjectForm: boolean = false;
  newProject: projectDto = { projectName: '', projectDescription: '' };
  groupId!: number;
  loading: boolean = false;
  ProjectData: any;
  primaryColour: string | undefined = '#1976d2';
  secondaryColour: string | undefined;
  loadingTemplate!: TemplateRef<Element>;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }
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
            console.log("success", res);
            this.loading = false;
          }
        )
    }
  }
  OnClickHome(): void {
    this.router.navigate(['/groups'])
  }
  onCancel(): void {
    this.showProjectForm = false;
    this.showProjectEditForm = false;
  }
  onSubmit(mode: string, ProjectDto: projectDto): void {
    switch (mode) {
      case 'create':
        this.apiService.createProject(ProjectDto, this.groupId)
          .subscribe(
            (res) => {
              this.loading = true;
              this.toastr.success('Project Created Successfully!', 'Success', { timeOut: 3000 })
            },
            (err) => {
              console.log(err, "failed creation");
              this.toastr.error(`Failed Creation:${err}`, 'Failed', { timeOut: 3000 })
            }
          )
        this.showProjectForm = false;
        break;
      case 'update':
        this.apiService.updateProject(this.groupId, this.projectIdToEdit, ProjectDto)
          .subscribe(
            (res) => {
              this.toastr.success('Project Updated Successfully!', 'Success', { timeOut: 3000 })
              this.router.navigate([`/groups/${this.groupId}/projects`]);
            },
            (err) => {
              console.log(err, "failed creation");
              this.toastr.error(`Failed Creation:${err.value}`, 'Failed', { timeOut: 3000 })
            }
          )
        this.showProjectEditForm = false;
        break;
      default:
        // Handle default case
        break;
    }
  }
  onClickProjectCreate(): void {
    this.showProjectForm = true;
  }
  onClickView(projectId: number): void {
    this.router.navigate([`/groups/${this.groupId}/projects/${projectId}/tasks`])
  }
  onClickDelete(projectId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      panelClass: 'custom-dialog-panel'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.toastr.success('Delete Project!.', 'success', { timeOut: 3000 });
        this.apiService.deleteProject(this.groupId,projectId)
        .subscribe(
          (res)=>{
            console.log(res);
            this.loading = false;
          }
        )
      }
    })
  }
  onClickEdit(projectId: number) {
    this.projectIdToEdit = projectId
    this.apiService.project(this.groupId, projectId)
      .subscribe(
        (res) => {
          this.showProjectEditForm = true;
          this.newProject.projectName = res.projectName;
          this.newProject.projectDescription = res.projectDescription;
        }
      )
  }

}
