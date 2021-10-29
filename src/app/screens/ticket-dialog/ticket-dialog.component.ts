import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TicketDialogData {
  person: any;
  workingWith: any;
  price: any;
  tip: any;
  cash: any;
  transNum: any;
}

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})

export class TicketDialogComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TicketDialogData,
    public dialogRef: MatDialogRef<TicketDialogComponent>
  ) {
    this.data.person = this.data.person.value;
    if(this.data.workingWith) this.data.workingWith = this.data.workingWith.value;
    if(this.data.price) this.data.price = this.data.price.value;
    if(this.data.tip) this.data.tip = this.data.tip.value;
    if(this.data.cash)  this.data.cash = this.data.cash.value;
    if(this.data.transNum)  this.data.transNum = this.data.transNum.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
