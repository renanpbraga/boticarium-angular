import { Component, OnInit } from '@angular/core';
import { PotionsStorageDto } from 'src/app/dtos/potions-storage.dto';

@Component({
  selector: 'app-potionstorage',
  templateUrl: './potionstorage.component.html',
  styleUrls: ['./potionstorage.component.scss']
})
export class PotionstorageComponent implements OnInit {
  potionstorage?: PotionsStorageDto[];
  constructor() { }

  ngOnInit(): void {
    const getPlayer = sessionStorage.getItem('player');
    if (getPlayer) {
      const parsePlayer = JSON.parse(getPlayer);
      this.potionstorage = parsePlayer.potionStorage;
    }
  }

}
