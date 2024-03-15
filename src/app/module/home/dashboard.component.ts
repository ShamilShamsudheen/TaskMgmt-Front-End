import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteConfirmationModalComponent } from '../../modal/delete-conformation-modal/delete-conformation-modal.component';
import { MatDialog } from '@angular/material/dialog';

export interface groupDto {
  GroupName: string
}

@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  showGroupDeleteConformation: boolean = false;
  groupIdToEdit!: number;
  groupNameToEdit: string = '';
  GroupDto: groupDto = { GroupName: '' };
  loading: boolean = false;
  showGroupForm: boolean = false;
  showGroupEditForm: boolean = false;
  groupName: string = '';
  GroupData: any;
  ngxLoadingAnimationTypes: any;
  loadingTemplate!: TemplateRef<Element>;
  secondaryColour: string | undefined = '#50e3c2;';
  primaryColour: string | undefined = '#1976d2';
  tertiaryColor: string | undefined = '#f93e3e;';
  constructor(
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.loading = true;
    const token = localStorage.getItem('userToken');
    if (token) {
      this.apiService.groups()
        .subscribe(
          (res) => {
            console.log("Success", res);
            this.GroupData = res;
            this.loading = false;
          }
        )
    } else {
      this.router.navigate(["/login"])
    }
  }
  OnclickView(groupId: number): void {
    this.router.navigate([`/groups/${groupId}/projects`]);
  }
  OnClickHome(): void {
    this.router.navigate(['/groups'])
  }
  onClickGroupCreate(): void {
    this.showGroupForm = !this.showGroupForm;
  }
  onSubmit(mode: string, groupName: string): void {
    this.GroupDto.GroupName = groupName;
    switch (mode) {
      case 'create':
        this.apiService.createGroup(this.GroupDto)
          .subscribe(
            (res) => {
              this.loading = true;
              this.toastr.success('Create Group Successfully!', 'Success', { timeOut: 3000 })
              this.router.navigate(['/groups']);
            },
            (err) => {
              this.toastr.error('failed create group', 'Error', { timeOut: 3000 })
            }
          );
        this.showGroupForm = false;
        break;
      case 'update':
        this.GroupDto.GroupName = groupName;
        this.apiService.updateGroup(this.groupIdToEdit, this.GroupDto)
          .subscribe(
            (res) => {
              this.loading = true;
              this.toastr.success('Updated Group  Name Successfully!', 'Success', { timeOut: 3000 })
              this.router.navigate(['/groups']);
            },
            (err) => {
              this.toastr.error('failed update group name.', 'Error', { timeOut: 3000 })
              console.log(err, 'failed update group name.');
            }
          )
        break;
      default:
        // Handle default case
        break;
    }
  }
  onCancel(): void {
    this.groupName = '';
    this.showGroupForm = false;
    this.showGroupEditForm = false;
  }
  OnclickDelete(groupId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent , {
      panelClass:'custom-dialog-panel'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loading = true;
        this.toastr.success('Delete Group!.','success',{timeOut:3000})
        this.apiService.deleteGroup(groupId)
        .subscribe(
          (res) =>{
            console.log(res);
            this.loading = false;
          }
        )
      }
    })
  }
  OnclickEdit(groupId: number) {
    this.loading = true;
    this.groupIdToEdit = groupId;
    this.apiService.group(groupId)
      .subscribe(
        (res) => {
          this.showGroupEditForm = true;
          this.groupName = res.groupName;
          this.loading = false;
        }
      )
  }
}
