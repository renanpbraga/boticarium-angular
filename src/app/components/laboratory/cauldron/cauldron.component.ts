import { Component, OnInit } from '@angular/core';
import { find, retry } from 'rxjs';
import { HerbsStorageDto } from 'src/app/dtos/herbs-storage.dto';
import { PotionsStorageDto } from 'src/app/dtos/potions-storage.dto';
import { PotionsDto } from 'src/app/dtos/potions.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-cauldron',
  templateUrl: './cauldron.component.html',
  styleUrls: ['./cauldron.component.scss'],
})
export class CauldronComponent implements OnInit {
  herbsList?: HerbsStorageDto[];
  selectedHerb: string = '';
  selectHerbPlease = false;
  cauldronIngreds: HerbsStorageDto[] = [];
  cauldronPotential?: number;

  constructor(private readonly boticariumService: BoticariumService) {}

  ngOnInit(): void {
    this.herbsList = this.boticariumService.getPlayerHerbs();
    console.log(this.cauldronIngreds);
  }

  putIntoCauldron() {
    if (this.selectedHerb === '') {
      this.selectHerbPlease = true;
      return;
    }
    if (this.herbsList && this.selectedHerb) {
      this.selectHerbPlease = false;
      const findSelectedHerb = this.boticariumService
        .getPlayerHerbs()
        .find((herb: HerbsStorageDto) => herb.name === this.selectedHerb);
      if (findSelectedHerb && findSelectedHerb.quantity > 0) {
        this.subtractHerbFromSessionStorage(this.selectedHerb, 1);
          findSelectedHerb.quantity = 1;
          this.cauldronIngreds?.push(findSelectedHerb);
          const potentialArray = this.cauldronIngreds.map((ingred) => ingred.potential);
          this.cauldronPotential = potentialArray.reduce(function (totalPotential, i) {
            return totalPotential + i
          });
      }
      if (findSelectedHerb && findSelectedHerb.quantity === 0) {
        this.removeHerbFromSessionStorage(this.selectedHerb);
      }
    }
  }

  subtractHerbFromSessionStorage(herb: string, quantity: number) {
    const player = this.boticariumService.getCurrentPlayer();
    const index = player.herbStorage.findIndex(
      (her: HerbsStorageDto) => her.name === herb
    );
    player.herbStorage[index].quantity -= quantity;
    sessionStorage.setItem('player', JSON.stringify(player));
  }

  removeHerbFromSessionStorage(herb: string) {
    const player = this.boticariumService.getCurrentPlayer();
    const index = player.herbStorage.findIndex(
      (her: HerbsStorageDto) => her.name === herb
    );
    player.herbStorage.splice(index, 1)
    sessionStorage.setItem('player', JSON.stringify(player));
  }

  selectHerb(event: any) {
    this.selectedHerb = event.target.value;
  }

  createPotion() {
    const potentialArray = this.cauldronIngreds.map((ingred) => ingred.potential);
    const totalPotential = potentialArray.reduce(function (totalPotential, i) {
      return totalPotential + i
    });
    const allPotions = this.boticariumService.getPotions();
    const foundPotion = allPotions.find((potion) => potion.potential === totalPotential);
    if (foundPotion) {
      const potion: PotionsStorageDto = {
        id: foundPotion.id,
        name: foundPotion.name,
        description: foundPotion.description,
        element: foundPotion.element,
        price: foundPotion.price,
        potential: foundPotion.potential,
        quantity: 1,
      };
      const player = this.boticariumService.getCurrentPlayer();
      const playerHasThisPotion = player.potionStorage.find((pot: PotionsStorageDto) => pot.id === potion.id);
      if (playerHasThisPotion) {
        const index = player.potionStorage.findIndex((pot: PotionsStorageDto) => pot.id === potion.id);
        player.potionStorage[index].quantity += 1;
        sessionStorage.setItem('player', JSON.stringify(player));

      } else {
        player.potionStorage.push(potion);
        sessionStorage.setItem('player', JSON.stringify(player));
      }
    } else {
      window.alert('A poção falhou!');
    }
  }

  resetPlayer() {
    const player = {
      stats: {
        id: 0,
        gold: 0,
        name: '',
        level: 1,
        reputation: 0,
        tendency: 'Neutro',
        experience: 0,
      },
      herbStorage: [
        {
          name: 'Alamanda',
          potential: 2,
          price: 2,
          quantity: 2,
        },
        {
          name: 'Citrizela',
          potential: 1,
          price: 2,
          quantity: 2,
        },
      ],
      potionStorage: [
        {
          id: 1,
          name: 'Poção de cura (menor)',
          description:
            'Esta poção possui efeito de cura lento porém gradual. Usada geralmente para casos menos graves de ferimentos ou enfermidades leves.',
          element: 'Água',
          price: 10,
          potential: 4,
          quantity: 1,
        },
      ],
      knowledge: {
        herbs: ['Alamanda', 'Citrizela'],
        potions: ['Poção de cura (menor)']
      }
    };

    sessionStorage.setItem('player', JSON.stringify(player));
    location.reload();
  }
}
