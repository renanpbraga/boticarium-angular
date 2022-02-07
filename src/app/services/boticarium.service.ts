import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HerbsStorageDto } from '../dtos/herbs-storage.dto';
import { HerbsDto } from '../dtos/herbs.dto';
import { PlayerDto } from '../dtos/player.dto';
import { PotionsStorageDto } from '../dtos/potions-storage.dto';
import { PotionsDto } from '../dtos/potions.dto';

@Injectable({
  providedIn: 'root',
})
export class BoticariumService {
  constructor() {}
  public playersList = new BehaviorSubject([]);
  public herbStorageList = new BehaviorSubject<HerbsStorageDto[]>(this.getPlayerHerbs());
  public potionStorageList = new BehaviorSubject<PotionsStorageDto[]>(this.getPlayerPotions());
  
  setPlayersList(obj: any) {
    this.playersList.next(obj);
  }

  setHerbsStorageList(obj: HerbsStorageDto[]) {
    this.herbStorageList.next(obj);
  }

  setPotionStorageList(obj: PotionsStorageDto[]) {
    return this.potionStorageList.next(obj);
  }

  getCurrentPlayer() {
    const player = sessionStorage.getItem('player');
    if (player) {
      return JSON.parse(player);
    }
  }

  getPlayerHerbs() {
    const player = sessionStorage.getItem('player');
    if (player) {
      const parsePlayer = JSON.parse(player);
      const herbs = parsePlayer.herbStorage;
      return herbs;
    }
  }

  getPlayerPotions() {
    const player = sessionStorage.getItem('player');
    if (player) {
      const parsePlayer = JSON.parse(player);
      const potions = parsePlayer.potionStorage;
      return potions;
    }
  }

  removeHerbFromSessionStorage(herb: string) {
    const player = this.getCurrentPlayer();
    const index = player.herbStorage.findIndex(
      (her: HerbsStorageDto) => her.name === herb
    );
    player.herbStorage.splice(index, 1);
    sessionStorage.setItem('player', JSON.stringify(player));
    this.setHerbsStorageList(player.herbStorage);
  }

  subtractHerbFromSessionStorage(herb: string, quantity: number) {
    const player = this.getCurrentPlayer();
    const index = player.herbStorage.findIndex(
      (her: HerbsStorageDto) => her.name === herb
    );
    player.herbStorage[index].quantity -= quantity;
    if (player.herbStorage[index].quantity > 0) {
      sessionStorage.setItem('player', JSON.stringify(player));
      this.setHerbsStorageList(player.herbStorage);
    } else {
      this.removeHerbFromSessionStorage(herb);
    }
  }

  setPlayerExperience(potion: PotionsStorageDto) {
    const player = this.getCurrentPlayer();
    const xp = Math.ceil((potion.potential*10)-((player.stats.level*5)/100));
    return player.stats.experience += xp;
  }

  verifyPlayerProgression(player: PlayerDto) {
    const calcLevel = (player.stats.level * 80)
    const fibonacci = this.calcFibonacci(calcLevel)
    if (player.stats.experience >= fibonacci){
      player.stats.level += 1
      return player
    } else {
      return player;
    }
  }

  calcFibonacci(num: number): number {
    return (num - 1 + num - 2);
  }


  getPotions(): PotionsDto[] {
    const potions = [
      {
        id: 1,
        name: 'Poção de cura (menor)',
        description:
          'Esta poção possui efeito de cura lento porém gradual. Usada geralmente para casos menos graves de ferimentos ou enfermidades leves.',
        element: 'Água',
        price: 10,
        potential: 4,
        img: 'assets/potions/healing-potion-minor.png',
      },
      {
        id: 2,
        name:'Poção de cura',
        description: 'Esta poção possui efeito de cura moderado. Usada geralmente para casos de doenças e infecções pouco graves.',
        element: 'Água',
        price: 50,
        potential: 4.5,
      },
      {
        id: 3,
        name:'Poção de cura (maior)',
        description: 'Esta poção tem efeitos de cura milagrosos. Capaz de curar ferimentos graves sem deixar cicatrizes. Curar doenças desconhecidas pelos médicos mais graduados.',
        element: 'Água',
        price: 100,
        potential: 4.53,
      },
    ];
    return potions;
  }

  getHerbs():HerbsDto[] {
    const herbs = [
      {
        name: 'Alamanda',
        description: 'Planta semi-arbustiva de porte médio e caule delgado. Possui flores amarelas com leve aroma adocicado. Parte utilizada: Flores.',
        potential: 2,
        price: 2,
        img: 'img',
      },
      {
        name: 'Citrizela',
        description: 'Planta herbácea fa família das gramíneas. Possui folhas longas e lanceoladas. Ao ser macerada, libera um suave odor cítrico. Parte utilizada: Folhas. ',
        potential: 1,
        price: 2,
        img: 'img',
      },
    ];
    return herbs;
  }
}
