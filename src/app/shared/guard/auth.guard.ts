import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	path: ActivatedRouteSnapshot[];
	route: ActivatedRouteSnapshot;
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.auth.loggedIn()) {
			return true;
		} else {
			this.router.navigate([ '/login2' ]);
			return false;
		}
	}
}
