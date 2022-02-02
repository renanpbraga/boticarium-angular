import { Component, OnInit } from '@angular/core';
import { PotionsStorageDto } from 'src/app/dtos/potions-storage.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-potionstorage',
  templateUrl: './potionstorage.component.html',
  styleUrls: ['./potionstorage.component.scss']
})
export class PotionstorageComponent implements OnInit {
  potionstorage?: PotionsStorageDto[];
  constructor(private readonly boticariumService: BoticariumService) { }

  ngOnInit(): void {
    this.boticariumService.potionStorageList.subscribe((res: PotionsStorageDto[]) => this.potionstorage = res);
  }

}
