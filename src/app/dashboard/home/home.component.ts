import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isDashboard: boolean = true;
  isProject: boolean = false;
  isCreateProject: boolean = false;
  title: string = "";
  routeSubscription: Subscription | undefined;
  dashboard: Subscription | undefined;
  route: string = "";

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.dashboard = this.dashboardService.titleName.subscribe((res: any) => {
      this.title = res;
    });

    this.route = this.router.url;
    if (this.route.split("/").includes("create-project")) {
      this.isCreateProject = true;
      this.isDashboard = false;
      this.isProject = false;
      this.dashboardService.titleName.next("Create Project");
    } else if (this.route.split("/").includes("project-listing")) {
      this.isProject = true;
      this.isCreateProject = false;
      this.isDashboard = false;
      this.dashboardService.titleName.next("Project Listing");
    } else if (this.route.split("/").includes("dashboard")) {
      this.isDashboard = true;
      this.isProject = false;
      this.isCreateProject = false;
      this.dashboardService.titleName.next("Dashboard");
    } else {
      this.router.navigate(['/dashboard']);
      this.isDashboard = true;
      this.isProject = false;
      this.isCreateProject = false;
      this.dashboardService.titleName.next("Dashboard");
    }
  }

  select(which: string) {
    if (which === 'dashboard') {
      if (!this.isDashboard) {
        this.isDashboard = true;
        this.isProject = false;
        this.isCreateProject = false;
        this.dashboardService.titleName.next("Dashboard");
        this.router.navigate(['dashboard']);
      }
    } else if (which === 'project') {
      if (!this.isProject) {

        this.isProject = true;
        this.isCreateProject = false;
        this.isDashboard = false;
        this.dashboardService.titleName.next("Project Listing");
        this.router.navigate(['dashboard/project-listing']);
      }
    } else if (which === 'create-project') {
      if (!this.isCreateProject) {

        this.isCreateProject = true;
        this.isDashboard = false;
        this.isProject = false;
        this.dashboardService.titleName.next("Create Project");
        this.router.navigate(['dashboard/create-project']);
      }
    } else {
      alert("Please click proper option");
    }

  }
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.dashboard?.unsubscribe();
  }

}
