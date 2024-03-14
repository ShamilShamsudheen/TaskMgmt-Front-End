import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../../Services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  // standalone: true,
  // imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
primaryColour: string|undefined = '#1976d2';
secondaryColour: string|undefined;
loadingTemplate!: TemplateRef<Element>;
onClickView(arg0: any) {
throw new Error('Method not implemented.');
}
logout() {
  this.loading = true;
  localStorage.removeItem('userToken');
  this.toastr.success('Logout Successfully!', 'Success', { timeOut: 3000 })
  this.router.navigate(['/login'])
  this.loading = false;
}
OnClickHome() {
  this.router.navigate(['/groups'])
}
  public loading:boolean = false;
  taskData:any;
  private groupId!:number;
  private projectId!:number;
  constructor(
    private apiService:ApiService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService
    ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = parseInt(params['groupId']);
      this.projectId = parseInt(params['projectId']);
    })
    console.log(this.projectId,this.groupId,"groupId and projectId");
    this.loading= true;
    this.apiService.tasks(this.groupId,this.projectId)
    .subscribe(
      (res)=>{
       
        this.taskData = res;
        this.loading = false;
      }
    )
  }

}
