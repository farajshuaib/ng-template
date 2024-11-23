import {Routes} from '@angular/router';
import {AuthLayoutRoutes} from './auth-layout-routes';
import {MainLayoutRoutes} from './main-layout-routes';
import MainLayoutComponent from "../../../layout/main-layout/main-layout.component";
import {AuthGuard} from "../guards/authGuard";
import {RoutesName} from "../../domain/constant/ERoutesName";
import {ForbiddenComponent} from "../../../pages/forbidden/forbidden.component";

export const routes: Routes = [
  {
    path: RoutesName.HOME,
    children: [
      ...AuthLayoutRoutes,
      {
        path: '',
        component: MainLayoutComponent,
        canActivateChild: [AuthGuard],
        children: MainLayoutRoutes,
      }
    ],
  },


  {
    path: RoutesName.Forbidden,
    component: ForbiddenComponent,
    data: {
      title: 'ليس لديك الصلاحية للوصول إلى هذه الصفحة',
      guest: true,
    }
  },
  {
    path: "**",
    redirectTo: "",
  },
];
