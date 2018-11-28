import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-order-ready',
  templateUrl: './dialog-order-ready.component.html',
  styleUrls: ['./dialog-order-ready.component.css']
})
export class DialogOrderReadyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.data = data;
  }

  ngOnInit() {
  }

}
