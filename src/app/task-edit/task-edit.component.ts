import { Component, OnInit } from '@angular/core';
import {Task} from "../_models/task";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../_services/task.service";
import {AlertService} from "../_alert";
import {TaskStatus} from "../_models/task-status";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
  });

  submitted = false;
  task: Task | undefined;
  taskId: string = '';
  taskStatus = TaskStatus;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      parameter => {
        this.taskId = parameter['id'];
        this.taskService.getTask(this.taskId).subscribe(
          data => {
            this.task = data;
            this.populateForm(this.task);
          },
          (error) => {
            console.log(error.error);
            this.alertService.error(error.error.message);
          }
        )
      }
    )

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      status: ['', Validators.required]
    })

  }

  get f() : { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  populateForm(task: Task) {
    this.f['name'].setValue(task.name);
    this.f['description'].setValue(task.description);
    this.f['status'].setValue(task.status);
  }

  onSubmit() {
    this.alertService.clear();
    this.submitted = true;

    if (this.form!.invalid) {
      return;
    }

    const taskToUpdate: Task = {
      taskId: this.taskId,
      name: this.f['name'].value,
      description: this.f['description'].value,
      status: this.f['status'].value,
      creationDate: this.task!.creationDate
    }

    this.taskService.editTask(taskToUpdate).subscribe(
      data => {
        console.log(data);
        this.alertService.success('Task updated successfully', this.alertOptions);
        this.router.navigate(['../../task-details/' + this.taskId], { relativeTo: this.activatedRoute});
      },
      (error) => {
        console.log(error.error);
        this.alertService.error(error.error.message);
      }
    )
  }
}
