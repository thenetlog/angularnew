import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getvalues();
  }

  getvalues() {
    this.http.get('https://localhost:5001/api/values').subscribe(response => {
      this.values = response.json();
    });
  }

}
