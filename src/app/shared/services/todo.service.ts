import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Itodo, ItodoRes } from "../models/todo";


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    todosArr3 = [
        {
            todoItem: "Morning workout",
            todoID: "TD301"
        },
        {
            todoItem: "Complete homework",
            todoID: "TD302"
        },
        {
            todoItem: "Update resume",
            todoID: "TD303"
        },
        {
            todoItem: "Attend online lecture",
            todoID: "TD304"
        },
        {
            todoItem: "Prepare presentation",
            todoID: "TD305"
        }
    ];

    editTodoSub$ : Subject<Itodo> = new Subject<Itodo>()

    fetchTodo(): Observable<Itodo[]> {
        return of(this.todosArr3);
    }

    addTodo(newTodo: Itodo): Observable<ItodoRes<Itodo>> {
        this.todosArr3.unshift(newTodo);
        return of({
            msg: `The new todoItem ${newTodo.todoItem} is added successfully!!!`,
            data: newTodo
        })
    }

    removeTodo(removeId: string): Observable<ItodoRes<string>> {
        let getIndex = this.todosArr3.findIndex(t => t.todoID === removeId);
        let removeTodo = this.todosArr3.splice(getIndex, 1);
        return of({
            msg: `The todoItem ${removeTodo[0].todoItem} is removed!!!`,
            data: removeId
        })
    }

    updateTodo(updatedTodo: Itodo):Observable<ItodoRes<Itodo>>{
        let getIndex = this.todosArr3.findIndex(t => t.todoID === updatedTodo.todoID);
        this.todosArr3[getIndex] = updatedTodo;
        return of({
            msg: `The todoItem ${updatedTodo.todoItem} is updated!!`,
            data: updatedTodo
        })
    }
}