import {Component, Input} from '@angular/core';
import {CoreContentState} from "../../../domain/abstract/CoreContentState";
import {CoreContentStatus} from "../../../domain/constant/CoreContentStatus";
import {CommonModule, NgIf} from "@angular/common";
import {ContentState} from "../../../domain/models/contentState.model";
import {query} from "@angular/animations";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss'
})
export class AppContainerComponent {
  @Input() contentState: CoreContentState = new ContentState();

  protected readonly CoreContentStatus = CoreContentStatus;
  protected readonly screenX = screenX;
  protected readonly query = query;
  protected readonly Array = Array;
}
