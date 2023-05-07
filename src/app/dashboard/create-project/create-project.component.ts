import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../model';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  start!: NgbDateStruct;
  end!: NgbDateStruct;
  date!: { year: number, month: number };
  reasons: string[] = [];
  types: string[] = [];
  divisions: string[] = [];
  categories: string[] = [];
  priorities: string[] = [];
  departments: string[] = [];
  locations: string[] = [];
  projectForm!: FormGroup;

  constructor(
    private calendar: NgbCalendar,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reasons = ["Business", "Dealership", "Transport"];
    this.types = ["Vender", "Internal", "External"];
    this.divisions = ["Compressor", "Filters", "Pumps", "Glass", "Water Heater"];
    this.categories = ["A", "B", "C", "D"];
    this.priorities = ["Low", "Medium", "High"];
    this.departments = ["Strategy", "Finance", "Quality", "Maintenance", "Store"];
    this.locations = ["Pune", "Delhi", "Mumbai"];

    this.createProjectForm();
  }

  createProjectForm(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl("", Validators.required),
      reason: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      division: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      priority: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      status: new FormControl("Register", Validators.required)
    })
  }

  getDate(date: any) {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }

  creatProject(data: Project): void {

    if (this.projectForm.valid) {
      let startDate: any = this.getDate(data.startDate);
      let endDate: any = this.getDate(data.endDate);

      data.startDate = startDate;
      data.endDate = endDate;

      // console.log(data);
      this.dashboardService.addProject(data).subscribe((res: any) => {
        if (res.status) {
          alert("Project added successfuly");
          this.reset();
        }
      })
    } else {
      alert("Please fill the project data first then submit..!")
    }
  }
  reset() {
    this.projectForm.markAsPristine();
    this.projectForm.markAsUntouched();
    this.resetControl("projectName");
    this.resetControl("reason");
    this.resetControl("type");
    this.resetControl("division");
    this.resetControl("category");
    this.resetControl("priority");
    this.resetControl("department");
    this.resetControl("startDate");
    this.resetControl("endDate");
    this.resetControl("location");
    this.resetControl("status");

  }

  resetControl(control: string) {
    return this.projectForm.get(control)?.setValue("");
  }

}
