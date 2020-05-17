import { Component, OnInit } from '@angular/core';
import { ToDoDataService } from '../service/data/to-do-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string
  // [
  //   new Todo(1, 'Learn to dance', false, new Date()),
  //   new Todo(2, 'Live happily', false, new Date()),
  //   new Todo(3, 'Learn  Angular', false, new Date())
  // ]

  //create objects in js
  // todo = {
  //   id: 1,
  //   description: 'Learn to dance'
  // }

  constructor(
    private todoDataService: ToDoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.retrieveAllTodo();
  }

  retrieveAllTodo() {
    this.todoDataService.retrieveAllTodos('rajat').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id) {
    console.log('iddddd ' + id);
    this.todoDataService.deleteTodo('rajat', id).subscribe(
      response => {
        console.log()
        this.message = `Deleted ${id} Successful`; this.retrieveAllTodo();
      }
    )

  }

  updateTodo(id) {
    console.log('iddddd ' + id);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }


}
