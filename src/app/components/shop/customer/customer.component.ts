import { Component, Input, OnInit } from '@angular/core';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class ShopCustomerComponent implements OnInit {
customerList?: any[];
  constructor(private readonly boticariumService: BoticariumService) { }

  ngOnInit(): void {
    this.boticariumService.customerList.subscribe((res) => this.customerList = res)
  }

}
