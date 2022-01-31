import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../_alert";
import {TaskService} from "../_services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../_models/task";
import {TaskStatus} from "../_models/task-status";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
    })
  }

  get f() : { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  onSubmit() {
    this.alertService.clear();
    this.submitted = true;

    if (this.form!.invalid) {
      return;
    }

    const newTask: Task = {
      taskId: '',
      name: this.f['name'].value,
      description: this.f['description'].value,
      status: TaskStatus.CREATED,
      creationDate: ''
    }

    this.taskService.createTask(newTask).subscribe(
      data => {
        console.log(data);
        this.alertService.success('Task created successfully', this.alertOptions);
        this.router.navigate(['../task-list'], { relativeTo: this.activatedRoute});
      },
      (error) => {
        console.log(error.error);
        this.alertService.error(error.error.message);
      }
    )
  }

}
