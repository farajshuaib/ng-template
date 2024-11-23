import {CommonModule, Location, NgOptimizedImage} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {MainLayoutRoutes} from '../../core/application/routes/main-layout-routes';
import {permissionStore} from '../../core/application/features/permissions/permissionStore';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {DropdownComponent} from "../../core/application/component/dropdown/dropdown.component";
import {AuthStore} from "../../core/application/features/auth/authStore";
import {BreadcrumbComponent} from "../../core/application/component/breadcrumb/breadcrumb.component";

@Component({
  standalone: true,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    RouterOutlet,
    NgOptimizedImage,
    DropdownComponent,
    BreadcrumbComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayoutComponent implements OnInit {
  protected expanded = true;
  protected readonly routes = MainLayoutRoutes.filter(x => x.path);
  protected permissionStore = inject(permissionStore)
  protected authStore = inject(AuthStore)


  constructor(private readonly location: Location, private readonly router: Router) {

  }

  ngOnInit(): void {
    this.permissionStore.getPermissions();
  }

  goBack() {
    this.location.back();
  }


  logout() {
    this.authStore.logout();
  }
}
