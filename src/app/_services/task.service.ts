import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../_models/task";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.API_URL + '/api/tasks/all', httpOptions);
  }

  getTask(taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(environment.API_URL + '/api/tasks/' + taskId, httpOptions);
  }

  createTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(environment.API_URL + '/api/tasks/add', newTask, httpOptions);
  }

  editTask(taskToUpdate: Task): Observable<Task> {
    return this.httpClient.put<Task>(environment.API_URL + '/api/tasks/update', taskToUpdate, httpOptions);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.httpClient.delete<void>(environment.API_URL + '/api/tasks/' + taskId, httpOptions);
  }
}
