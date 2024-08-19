import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent {
  todos: any = []
  constructor(private http: HttpClient) {

  }
  async ngOnInit() {
    console.log('on init called')
    try {
      this.todos = await this.loadTodos()
      console.log(this.todos)
    }
    catch (e) {
      console.log('error on init')
    }
  }

  loadTodos() {
   console.log('load todos called')
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url))
  }
}
