import { Component, OnInit } from '@angular/core';
import {Task} from "../_models/task";
import {TaskService} from "../_services/task.service";
import {AlertService} from "../_alert";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] | undefined;

  constructor(
    private taskService: TaskService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(
      data => {
          this.tasks = data;
      },
      (error) => {
        console.log(error.error);
        this.alertService.error(error.error.message);
      }
    );
  }
}
