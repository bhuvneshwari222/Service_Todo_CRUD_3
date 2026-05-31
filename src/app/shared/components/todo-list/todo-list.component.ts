import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../models/todo';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackBarService } from '../../services/snackBar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoArr: Itodo[] = [];

  constructor(
    private _todoService: TodoService,
    private _matdialog: MatDialog,
    private _snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this._todoService.fetchTodo()
      .subscribe({
        next: resp => {
          this.todoArr = resp;
        }
      })
  }

  trackByTodoId(index: number, todo: Itodo) {
    return todo.todoID;
  }

  onRemove(removeID: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure ypu want to remove this todoItem with id ${removeID}`;
    config.width = '400px';
    config.disableClose = true;
    let dialogRef = this._matdialog.open(GetConfirmComponent, config)
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this._todoService.removeTodo(removeID)
              .subscribe({
                next: resp => {
                  this._snackBar.openSnackbar(resp.msg)
                },
                error: err => {
                  this._snackBar.openSnackbar(err.msg)
                }
              })
          }
        }
      })
  }

  onEdit(editTodo: Itodo) {
    this._todoService.editTodoSub$.next(editTodo);
  }
}
