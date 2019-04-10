import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-display-ticket',
	templateUrl: './display-ticket.component.html',
	styleUrls: [ './display-ticket.component.css' ]
})
export class DisplayTicketComponent implements OnInit {
	filterThis = [ 'Entrepreneur Pass', 'Corporate Pass', 'Student Pass' ];
	finalData = [];
	deleteData = [];
	filteredData = [];
	displayData = [];
	displayedColumns: string[] = [ 'easyTicketId', 'created', 'type', 'email', 'phone' ];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(private ticketService: TicketService, public toastr: ToastrService) {}

	dataSource;
	applyFilter(item) {
		if (item.checked === true) {
			this.filteredData = this.displayData.filter((val) => {
				if (val.ticket.type === item.source.value) {
					return val;
				}
			});
			this.filteredData.forEach((element) => {
				this.finalData.push(element);
			});
			this.dataSource = new MatTableDataSource<any>(this.finalData);
			this.dataSource.paginator = this.paginator;
		} else {
			this.finalData = this.finalData.filter((val) => {
				if (val.ticket.type === item.source.value) {
				} else {
					return val;
				}
			});

			this.dataSource = new MatTableDataSource<any>(this.finalData);
			this.dataSource.paginator = this.paginator;
		}
	}

	ngOnInit() {
		this.ticketService.getTickets().subscribe(
			(val) => {
				val.forEach((element) => {
					if (element.hasOwnProperty('ticket')) {
						this.displayData.push(element);
					}
				});
			},
			(err) => {
				this.toastr.error('Connection problem, please reload.');
			}
		);
	}
}
