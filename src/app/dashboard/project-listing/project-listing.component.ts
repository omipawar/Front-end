import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Project, statusPayload } from '../model';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;
  isMobileView: boolean = false;
  timer: any;
  searchText: string = "";
  sortBy: string = "reason";
  pageNo: number = 1;
  itemsPerPage: number = 10;
  totalProjects: number = 0;
  projects: Project[] = [];

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth < 576) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }

  }

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.getProjectData();
    this.onWindowResize();
  }

  pageChanged(e: number) {
    this.pageNo = e;
    this.getProjectData();
  }

  getSearchData(e: any) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // console.log(e.target.value);
      if (this.pageNo !== 1) this.pageNo = 1;
      this.getProjectData();
    }, 700);
  }

  getSortedData(e: any) {
    // console.log(e.target.value);
    this.getProjectData();
  }

  getProjectData() {
    if (this.searchText !== "" && this.sortBy !== "") {
      this.dashboardService.getProjects(this.pageNo, this.itemsPerPage, this.sortBy, this.searchText).subscribe((res: any) => {
        // console.log(res);
        this.projects = res.data;
        this.totalProjects = res.totalProjects;
      })
    } else if (this.pageNo && this.itemsPerPage && this.sortBy && this.searchText === "") {
      this.dashboardService.getProjects(this.pageNo, this.itemsPerPage, this.sortBy).subscribe((res: any) => {
        // console.log(res);
        this.projects = res.data;
        this.totalProjects = res.totalProjects;
      })
    }
  }

  changeStatus(currentStatus: string, statusToSet: string, id: string) {
    if (currentStatus !== statusToSet) {
      let data: statusPayload = {
        id: id,
        status: statusToSet
      }
      this.dashboardService.updateStatus(data).subscribe((res: any) => {
        if (res.status) {
          this.getProjectData();
          alert("Status updated...!")
        }
      })
    } else {
      alert("You are trying to update same status")
    }
  }


}
