import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface signUpData {
  name:string,
  email:string,
  password:string,
  groupName:string,
  refferalcode?:string
}
export interface createGroup {
  groupName:string
}
export interface loginData {
  email:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  newGroup!:createGroup

  private baseUrl:string = 'https://localhost:7197/api/';

  constructor(private http:HttpClient) { }

  signUp(reqdata:signUpData):Observable<any>{
    return this.http.post(`${this.baseUrl}signup`, reqdata, { responseType: 'text' });
  }
  login(reqdata:loginData):Observable<any>{
    return this.http.post(`${this.baseUrl}login` , reqdata , {responseType: 'text'})
  }
  groups():Observable<any>{
    return this.http.get(`${this.baseUrl}groups`);
  }
  projects(groupId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}groups/${groupId}/projects`)
  }
  createGroup(reqdata:string):Observable<any>{
    const body = {
      groupName : reqdata
    }
    return this.http.post(`${this.baseUrl}groups`,body,{responseType:'text'});
  }
}
