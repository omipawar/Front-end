import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project, statusPayload } from './model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  titleName = new BehaviorSubject<string>("Dashboard");
  baseUrl: string = `http://localhost:8081`;

  constructor(private http: HttpClient) { }

  getProjects(pageNo?: number, limit?: number, sortby?: string, searchText?: string) {
    let url = `${this.baseUrl}/project/getprojects`;
    if (searchText && sortby) {
      url += `?sortby=${sortby}&searchText=${searchText}`;
    } else if (pageNo && limit && sortby) {
      url += `?pageNo=${pageNo}&limit=${limit}&sortby=${sortby}`;
    }
    return this.http.get(url);
  }

  addProject(data: Project) {
    let url = `${this.baseUrl}/project/add`;
    return this.http.post(url, data);
  }

  updateStatus(data: statusPayload) {
    let url = `${this.baseUrl}/project/changeStatus`;
    return this.http.post(url, data);
  }

  dashboardCounts() {
    let url = `${this.baseUrl}/project/projectStatusCount`;
    return this.http.get(url);
  }
  graphCounts(){
    let url = `${this.baseUrl}/project/barGrahData`;
    return this.http.get(url);
  }

}
