import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/apiService/api.service';
import { ToastrService } from 'ngx-toastr';
export interface groupDto {
  groupName: string
}
@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  newGroup!: groupDto;
  public loading: boolean = false;
  showGroupForm: boolean = false;
  groupName!: string;
  GroupData: any;
  ngxLoadingAnimationTypes: any;
  loadingTemplate!: TemplateRef<Element>;
  secondaryColour: string | undefined;
  primaryColour: string | undefined = '#1976d2';;
  constructor(private router: Router, private apiService: ApiService,private toastr:ToastrService) { }
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
  logout(): void {
    localStorage.removeItem('userToken');
    this.toastr.success('Logout Successfully!', 'Success', { timeOut: 3000 })
    this.router.navigate(['/login'])
  }
  onClickGroupCreate(): void {
    this.showGroupForm = !this.showGroupForm;
  }

  onSubmit(): void {
    console.log("Submitted Group Name:", this.groupName);

    this.apiService.createGroup(this.groupName)
      .subscribe(
        (res) => {
          this.loading = true;
          this.router.navigate(['/groups']);
        },
        (err) => {
          console.log(err, "failed creation");

        }
      )
    this.showGroupForm = false;
  }

  onCancel(): void {
    this.groupName = '';
    this.showGroupForm = false;
  }

}
