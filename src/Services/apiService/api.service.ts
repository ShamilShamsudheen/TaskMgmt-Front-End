import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectDto } from '../../app/module/projects/projects.component';
import { groupDto } from '../../app/module/home/dashboard.component';
export interface signUpData {
  name: string,
  email: string,
  password: string,
  groupName: string,
  refferalcode?: string
}

export interface createGroup {
  groupName: string
}
export interface loginData {
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  newGroup!: createGroup

  private baseUrl: string = 'https://localhost:7197/api/';

  constructor(private http: HttpClient) { }
  // Authentication
  signUp(reqdata: signUpData): Observable<any> {
    return this.http.post(`${this.baseUrl}signup`, reqdata, { responseType: 'text' });
  }
  login(reqdata: loginData): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, reqdata, { responseType: 'text' })
  }
  // Groups
  groups(): Observable<any> {
    return this.http.get(`${this.baseUrl}groups`);
  }
  createGroup(body: groupDto): Observable<any> {

    return this.http.post(`${this.baseUrl}groups`, body, { responseType: 'text' });
  }
  group(groupId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}groups/${groupId}`)
  }
  updateGroup(groupId: number, body: groupDto): Observable<any> {

    return this.http.patch(`${this.baseUrl}groups/${groupId}`, body, { responseType: 'text' })
  }
  deleteGroup(groupId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}groups/${groupId}`)
  }
  // Projects
  projects(groupId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}groups/${groupId}/projects`);
  }
  createProject(reqdata: projectDto, groupId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}groups/${groupId}/projects`, reqdata, { responseType: 'text' });
  }
  project(groupId: number, projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}groups/${groupId}/projects/${projectId}`)
  }
  updateProject(groupId: number, projectId: number, body: projectDto): Observable<any> {
    console.log(body,'body');
    
    return this.http.put(`${this.baseUrl}groups/${groupId}/projects/${projectId}`, body, { responseType: 'text' })
  }
  deleteProject(groupId: number, projectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}groups/${groupId}/projects/${projectId}`)
  }
  // Tasks
  tasks(groupId: number, projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}groups/${groupId}/projects/${projectId}/tasks`)
  }
}
