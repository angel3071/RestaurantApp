import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { DataTableDataSource } from "./data-table-datasource";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { OrderService } from "../services/order.service";
import { AngularFireStorage } from "angularfire2/storage";
import { DialogOrderReadyComponent } from "src/app/data-table/dialog-order-ready/dialog-order-ready.component";
import { Order } from "../models/order";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableDataSource;

  constructor(
    private orderService: OrderService,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) {
    this.storage = storage;
  }

  openDialogOrderReady(order: Order) {
    const dialogRef = this.dialog.open(DialogOrderReadyComponent, {
      data: {
        header: "Orden Lista",
        paragraph: "La orden está lista para ser entregada?"
      }
    });
    console.log(`Order clicked: ${order.plate}`);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        order.status = "prepared";
        this.orderService.updateOrder(order);
      }
    });
  }

  openDialogOrderServed(order: Order) {
    const dialogRef = this.dialog.open(DialogOrderReadyComponent, {
      data: {
        header: "Orden servida",
        paragraph: "El cliente ha recibido la orden?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        order.status = "served";
        this.orderService.updateOrder(order);
      }
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "orderNumber",
    "plate",
    "customerName",
    "dateTime",
    "action"
  ];
  statusBackgroundColors = {
    ordered: {back: "#ff4181", font: "white"},
    prepared: {back: "#3f51b5", font: "white"},
    served: {back: "white", font: "black"}
  };
  ngOnInit() {
    this.dataSource = new DataTableDataSource(
      this.paginator,
      this.sort,
      this.orderService
    );
  }
}
