
import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  await authService.checkAuthState();  // Ensure the auth state is checked

  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }
  return true;
};
