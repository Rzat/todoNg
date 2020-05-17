import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ToDoDataService {

  constructor(
    private httpCLient: HttpClient
  ) { }

  retrieveAllTodos(username) {
    return this.httpCLient.get<Todo[]>(`${API_URL}/users/${username}/todos`);
    //console.log('executing hello bean service')
  }

  deleteTodo(username, id) {
    return this.httpCLient.delete(`${API_URL}/users/${username}/todos/${id}`);
    //console.log('executing hello bean service')
  }

  retrieveTodoById(username, id) {
    return this.httpCLient.get<Todo>(`${API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    return this.httpCLient.put(`${API_URL}/users/${username}/todos/${id}`, todo);
  }


  createTodo(username, todo) {
    return this.httpCLient.post(`${API_URL}/users/${username}/todos`, todo);
  }

}
