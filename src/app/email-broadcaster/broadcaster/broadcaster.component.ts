import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { CompanyService } from '../../shared/services/company.service';
import { MomentumUserService } from '../../shared/services/momentum-user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-broadcaster',
	templateUrl: './broadcaster.component.html',
	styleUrls: [ './broadcaster.component.css' ]
})
export class BroadcasterComponent implements OnInit {
	checkUsers = new FormControl(false);
	checkStartups = new FormControl(false);
	htmlContent = '';
	userSearchCtrl = new FormControl();
	companySearchCtrl = new FormControl();

	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
	email = [];
	startupOptions = [];

	filteredStartups: Observable<string[]>;
	filteredUsers: Observable<string[]>;

	userOptions = [];
	constructor(private companySer: CompanyService, private userService: MomentumUserService) {}

	ngOnInit() {
		this.checkStartups.valueChanges.subscribe((x) => {
			if (x) {
				this.companySearchCtrl.disable();
			} else {
				this.companySearchCtrl.enable();
			}
		});
		this.checkUsers.valueChanges.subscribe((x) => {
			if (x) {
				this.userSearchCtrl.disable();
			} else {
				this.userSearchCtrl.enable();
			}
		});
		this.filteredStartups = this.companySearchCtrl.valueChanges.pipe(map((value) => this._filter(value, 'name')));
		this.filteredUsers = this.userSearchCtrl.valueChanges.pipe(map((value) => this._filter(value, 'firstName')));

		this.companySer.getCompany().subscribe(
			(val) => {
				console.log(val);
				this.startupOptions = val;
			},
			(err) => console.log(err)
		);
		this.userService.getMomentumUsers().subscribe(
			(val) => {
				console.log(val);
				this.userOptions = val;
			},
			(err) => console.log(err)
		);
	}

	private _filter(value: string, key: string): string[] {
		try {
			const filterValue = value.toLowerCase();

			return key === 'name'
				? this.startupOptions.filter((option) => option[key].toLowerCase().includes(filterValue))
				: this.userOptions.filter((option) => option[key].toLowerCase().includes(filterValue));
		} catch (error) {}
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our fruit
		if ((value || '').trim()) {
			this.email.push({ name: value.trim() });
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
	}

	remove(email): void {
		const index = this.email.indexOf(email);

		if (index >= 0) {
			this.email.splice(index, 1);
		}
	}
	companySelected(e) {
		this.companySearchCtrl.setValue('');
		console.log(e);
		this.email.push({ name: e.option.value.email });
	}
	userSelected(e) {
		this.userSearchCtrl.setValue('');
		console.log(e);
		this.email.push({ name: e.option.value.email });
	}
	submitEmail() {
		if (confirm('Are you sure?')) {
			let emails = this.email.map((x) => x.name);
			if (this.checkStartups.value) {
				emails = emails.concat(this.startupOptions.map((x) => x.email));
			}
			if (this.checkUsers.value) {
				emails = emails.concat(this.userOptions.map((x) => x.email));
			}
			console.log(emails);
			// array unique
			console.log(this.htmlContent);
		}
	}
}
