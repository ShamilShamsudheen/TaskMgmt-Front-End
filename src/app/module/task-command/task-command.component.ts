import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, newComment } from '../../../Services/apiService/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-command',
  // standalone: true,
  // imports: [],
  templateUrl: './task-command.component.html',
  styleUrl: './task-command.component.css'
})
export class TaskCommandComponent implements OnInit {
  private groupId!: number;
  private projectId!: number;
  private taskId!: number;
  taskData!: any;
  comments?:any;
  newComment:newComment = {command : ''}
  primaryColour: string | undefined = '#1976d2';
  secondaryColour: string | undefined;
  loadingTemplate!: TemplateRef<Element>;
  public loading: boolean = false;

  @ViewChild('commentForm') commentForm!: NgForm;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router:Router,
  ) { }
  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.groupId = parseInt(params['groupId']);
      this.projectId = parseInt(params['projectId']);
      this.taskId = parseInt(params['taskId']);
    })
    this.fetchTaskData();
    this.fetchTaskCommentData();
    this.loading = false;
  }

  onSubmit(comment: string) {
    this.newComment.command = comment;
    this.apiService.addComment(this.groupId,this.projectId,this.taskId,this.newComment)
    .subscribe(
      (res)=>{
        this.ngOnInit();
      }
    )
  }
  fetchTaskData(): void {
    this.apiService.task(this.groupId, this.projectId, this.taskId)
      .subscribe(
        (res) => {
          this.taskData = res;
        }
      )
  }
  fetchTaskCommentData(): void {
    this.apiService.taskComments(this.groupId,this.projectId,this.taskId)
    .subscribe(
      (res)=>{
        this.comments = res;
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
