import {Routes} from "@angular/router";
import {AuthLayoutComponent} from "../../../layout/auth-layout/auth-layout.component";
import {RoutesName} from "../../domain/constant/ERoutesName";
import {LoggedInGuard} from "../guards/loggedInGuard";


export const AuthLayoutRoutes: Routes = [
  {
    path: RoutesName.AUTH,
    component: AuthLayoutComponent,
    data: {guest: true},
    canActivateChild: [LoggedInGuard],
    children: [
      {
        path: RoutesName.LOGIN,
        title: 'تسجيل الدخول',
        data: {guest: true},
        loadComponent: () => import("../../../pages/login/login.component").then(m => m.LoginComponent)
      }
    ],
  },
];
