import { Component, OnInit } from '@angular/core';
import { PotionsStorageDto } from 'src/app/dtos/potions-storage.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
potionstorage?: PotionsStorageDto[];
selectedPotion?: PotionsStorageDto;
playerBargain?: number;
isBargain = false;
bargainPrice: number = 0;
maxBargain?: number;
  constructor(private readonly boticariumService: BoticariumService) { }

  ngOnInit(): void {
    this.playerBargain = this.boticariumService.getCurrentPlayer().knowledge.habilities.bargain;
    this.boticariumService.potionStorageList.subscribe(
      (res) => {
        if (res) {
          this.potionstorage = res;
        } else {
          this.potionstorage = this.boticariumService.getPlayerPotions();
        }
      }
    );
  }

  selectPotion(event: any) {
    const id = Number(event.target.value);
    this.selectedPotion = this.boticariumService.findPotion(id);
  }

  toggleBargain() {
    this.isBargain = true;
    if (this.selectedPotion && this.playerBargain) {
      this.maxBargain = this.selectedPotion.price + this.playerBargain;
    }
  }

  bargain(event: any) {
    this.bargainPrice = Number(event);
  }

}
