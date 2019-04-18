import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-login',
	templateUrl: './login2.component.html'
})
export class Login2Component {
	status = 'Log In';
	loginForm: FormGroup;
	constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
		this.loginForm = fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', Validators.required ]
		});
		localStorage.clear();
	}
	submit() {
		localStorage.setItem('email', this.loginForm.get('email').value);
		this.status = 'Processing';
		this.authService.login(this.loginForm.value).subscribe(
			(val) => {
				localStorage.setItem('MomentumToken', val.id);
				localStorage.setItem('userId', val.userId);

				this.loginForm.reset();
				this.router.navigateByUrl('/');
			},
			(err) => console.log(err)
		);
	}
}
