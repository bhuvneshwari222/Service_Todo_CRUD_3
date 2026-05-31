import { Inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: 'root'
})
export class SnackBarService{

    constructor(
        private _snackBar : MatSnackBar
    ){}
    openSnackbar(msg: string){
        this._snackBar.open(msg, 'Close', {
            data: msg,
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        })
    }
}