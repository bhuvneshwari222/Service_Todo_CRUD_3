import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { SnackBarService } from '../../services/snackBar.service';
import { Itodo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  isineditMode: boolean = false;
  @ViewChild('todoForm') todoForm !: NgForm
  editTodoObj !: Itodo

  constructor(
    private _todoService: TodoService,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getEditTodo()
  }

  getEditTodo() {
    this._todoService.editTodoSub$.subscribe({
      next: resp => {
        this.editTodoObj = resp;
        this.isineditMode = true;
        this.todoForm.form.patchValue(this.editTodoObj);
      },
      error: err => {
        this._snackBar.openSnackbar(err.msg);
      }
    })
  }

  onSubmit() {
    if (this.todoForm.valid) {
      let newTodo = { ...this.todoForm.form.value, todoID: Date.now().toString() }
      this._todoService.addTodo(newTodo)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackbar(resp.msg);
            this.todoForm.resetForm();
          },
          error: err => {
            this._snackBar.openSnackbar(err.msg)
          }
        })
    }
  }

  updateTodo() {
    if (this.todoForm.form.valid) {
      let updatedTodo: Itodo = { ...this.todoForm.value, todoID: this.editTodoObj.todoID }
      this._todoService.updateTodo(updatedTodo)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackbar(resp.msg);
            this.todoForm.resetForm();
            this.isineditMode = false
          }
        })
    }
  }

}
