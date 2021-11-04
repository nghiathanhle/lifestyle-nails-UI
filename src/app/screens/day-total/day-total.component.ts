import { Component, OnInit } from '@angular/core';
//import TicketService from '../../services/ticket.service';
import { TicketServicesService } from 'src/app/services/ticket-services.service';

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

  displayedColumns: string[] = ['price', 'tip'];
  selected: any;;
  selectedPerson:any;
  users = [];
  searchDate : string;
  tickets = [];
  constructor(private service: TicketServicesService) { }
  ngOnInit(): void {
    //get users from local storage
    this.users = JSON.parse(localStorage.getItem("users"));
    console.log(this.users);
    
    // get current date and store it into searchDate
    // format searchDate using formatDate function
    this.searchDate = this.formatDate(new Date());
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
    //get password of selectedPerson from list of users
    let tempPerson = this.users.find(x => x.fname == event.value);
    console.log(tempPerson);
    
    //changed selected to current date with format mm-dd-yyyy
    this.selected = (new Date()).getMonth() + 1 + "-" + (new Date()).getDate() + "-" + (new Date()).getFullYear();
    this.selectedPerson = event.value;
    this.tickets = [];
    this.searchDate = this.formatDate(new Date());
    this.getTickets();
  }
    

  //call function from service.getTickets, sending searchDate and selectedPerson.emId as parameters
  async getTickets() {
    //get emId of selectedPerson from list of users
    let tempPerson = this.users.find(x => x.fname == this.selectedPerson);
    this.tickets = [];
    let temp  = await this.service.getTickets(this.searchDate, tempPerson.emId);
    this.tickets = temp.data;
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

}
