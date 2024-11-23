import {CommonModule} from '@angular/common';
import {Attribute, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ContentState} from '../../../domain/models/contentState.model';
import {CoreContentState} from '../../../domain/abstract/CoreContentState';
import {CoreContentStatus} from '../../../domain/constant/CoreContentStatus';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnChanges {
  @Input() contentState: CoreContentState = new ContentState();
  @Input() title: string = '';
  @Input() disabled = false;
  @Input() class = '';


  shake = false;

  protected readonly CoreContentStatus = CoreContentStatus;


  constructor(
    @Attribute('type') public type: string = 'button',
  ) {
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentState'] && changes['contentState'].currentValue) {
      this.checkForError(changes['contentState'].currentValue);
    }
  }

  checkForError(contentState: CoreContentState) {
    if (contentState.status === CoreContentStatus.error) {
      this.triggerShake();
    }
  }

  triggerShake() {
    this.shake = true;
    setTimeout(() => (this.shake = false), 800);
  }

}
