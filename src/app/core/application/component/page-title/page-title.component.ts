import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() buttonLabel?: string;

  @Output() actionClicked = new EventEmitter<void>();

  protected onActionClicked() {
    this.actionClicked.emit();
  }
}
