import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild,
  CanActivateFn, CanLoad,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {RoutesName} from '../../domain/constant/ERoutesName';
import {AuthStore} from "../features/auth/authStore";
import {AuthService} from "../services/auth.service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  private readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);

  constructor(private readonly router: Router) {
  }


  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {


    const permissions = route.data['permissions'] || [];

    if (!this.authService.getAccessToken()) {
      await this.router.navigate([RoutesName.AUTH, RoutesName.LOGIN]);
      return false;
    }

    if (!this.authStore.userData()) {
      await this.authStore.getProfile()
    }

    if (!this.authStore.userData()) {
      await this.router.navigate([RoutesName.AUTH, RoutesName.LOGIN]);
      return false;
    }

    // if (!this.authStore.hasPermissions(permissions)) {
    //   await this.router.navigate([RoutesName.Forbidden]);
    //   return false;
    // }

    document.getElementById('InitScreenDOM')?.remove()

    return true;
  }
}


