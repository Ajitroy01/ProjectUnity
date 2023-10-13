import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser: User | null = this.authService.currentUserValue;

    if (currentUser) {
      const requiredRole = route.data['requiredRole'] as string;

      if (requiredRole && currentUser.role !== requiredRole) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
