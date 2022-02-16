import { Component, OnInit } from '@angular/core';
import { PotionsStorageDto } from 'src/app/dtos/potions-storage.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  potionstorage?: PotionsStorageDto[];
  selectedPotion?: PotionsStorageDto;
  playerBargain?: number;
  isBargain = false;
  bargainPrice: number = 0;
  maxBargain?: number;
  customerList?: any[];
  selectedCustomers: any[] = [];

  constructor(private readonly boticariumService: BoticariumService) {}

  ngOnInit(): void {
    this.playerBargain =
      this.boticariumService.getCurrentPlayer().knowledge.habilities.bargain;
    this.boticariumService.potionStorageList.subscribe((res) => {
      if (res) {
        this.potionstorage = res;
      } else {
        this.potionstorage = this.boticariumService.getPlayerPotions();
      }
    });
    this.customerList = this.boticariumService.getCustomer();
    if (this.customerList) {
      while (this.selectedCustomers.length < 5) {
        const selector = this.getRandomIntInclusive(1, this.customerList.length);
        const foundCustomer = this.customerList.find((cust) => cust.id === selector)
        this.selectedCustomers.push(foundCustomer);
      }
      this.boticariumService.setCustomerList(this.selectedCustomers);
      console.log(this.selectedCustomers);
    }
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectPotion(event: any) {
    const id = Number(event.target.value);
    this.selectedPotion = this.boticariumService.findPotion(id);
  }

  sell() {
    const player = this.boticariumService.getCurrentPlayer();
    const index = player.potionStorage.findIndex(
      (potion: PotionsStorageDto) => potion.id === this.selectedPotion?.id
    );
      const verifyCustomerOrder = this.verifyCustomerOrder();
      if (verifyCustomerOrder) {
        const goldEarned = player.potionStorage[index].price;
        player.stats.gold += goldEarned;
        this.setPlayerGold()
        this.boticariumService.subtractPotionFromSessionStorage(
          player.potionStorage[index].name,
          1,
        );
        this.selectedCustomers.splice(0, 1);
        this.boticariumService.setCustomerList(this.selectedCustomers);
      } else {
        this.customerList = [];
      }
  }

  setPlayerGold() {
    const player = this.boticariumService.getCurrentPlayer();
    const index = player.potionStorage.findIndex(
      (potion: PotionsStorageDto) => potion.id === this.selectedPotion?.id
    );
    if (!this.isBargain) {
      const goldEarned = player.potionStorage[index].price;
      player.stats.gold += goldEarned;
      sessionStorage.setItem('player', JSON.stringify(player));
    } else {
      player.stats.gold += (this.bargainPrice);
      sessionStorage.setItem('player', JSON.stringify(player));
    }
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

  verifyCustomerOrder(): boolean | undefined {
    if (this.customerList && this.selectedPotion) {
      const potionTerms = this.selectedPotion.name.split(' ');
      const includes = potionTerms.includes(this.customerList[0].order);
      return includes;
    } else {
      return;
    }
  }
}
