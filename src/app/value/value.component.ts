import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getvalues();
  }

  // getvalues() {
  //   this.http.get('https://localhost:5001/api/values').subscribe(response => {
  //     this.values = response.json();
  //   });
  // }
  getvalues() {
    this.authService.value().subscribe(response => {
      this.values = response.json();
    });
  }

}
