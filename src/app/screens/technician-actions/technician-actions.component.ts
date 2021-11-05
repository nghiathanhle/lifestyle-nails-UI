import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technician-actions',
  templateUrl: './technician-actions.component.html',
  styleUrls: ['./technician-actions.component.css']
})
export class TechnicianActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   //detect when not in focus
   onBlur() {
   }

   tabChanged(event) {
    // console.log(event);
   }

}
