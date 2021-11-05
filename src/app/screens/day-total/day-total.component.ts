import { Component, OnInit } from '@angular/core';
//import TicketService from '../../services/ticket.service';
import { TicketServicesService } from 'src/app/services/ticket-services.service';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PersonPinDialogComponent } from '../person-pin-dialog/person-pin-dialog.component';

//creating a data model to be displayed
interface Transaction {
  price: number;
  tip: number;
}

@Component({
  selector: 'app-day-total',
  templateUrl: './day-total.component.html',
  styleUrls: ['./day-total.component.css']
})
export class DayTotalComponent implements OnInit {

  subscription: Subscription;
  source : any;
  displayedColumns: string[] = ['price', 'tip', 'transaction'];
  pin: number;
  invalidPin: boolean = false;
  selected: any;
  selectedPerson:any;
  users = [];
  searchDate : string;
  tickets = [];
  correctPin: boolean;
  constructor(private service: TicketServicesService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    //get users from local storage
    this.users = JSON.parse(localStorage.getItem("users"));
    // get current date and store it into searchDate
    // format searchDate using formatDate function
    this.searchDate = this.formatDate(new Date());
    this.correctPin = false;
  }

  //call getTickets function from service, sending searchDate and selectedPerson.emId as parameters

  //change selected date
  onDateChange(event: Date) {
    let tempDate = "";
    //convert date to string in format mm-dd-yyyy
    tempDate = event.getMonth() + 1 + "-" + event.getDate() + "-" + event.getFullYear();
    this.selected = tempDate;
    //format searchDate using formatDate function and store it into searchDate
    this.searchDate = this.formatDate(event);
    this.getTickets();
  }

  //change selected person
  //popup window to ask for pin
  //clearing tickets
  //set searchDate to current date, format it using formatDate function
  //call getTickets function
  personChange(event: any) {
    // console.log(this.openDialog());
    //get password of selectedPerson from list of users
    let tempPerson = this.users.find(x => x.fname == event.value);
    // let result = this.openDialog();
    
    // if(this.openDialog().localeCompare(tempPerson.code) == 0){
      // console.log("correct pin");
      
      // this.correctPin = true;
      //changed selected to current date with format mm-dd-yyyy
      this.selected = (new Date()).getMonth() + 1 + "-" + (new Date()).getDate() + "-" + (new Date()).getFullYear();
      this.selectedPerson = event.value;
      this.tickets = [];
      this.searchDate = this.formatDate(new Date());
      this.getTickets();
    // }else{
    //   console.log("incorrect pin");
    // }
  }

  openDialog(): string {
    let result = '';
    const dialogRef = this.dialog.open(PersonPinDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      result = result;
    });

    return result;
  }
    
  //pinChange function
  //assign input to pin
  //compare pin with password of selectedPerson from list of users
  pinChange(event: any) {
    // this.pin = event.value;

    // //get password of selectedPerson from list of users
    // let tempPerson = this.users.find(x => x.fname == event.value);
    // console.log(tempPerson);
    // //compare pin with password of selectedPerson from list of users
    // if (tempPerson.password == this.pin) {
    //   this.pin = null;
    //   this.getTickets();
    // }else{
    //   this.invalidPin = true;
    // }
  }

  //call function from service.getTickets, sending searchDate and selectedPerson.emId as parameters
  async getTickets() {
    //get emId of selectedPerson from list of users
    let tempPerson = this.users.find(x => x.fname == this.selectedPerson);
    this.tickets = [];
    let temp  = await this.service.getTickets(this.searchDate, tempPerson.emId);
    this.tickets = temp.data;
    this.source = interval(60000);//setting to clear data every 60 seconds
    this.subscription = this.source.subscribe(val => this.clearData());//clear data every 60 seconds, calling this here to insure there is enough time
  }
  
  //format date to yyyy_mm_dd
  formatDate(date: Date) {
    let tempDate = "";
    tempDate = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();
    return tempDate;
  }

  //get total price of tickets
  getTotalCost() {
    if (!this.tickets) {
      return 0;
    }
    let total = 0;
    for (let i = 0; i < this.tickets.length; i++) {
      total += this.tickets[i].price;
    }
    return total;
  }

  //get total tip of tickets
  getTotalTip() {
    if (!this.tickets) {
      return 0;
    }
    let total = 0;
    for (let i = 0; i < this.tickets.length; i++) {
      total += this.tickets[i].tip;
    }
    return total;
  }

  clearData(){
    this.tickets = [];
    this.selectedPerson = "";
    this.selected = "";
    this.subscription.unsubscribe();
    this.source = null;
    this.correctPin = false;
  }

}

