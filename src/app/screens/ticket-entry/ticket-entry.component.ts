import { Component, OnInit } from '@angular/core';
import { TicketServicesService } from 'src/app/services/ticket-services.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-entry',
  templateUrl: './ticket-entry.component.html',
  styleUrls: ['./ticket-entry.component.css']
})
export class TicketEntryComponent implements OnInit {
  loading = false;
  users: [];
  cashChecked: boolean;
  ticketForm = new FormGroup({
    person: new FormControl('', [Validators.required]),
    workingWith: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    tip: new FormControl('', [Validators.required]),
    cash: new FormControl(''),
    transNum: new FormControl('')
  })

  constructor(
    private service: TicketServicesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.cashChecked = false;
    // getting and storing users info into local storage
    this.service.getTechniciansAndStoreToLocalStorage();
    //retrieving from local storage
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  onSubmit(){
    if(this.ticketForm.valid) this.openDialog();
  }

  toggled(){
    this.cashChecked = !this.cashChecked;
  }

  onCancel(){
    this.ticketForm.reset();
    this.cashChecked = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '400px',
      data: {
        person: this.getPerson(),
        workingWith: this.getWorkingWith(),
        price: this.getPrice(),
        tip: this.getTip(),
        cash: this.getCash(),
        transNum: this.getTransNum()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if(result){
        console.log("Sending the data");
        if(this.service.sendTicket(result)){
          this.onCancel();
          this.loading = false;
        }
      }
      else console.log("DONT SEND");      
    });
  }

  //Getters for the validators
  getPerson(){
    return this.ticketForm.get("person");
  }
  getPrice(){
    return this.ticketForm.get("price");
  }
  getTip(){
    return this.ticketForm.get("tip");
  }
  getWorkingWith(){
    return this.ticketForm.get("workingWith");
  }
  getCash(){
    return this.ticketForm.get("cash");
  }
  getTransNum(){
    return this.ticketForm.get("transNum");
  }
}
