import { Component, OnInit } from '@angular/core';
import { HerbsStorageDto } from 'src/app/dtos/herbs-storage.dto';
import { PlayerDto } from 'src/app/dtos/player.dto';
import { PotionsStorageDto } from 'src/app/dtos/potions-storage.dto';
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
    this.boticariumService.herbStorageList.subscribe(
      (res) => {
        if (res) {
          this.herbsList = res;
        } else {
          this.herbsList = this.boticariumService.getPlayerHerbs();
        }
      }
    );
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
        this.boticariumService.subtractHerbFromSessionStorage(this.selectedHerb, 1);
          findSelectedHerb.quantity = 1;
          this.cauldronIngreds?.push(findSelectedHerb);
          const potentialArray = this.cauldronIngreds.map(
            (ingred) => ingred.potential
          );
          this.cauldronPotential = potentialArray.reduce(function (
            totalPotential,
            i
          ) {
            return totalPotential + i;
          });
      }
    }
  }

  selectHerb(event: any) {
    this.selectedHerb = event.target.value;
  }

  createPotion() {
    const potentialArray = this.cauldronIngreds.map(
      (ingred) => ingred.potential
    );
    const totalPotential = potentialArray.reduce(function (totalPotential, i) {
      return totalPotential + i;
    });
    const allPotions = this.boticariumService.getPotions();
    const foundPotion = allPotions.find(
      (potion) => potion.potential === totalPotential
    );
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
      const playerHasThisPotion = player.potionStorage.find(
        (pot: PotionsStorageDto) => pot.id === potion.id
      );
      if (playerHasThisPotion) {
        const index = player.potionStorage.findIndex(
          (pot: PotionsStorageDto) => pot.id === potion.id
        );
        player.potionStorage[index].quantity += 1;
        player.stats.experience = this.boticariumService.setPlayerExperience(potion);
        const playerWithExperience = this.boticariumService.verifyPlayerProgression(player)
        sessionStorage.setItem('player', JSON.stringify(playerWithExperience));
        this.emptyCauldron();
        window.alert(`Você criou ${potion.name}`);
        this.boticariumService.setPotionStorageList(player.potionStorage);
      } else {
        player.potionStorage.push(potion);
        this.boticariumService.setPlayerExperience(potion);
        const playerWithExperience = this.boticariumService.verifyPlayerProgression(player)
        sessionStorage.setItem('player', JSON.stringify(playerWithExperience));
        this.emptyCauldron();
        this.boticariumService.setPotionStorageList(player.potionStorage);
        window.alert(`Você criou ${potion.name}`);
      }
    } else {
      window.alert('A poção falhou!');
      this.emptyCauldron();
    }
  }

  emptyCauldron() {
    this.cauldronIngreds = [];
    this.cauldronPotential = 0;
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
        potions: ['Poção de cura (menor)'],
      },
    };

    sessionStorage.setItem('player', JSON.stringify(player));
    location.reload();
  }
}
