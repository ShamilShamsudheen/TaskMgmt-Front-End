import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.css'
})
export class GroupFormComponent implements OnInit{
  groupCreateForm!:FormGroup;
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.groupCreateForm = this.formBuilder.group({
      groupName: ['',[Validators.required,Validators.minLength(4)]],
    })
  }
}
