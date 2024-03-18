import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../../Services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  // standalone: true,
  // imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  taskForm!:FormGroup;
  showTaskForm: boolean = false;
  onCancel() {
    this.showTaskForm = false;
  }
  onSubmit() {
    this.taskForm.valid ? console.log(this.taskForm.value):console.log("not valid");
    ;
    
  }
  primaryColour: string | undefined = '#1976d2';
  secondaryColour: string | undefined;
  loadingTemplate!: TemplateRef<Element>;
  onClickTaskCreate() {
    this.showTaskForm = true;
  }
  public loading: boolean = false;
  taskData: any;
  private groupId!: number;
  private projectId!: number;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      description:['',Validators.required],
      dueDate:['',Validators.required],
      assigneeMail:['',Validators.required],
      // createdBy:['',Validators.required],
      currentStatus:['',Validators.required],
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.groupId = parseInt(params['groupId']);
      this.projectId = parseInt(params['projectId']);
    })
    console.log(this.projectId, this.groupId, "groupId and projectId");
    this.loading = true;
    this.apiService.tasks(this.groupId, this.projectId)
      .subscribe(
        (res) => {

          this.taskData = res;
          this.loading = false;
        }
      )
  }

}
