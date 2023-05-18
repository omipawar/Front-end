import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../model';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  start!: NgbDateStruct;
  end!: NgbDateStruct;
  date!: { year: number, month: number };
  reasons: string[] = ["Business", "Dealership", "Transport"];
  types: string[] = ["Vender", "Internal", "External"];
  divisions: string[] = ["Compressor", "Filters", "Pumps", "Glass", "Water Heater"];
  categories: string[] = ["A", "B", "C", "D"];
  priorities: string[] = ["Low", "Medium", "High"];
  departments: string[] = ["Strategy", "Finance", "Quality", "Maintenance", "Store"];
  locations: string[] = ["Pune", "Delhi", "Mumbai"];
  projectForm!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl("", Validators.required),
      reason: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      division: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      priority: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", [Validators.required]),
      location: new FormControl("", Validators.required),
      status: new FormControl("Register", Validators.required)
    })
  }

  getDate(date: any) {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }

  creatProject(data: Project): void {
    // if (this.projectForm.valid) {
    //   let startDate: any = this.getDate(data.startDate);
    //   let endDate: any = this.getDate(data.endDate);
    //   data.startDate = startDate;
    //   data.endDate = endDate;
    //   this.dashboardService.addProject(data).subscribe((res: any) => {
    //     if (res.status) {
    //       this.reset();
    //     }
    //   })
    // }
    console.log(this.projectForm);

  }
  reset() {
    this.projectForm.markAsPristine();
    this.projectForm.markAsUntouched();
    let controlNames = ["projectName", "reason", "type", "division", "category", "priority", "department", "startDate", "endDate", "location", "status"];
    this.resetControl(controlNames);
  }

  resetControl(controls?: string[]) {
    for (let i = 0; i < controls!.length; i++) {
      this.projectForm.get(controls![i])?.setValue("");
    }
  }
  endDateSelected() {
    let startDate: any = this.getDate(this.projectForm.get('startDate')?.value);
    let endDate: any = this.getDate(this.projectForm.get('endDate')?.value);
    if(startDate && endDate && startDate>endDate){
      this.projectForm.controls['endDate'].setErrors({'lessThanStartDate': true});
    }

  }
}
