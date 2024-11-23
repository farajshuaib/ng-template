import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth.service-layout',
  standalone: true,
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    NgOptimizedImage
  ],
})
export class AuthLayoutComponent {

}
