import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import { NoContentComponent } from "../no-content/no-content.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    NoContentComponent
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() isEmpty: boolean = false;


}
