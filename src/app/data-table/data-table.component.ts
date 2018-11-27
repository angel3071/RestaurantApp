import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { OrderService } from '../services/order.service';
import { AngularFireStorage } from 'angularfire2/storage';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;


  constructor(private orderService: OrderService, private storage: AngularFireStorage) {

  this.storage = storage;


  }



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['orderNumber', 'plate', 'customerName', 'date', 'time', 'action'];
  statusBackgroundColors = {ordered: "#FF4081", prepared: "#3F51B5", served: "white"};
  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort, this.orderService);

  }
}

