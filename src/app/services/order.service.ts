import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    orderList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {}


  getOrders(){
  
      return this.orderList = this.firebase.list('orders');
  }

  insertOrder(order: Order){
  
      this.orderList.push({
          customerName: order.customerName,
          orderNumber: order.orderNumber,
          plate: order.plate,
          plateImage: order.plateImage,
          dateTime: order.dateTime,
          status: order.status,
          comments: order.comments
      });

  }
  updateOrder(order: Order){
      this.orderList.update(order.$key, {
        customerName: order.customerName,
        orderNumber: order.orderNumber,
        plate: order.plate,
        plateImage: order.plateImage,
        dateTime: order.dateTime,
        status: order.status,
        comments: order.comments
      });
  }
}
