import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {
  }
}
