import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person-pin-dialog',
  templateUrl: './person-pin-dialog.component.html',
  styleUrls: ['./person-pin-dialog.component.css']
})
export class PersonPinDialogComponent implements OnInit {

  pin: number;
  constructor(
    public dialogRef: MatDialogRef<PersonPinDialogComponent>
  ) { }

  ngOnInit(): void {

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
