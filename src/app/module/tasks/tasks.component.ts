import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../../Services/apiService/api.service';
import { ActivatedRoute } from '@angular/router';

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
throw new Error('Method not implemented.');
}
OnClickHome() {
throw new Error('Method not implemented.');
}
  public loading:boolean = false;
  taskData:any;
  private groupId!:number;
  private projectId!:number;
  constructor(
    private apiService:ApiService,
    private route:ActivatedRoute
    ){}
  ngOnInit(): void {
    // this.loading = true;
    this.route.params.subscribe(params => {
      this.groupId = parseInt(params['groupId']);
      this.projectId = parseInt(params['projectId']);
    })
    console.log(this.projectId,this.groupId,"groupId and projectId");
    
    this.apiService.tasks(this.groupId,this.projectId)
    .subscribe(
      (res)=>{
        this.loading= true;
        this.taskData = res;
        console.log(res,"response for task page",this.loading);
        this.loading = false;
      }
    )
  }

}
