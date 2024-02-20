import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/authService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  const IsLogged = authService.isAuthenticated();
  if(IsLogged){
    return true;
  }else{
    return false;
  }
  return true;
};
