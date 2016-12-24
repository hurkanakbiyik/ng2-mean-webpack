import {Component} from 'angular2/core';

import {TodoService} from './todo.service';

// We `import` `http` into our `TodoService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from 'angular2/http';

// Import NgFor directive
import {NgFor} from 'angular2/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'todo',
    // Let Angular 2 know about `Http` and `TodoService`
    template: require('./todo.html'),
    providers: [...HTTP_PROVIDERS, TodoService]
})
export class Todo {

  // Initialize our `todoData.text` to an empty `string`
  todoData = {
    text: ''
  };

  price: number = 0.0;
  socket = null;
  bidValue = '';

  private todos: Array<Todo> = [];

  constructor(public todoService: TodoService) {
    console.log('Todo constructor go!');

      //this.todos = [];
      todoService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.todos = res;
            // Reset `todo` input
            this.todoData.text = '';
        });
/*
    this.socket = io('http://localhost:8080');
    this.socket.on('priceUpdate', function(data){
      this.price = data;
    }.bind(this));
*/
  }

  bid(){
    this.socket.emit('bid', this.bidValue);
    this.bidValue = '';
  }

  createTodo() {

      this.todoService.createTodo(this.todoData)
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.todos = res;
            // Reset `todo` input
            this.todoData.text = '';
        });
  }

  deleteTodo(id) {

    this.todoService.deleteTodo(id)
      .subscribe((res) => {

          // Populate our `todo` array with the `response` data
          this.todos = res;
      });
  }
}
