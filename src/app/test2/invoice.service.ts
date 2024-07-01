import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bike } from './invoice.model';

@Injectable()
export class BikeService {
  constructor(private http: HttpClient) {}
  getBikes() {
    return this.http.get<any>('assets/invoice.json');
  }
}