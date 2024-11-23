import {Component, HostListener} from '@angular/core';
import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  animations: [
    trigger('dropdownAnimation', [
      state('open', style({ opacity: 1, transform: 'scale(1)' })),
      state('closed', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('closed => open', [
        animate('400ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in')
      ]),
    ])
  ]
})
export class DropdownComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isOpen = false;
    }
  }
}
