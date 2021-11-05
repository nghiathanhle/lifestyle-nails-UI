import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketServicesService {
  constructor( private http: HttpClient ) { }

  //Getting technician details
  getTechniciansAndStoreToLocalStorage(){
    let users: any;
    this.http.post<any>('https://us-central1-ntl-fb.cloudfunctions.net/getTechnicians',{}).subscribe(data => {  
        // console.log(data.data);
        localStorage.setItem('users', JSON.stringify(data.data));
        users = data.data;
    });
  }

  //Sending and persisting to the DB
  async sendTicket(data):Promise<boolean>{
    var success = false;
    let payload = (this.createTicketPayload(data));
    await this.http.post<any>('https://us-central1-ntl-fb.cloudfunctions.net/createTicket', payload, {}).subscribe(data => {  
      if(data)  return true;
    });
    return false;
  }

  //get tickets for the technician using async await
  async getTickets(date, emId):Promise<any>{
    let tickets: any;
    let payload = {
      emId: emId,
      date: date
    }
    await this.http.post<any>('https://us-central1-ntl-fb.cloudfunctions.net/getTickets', payload, {}).toPromise().then(data => {  
      tickets = data;
    });
    return tickets;
  }

  createTicketPayload(data){
    let users = JSON.parse(localStorage.getItem('users'));
    let person = ""
    users.forEach(element => {
      if(String(element.fname).localeCompare(data.person)==0){
        person = element.emId;
      }
    });
    let payload = {
      emId: person,
      price: data.price,
      tip: data.tip,
      transaction: data.transNum,
      addition: ""
    }
    return payload;
  }

  
}
