import { Component, OnInit } from '@angular/core';
import { ToDoDataService } from '../service/data/to-do-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number
  todo: Todo

  constructor(private dataService: ToDoDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    this.todo = new Todo(this.id, '', false, new Date()); // Default Todo object

    if (this.id != -1) {
      this.dataService.retrieveTodoById('Rajat', this.id).subscribe(
        data => this.todo = data
      )
    }

  }

  saveTodo() {
    if (this.id == -1) {
      this.dataService.createTodo('Rajat', this.todo).subscribe(
        data => {
          console.log(data),
            this.router.navigate([`todos`]);
        }
      )
    } else {
      this.dataService.updateTodo('Rajat', this.id, this.todo).subscribe(
        data => {
          console.log(data),
            this.router.navigate([`todos`]);
        }

      )
    }
  }




}
