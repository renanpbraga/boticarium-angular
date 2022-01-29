import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HerbsDto } from '../dtos/herbs.dto';
import { PotionsDto } from '../dtos/potions.dto';

@Injectable({
  providedIn: 'root',
})
export class BoticariumService {
  constructor() {}
  playersList = new BehaviorSubject([])
  
  setPlayersList(obj: any) {
    this.playersList.next(obj);
  }

  getPotions(): PotionsDto[] {
    const potions = [
      {
        name: 'Poção de cura (menor)',
        description:
          'Esta poção possui efeito de cura lento porém gradual. Usada geralmente para casos menos graves de ferimentos ou enfermidades leves.',
        element: 'Água',
        price: 10,
        potential: 4,
      },
      {
        name:'Poção de cura',
        description: 'Esta poção possui efeito de cura moderado. Usada geralmente para casos de doenças e infecções pouco graves.',
        element: 'Água',
        price: 50,
        potential: 4.5,
      },
      {
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
