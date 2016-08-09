import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';


// Custom Event Emitter set up starts here: Step #1
// set up output for CEE: Step #2
  // input, output, and directives wrapped in []

@Component({
  selector: 'task-list',
  inputs: ['taskList'],
  outputs: ['onTaskSelect'],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template: `
  <task-display *ngFor="#currentTask of taskList"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task></new-task>
  `
})
// specify data type of CEE object in child component class declarataion: Step #3
// set constructor to instantiate: Step #4
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  constructor() {
    this.onTaskSelect = new EventEmitter();
  }
  // build emit method to ctrl when to send call to parent: Step #5
  taskClicked(clickedTask: Task): void {
    console.log(clickedTask, "from child");
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
}
