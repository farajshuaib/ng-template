import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";


export interface RowsOptions {
  hasView?: boolean;
  hasEdit?: boolean;
  hasDelete?: boolean;
  hasBlock?: boolean;
  hasActive?: boolean;
}

@Component({
  selector: 'app-table-actions',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './table-actions.component.html',
  styleUrl: './table-actions.component.scss',
})
export class TableActionsComponent {
  @Input() rowsOptions: RowsOptions = {
    hasView: false,
    hasEdit: false,
    hasDelete: false,
    hasBlock: false,
    hasActive: false
  };

  @Output() deleteEvent = new EventEmitter<string>();
  @Output() viewEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
  @Output() blockEvent = new EventEmitter<string>();
  @Output() activeEvent = new EventEmitter<string>();


  delete() {
    this.deleteEvent.emit();
  }

  view() {
    this.viewEvent.emit();
  }

  edit() {
    this.editEvent.emit();
  }

  block() {
    this.blockEvent.emit();
  }

  active() {
    this.activeEvent.emit();
  }


}
