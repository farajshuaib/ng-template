import {
  ActivatedRouteSnapshot, CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {RoutesName} from '../../domain/constant/ERoutesName';
import {AuthStore} from "../features/auth/authStore";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivateChild {
  private readonly authStore = inject(AuthStore);

  constructor(private readonly router: Router) {
  }


  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {


    if (this.authStore.userData()) {
      await this.router.navigate([RoutesName.HOME]);
      return false;
    }

    await this.authStore.getProfile()

    if (this.authStore.userData()) {
      await this.router.navigate([RoutesName.HOME]);
      return false;
    }



    document.getElementById('InitScreenDOM')?.remove()


    return true;
  }
}


