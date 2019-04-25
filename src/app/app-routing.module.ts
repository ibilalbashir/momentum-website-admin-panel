import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const Approutes: Routes = [
	{
		path: '',
		component: FullComponent,
		canActivate: [ AuthGuard ],

		children: [
			{ path: '', redirectTo: '/tickets', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: './dashboards/dashboard.module#DashboardModule'
			},
			{
				path: 'starter',
				loadChildren: './starter/starter.module#StarterModule'
			},
			{
				path: 'component',
				loadChildren: './component/component.module#ComponentsModule'
			},
			{ path: 'cards', loadChildren: './cards/cards.module#CardsModule' },
			{ path: 'icons', loadChildren: './icons/icons.module#IconsModule' },
			{ path: 'forms', loadChildren: './form/forms.module#FormModule' },
			{ path: 'tables', loadChildren: './table/tables.module#TablesModule' },
			{ path: 'charts', loadChildren: './charts/charts.module#ChartModule' },
			{
				path: 'widgets',
				loadChildren: './widgets/widgets.module#WidgetsModule'
			},
			{ path: 'ecom', loadChildren: './ecommerce/ecom.module#EcomModule' },
			{
				path: 'timeline',
				loadChildren: './timeline/timeline.module#TimelineModule'
			},
			{
				path: 'extra-component',
				loadChildren: './extra-component/extra-component.module#ExtraComponentModule'
			},
			{ path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
			{ path: 'apps/email', loadChildren: './apps/email/mail.module#MailModule' },
			{ path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
			{
				path: 'sample-pages',
				loadChildren: './sample-pages/sample-pages.module#SamplePagesModule'
			},
			{
				path: 'speaker',
				loadChildren: './speaker/speaker.module#SpeakerModule'
			},
			{
				path: 'partner',
				loadChildren: './partner/partner.module#PartnerModule'
			},
			{
				path: 'conference',
				loadChildren: './conference/conference.module#ConferenceModule'
			},
			{
				path: 'tickets',
				loadChildren: './ticket/ticket.module#TicketModule'
			},
			{
				path: 'company',
				loadChildren: './company/company.module#CompanyModule'
			},
			{
				path: 'company-service',
				loadChildren: './company-ser/company-ser.module#CompanySerModule'
			},
			{
				path: 'workshop',
				loadChildren: './workshop/workshop.module#WorkshopModule'
			},
			{
				path: 'email-broadcaster',
				loadChildren: './email-broadcaster/email-broadcaster.module#EmailBroadcasterModule'
			}
		]
	},
	{
		path: '',
		component: BlankComponent,
		children: [
			{
				path: '',
				loadChildren: './authentication/authentication.module#AuthenticationModule'
			}
		]
	},
	{
		path: '**',
		redirectTo: '/404'
	}
];
