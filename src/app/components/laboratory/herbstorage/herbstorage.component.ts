import { Component, OnInit } from '@angular/core';
import { HerbsStorageDto } from 'src/app/dtos/herbs-storage.dto';

@Component({
  selector: 'app-herbstorage',
  templateUrl: './herbstorage.component.html',
  styleUrls: ['./herbstorage.component.scss']
})
export class HerbstorageComponent implements OnInit {
  herbstorage?: HerbsStorageDto[];
  constructor() { }

  ngOnInit(): void {
    const getPlayer = sessionStorage.getItem('player');
    if (getPlayer) {
      const parsePlayer = JSON.parse(getPlayer);
      this.herbstorage = parsePlayer.herbStorage;
    }
  }

}
