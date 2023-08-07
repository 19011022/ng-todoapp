import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://localhost:44340';
  allTodoes: any[];
  todoes: any[];
  completedTodoes: any[];

  fixLists() {
    this.allTodoes.sort((a, b) => (b.Priority - a.Priority))

    this.todoes = [];
    this.completedTodoes = [];

    this.allTodoes.forEach(todo => {
      if (todo.IsCompleted)
        this.completedTodoes.push(todo)
      else
        this.todoes.push(todo)
    });
  }

  constructor(private http: HttpClient, public deleteDialog : MatDialog, private authService: AuthService) {
    this.allTodoes = [];
  }

  // Yapılacaklar listesini getirmek için GET isteği gönderen metot
  getTodoes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/todoes/?username=${localStorage.getItem(this.authService.tokenKey)}`)
  }

  // Yapılacak getirmek için GET isteği gönderen metot
  getTodo(id : number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/todoes/${id}`)
  }

  // Yapılacaklar listesine yeni öğe eklemek için POST isteği gönderen metot
  postTodo(todo: any): Observable<any> {
    todo.username = localStorage.getItem(this.authService.tokenKey)
    return this.http.post<any>(`${this.baseUrl}/api/todoes`, todo)
  }

  // Yapılacakları güncellemek için PUT isteği gönderen metot
  putTodo(todo: any): Observable<any> {
    console.log(todo.Id);
    return this.http.put<any>(`${this.baseUrl}/api/todoes/${todo.Id}`, todo)
  }

  // Yapılacakları silmek için DELETE isteği gönderen metot
  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/todoes/${id}`)
  }
}
