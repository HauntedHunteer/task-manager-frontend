import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../_services/task.service";
import {AlertService} from "../_alert";
import {Task} from "../_models/task";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  task: Task | undefined;
  taskId: string = '';

  constructor(
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
          },
          (error) => {
            console.log(error.error);
            this.alertService.error(error.error.message);
          }
        )
      }
    )
  }

  deleteTask() {
    let doDelete: boolean = confirm('This will permanently delete task. Are you sure?');
    if (doDelete) {
      this.taskService.deleteTask(this.taskId).subscribe(
        data => {
          console.log(data);
          this.alertService.success('Task successfully deleted', this.alertOptions);
          this.router.navigate(['../../task-list'], { relativeTo: this.activatedRoute});
        },
        (error) => {
          console.log(error.error);
          this.alertService.error(error.error.message);
        }
      )
    }
  }
}
