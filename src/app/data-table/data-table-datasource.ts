import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: Order[] = [
  {orderNumber: 1, customerName: 'Hydrogen', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 2, customerName: 'Helium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 3, customerName: 'Lithium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 4, customerName: 'Beryllium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 5, customerName: 'Boron', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 5, customerName: 'Boron', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 6, customerName: 'Carbon', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 7, customerName: 'Nitrogen', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 8, customerName: 'Oxygen', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 9, customerName: 'Fluorine', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 10, customerName: 'Neon', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 11, customerName: 'Sodium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 12, customerName: 'Magnesium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 13, customerName: 'Aluminum', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 14, customerName: 'Silicon', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 15, customerName: 'Phosphorus', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 16, customerName: 'Sulfur', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 17, customerName: 'Chlorine', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 18, customerName: 'Argon', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 19, customerName: 'Potassium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
  {orderNumber: 20, customerName: 'Calcium', date: '12/12/2012', plate: 'none', time:'15:21', $key: '1212121'},
];
*/
/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Order> {
  // orderList: Order[];
  data: Order[];

  constructor(private paginator: MatPaginator, private sort: MatSort,
             private orderService: OrderService) {
    super();
    this.orderService.getOrders()
    .snapshotChanges()
    .subscribe(item => {
        this.data = [];
        item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.data.push(x as Order);
            //this.plateUrls.push(storage.ref((x as Order).plateImage).getDownloadURL());
        })
    })
    // this.data = this.orderList;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Order[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Order[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Order[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'customerName': return compare(a.customerName, b.customerName, isAsc);
        case 'plate': return compare(a.plate, b.plate, isAsc);
        case 'orderNumber': return compare(+a.orderNumber, +b.orderNumber, isAsc);
        case 'dateTime': return compare(a.dateTime, b.dateTime, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
