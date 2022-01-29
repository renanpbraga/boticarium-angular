import { Component, OnInit } from '@angular/core';
import { HerbsDto } from 'src/app/dtos/herbs.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {
  herbs?: HerbsDto[];

  constructor(private readonly boticariumService: BoticariumService) {}

  ngOnInit(): void {
    this.herbs = this.boticariumService.getHerbs();
  }
}
