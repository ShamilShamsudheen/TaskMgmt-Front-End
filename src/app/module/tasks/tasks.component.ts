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


  taskForm!: FormGroup;
  showTaskForm: boolean = false;
  primaryColour: string | undefined = '#1976d2';
  secondaryColour: string | undefined;
  loadingTemplate!: TemplateRef<Element>;
  public loading: boolean = false;
  taskData!: any;
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
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      assigneeMail: ['', Validators.required],
      // createdBy:['',Validators.required],
      currentStatus: ['', Validators.required],
    })
  }

  onClickTaskCreate() {
    this.showTaskForm = true;
  }
  onCancel() {
    this.showTaskForm = false;
  }
  onSubmit() {
    this.taskForm.valid ? console.log(this.taskForm.value) : console.log("not valid");
  }
  OnclickView(taskId: number) {
    this.router.navigate([`groups/${this.groupId}/projects/${this.projectId}/tasks/${taskId}/comments`])
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
  getStatusColor(status: string) {
    switch (status) {
      case 'not started':
        return 'orange';
      case 'in progress':
        return 'yellow';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  }

}
