import { Component, Input } from '@angular/core';
import { ContentState } from '../../../domain/models/contentState.model';
import { CommonModule } from '@angular/common';
import { CoreContentStatus } from '../../../domain/constant/CoreContentStatus';
import { CoreContentState } from '../../../domain/abstract/CoreContentState';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() contentState: CoreContentState = new ContentState();

  protected readonly CoreContentStatus = CoreContentStatus;

}
