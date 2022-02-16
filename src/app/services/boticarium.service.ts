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

  public customerList = new BehaviorSubject<any[]>([]);

  public herbStorageList = new BehaviorSubject<HerbsStorageDto[]>(
    this.getPlayerHerbs()
  );

  public potionStorageList = new BehaviorSubject<PotionsStorageDto[]>(
    this.getPlayerPotions()
  );

  setPlayersList(obj: any) {
    this.playersList.next(obj);
  }

  setHerbsStorageList(obj: HerbsStorageDto[]) {
    this.herbStorageList.next(obj);
  }

  setPotionStorageList(obj: PotionsStorageDto[]) {
    return this.potionStorageList.next(obj);
  }

  setCustomerList(list: any[]) {
    return this.customerList.next(list);
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

  findPotion(id: number) {
    const potionStorage = this.getCurrentPlayer().potionStorage;
    const foundPotion = potionStorage.find(
      (potion: PotionsStorageDto) => potion.id === id
    );
    if (foundPotion) {
      return foundPotion;
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

  subtractPotionFromSessionStorage(potion: string, quantity: number) {
    const player = this.getCurrentPlayer();
    const index = player.potionStorage.findIndex(
      (pot: PotionsStorageDto) => pot.name === potion
    );
    player.potionStorage[index].quantity -= quantity;
    if (player.potionStorage[index].quantity > 0) {
      sessionStorage.setItem('player', JSON.stringify(player));
      this.setPotionStorageList(player.potionStorage);
    } else {
      this.removePotionFromSessionStorage(potion);
    }
  }

  removePotionFromSessionStorage(potion: string) {
    const player = this.getCurrentPlayer();
    const index = player.potionStorage.findIndex(
      (pot: PotionsStorageDto) => pot.name === potion
    );
    player.potionStorage.splice(index, 1);
    sessionStorage.setItem('player', JSON.stringify(player));
    this.setPotionStorageList(player.potionStorage);
  }

  setPlayerExperience(potion: PotionsStorageDto) {
    const player = this.getCurrentPlayer();
    const xp = Math.ceil(
      potion.potential * 10 - (player.stats.level * 5) / 100
    );
    return (player.stats.experience += xp);
  }

  verifyPlayerProgression(player: PlayerDto) {
    const calcLevel = player.stats.level * 80;
    const fibonacci = this.calcFibonacci(calcLevel);
    if (player.stats.experience >= fibonacci) {
      player.stats.level += 1;
      return player;
    } else {
      return player;
    }
  }

  calcFibonacci(num: number): number {
    return num - 1 + num - 2;
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
        name: 'Poção de cura',
        description:
          'Esta poção possui efeito de cura moderado. Usada geralmente para casos de doenças e infecções pouco graves.',
        element: 'Água',
        price: 50,
        potential: 4.5,
      },
      {
        id: 3,
        name: 'Poção de cura (maior)',
        description:
          'Esta poção tem efeitos de cura milagrosos. Capaz de curar ferimentos graves sem deixar cicatrizes. Curar doenças desconhecidas pelos médicos mais graduados.',
        element: 'Água',
        price: 100,
        potential: 4.53,
      },
      {
        id: 4,
        name: 'Poção de veneno (fraco)',
        description:
          'Esta poção possui ingredientes tóxicos para alguns seres vivos. Capaz de matar pestes de pequeno porte',
        element: 'Terra',
        price: 10,
        potential: -4,
      },
    ];
    return potions;
  }

  getHerbs(): HerbsDto[] {
    const herbs = [
      {
        name: 'Alamanda',
        description:
          'Planta semi-arbustiva de porte médio e caule delgado. Possui flores amarelas com leve aroma adocicado. Parte utilizada: Flores.',
        potential: 2,
        price: 2,
        img: 'img',
      },
      {
        name: 'Citrizela',
        description:
          'Planta herbácea fa família das gramíneas. Possui folhas longas e lanceoladas. Ao ser macerada, libera um suave odor cítrico. Parte utilizada: Folhas. ',
        potential: -2,
        price: 2,
        img: 'img',
      },
    ];
    return herbs;
  }

  getCustomer(): any[] {
    const customer = [
      {
        id: 1,
        type: 'Trabalhador do feudo',
        gold: 2,
        case: 'Minhas mãos estão muito calejadas e doloridas. Preciso de algo que cicatrize rapidamente essas feridas',
        order: ['cura', 'cataplasma'],
        patience: 3,
      },
      {
        id: 2,
        type: 'Soldado',
        gold: 30,
        case: 'Ratos infestaram o quartel dos soldados. Preciso de algum tipo de veneno para acabar com a praga.',
        order: ['veneno'],
        patience: 3,
      },
      {
        id: 3,
        type: 'Morador do feudo',
        gold: 5,
        case: 'Minha lenha está toda molhada. Preciso de alguma coisa que me ajude a acender fogo com facilidade.',
        order: ['inflamável'],
        patience: 3,
      },
      {
        id: 4,
        type: 'Taverneiro',
        gold: 30,
        case: 'Minha cozinha está infestada de insetos. Preciso de algo que afugente as pragas antes que estraguem toda minha comida.',
        order: ['repelente'],
        patience: 3,
      },
      {
        id: 5,
        type: 'Agricultor',
        gold: 30,
        case: 'As chuvas recentes estragaram minha plantação. Preciso de algo que faça minhas plantas produzirem mais rapidamente.',
        order: 'fertilidade',
        patience: 3,
      },
      {
        id: 6,
        type: 'Guarda',
        gold: 30,
        case: 'Acabei me ferindo numa luta contra bandidos que tentavam saquear uma carruagem. Preciso de algo que cure rapidamente minhas feridas.',
        order: 'cura',
        patience: 3,
      },
      {
        id: 7,
        type: 'Trabalhador do feudo',
        gold: 30,
        case: 'Trabalho em uma mina e estamos em uma área com gás. Não podemos usar fogo e estamos trabalhando no escuro. Preciso de algo que clareie o ambiente.',
        order: 'luz',
        patience: 3,
      },
      {
        id: 8,
        type: 'Taverneiro',
        gold: 30,
        case: 'Recebi uma encomenda de cerveja mas o clima está quente e os clientes querem uma bebida gelada. Você tem algo que posso ser adicionado à cerveja que deixe-a gelada?',
        order: 'gelo',
        patience: 3,
      },
      {
        id: 9,
        type: 'Soldado',
        gold: 30,
        case: 'Os outros soldados caçoam de mim por ser franzino. Um grandalhão me desafiou para uma queda-de-braço e eu não pude recusar. Gostaria de uma poção que me deixasse realmente forte.',
        order: 'força',
        patience: 3,
      },
      {
        id: 10,
        type: 'Padre',
        gold: 30,
        case: 'Preciso de algo para adicionar à água benta para ajudar esse povo trabalhador a estar revigorado para o batente no dia seguinte.',
        order: 'cura',
        patience: 3,
      },
      {
        id: 11,
        type: 'Vassalo',
        gold: 30,
        case: 'O Senhor feudal está muito mal humorado por que está com dor de dente. Todos sofrem com o mau humor dele. Preciso de algo que cure rapidamente essa dor de dente.',
        order: ['cura', 'poção'],
        patience: 3,
      },
      {
        id: 12,
        type: 'Soldado',
        gold: 30,
        case: 'Eu sou um amante das mulheres porém com a idade chegando as coisas já não estão mais como antes. Preciso de algo que melhor minha virilidade, sabe?',
        order: ['libido'],
        patience: 3,
      },
      {
        id: 13,
        type: 'Trabalhador do feudo',
        gold: 30,
        case: 'Toupeiras estão destruindo nossas plantações. Se continuar assim, não haverá comida para o feudo. Preciso de algo que elimine-as ou afugente-as.',
        order: ['veneno', 'repelente'],
        patience: 3,
      },
      {
        id: 14,
        type: 'Moradora do feudo',
        gold: 30,
        case: 'Ratos infestaram o quartel dos soldados. Preciso de algum tipo de veneno para acabar com a praga.',
        order: 'veneno',
        patience: 3,
      },
      {
        id: 15,
        type: 'Meretriz',
        gold: 30,
        case: 'Minha cama está cheia de pulgas e percevejos. Preciso de algo que mate ou espante essas pragas.',
        order: ['veneno', 'repelente'],
        patience: 3,
      },
      {
        id: 16,
        type: 'Guarda',
        gold: 30,
        case: 'Um cara está me devendo ouro e não me paga. Quero dar um jeito nele. Mas não quero matá-lo. Apenas um susto, um recado, sabe?',
        order: 'paralisia',
        patience: 3,
      },
      {
        id: 17,
        type: 'Morador do feudo',
        gold: 30,
        case: 'Ratos infestaram o quartel dos soldados. Preciso de algum tipo de veneno para acabar com a praga.',
        order: 'veneno',
        patience: 3,
      },
      {
        id: 18,
        type: 'Soldado',
        gold: 30,
        case: 'Um golem de pedra gigante está bloqueando a passagem e os vassalos não conseguem mandar suprimentos para nosso feudo. Preciso de algo que me ajude com esse problema.',
        order: ['explosão', 'ácido'],
        patience: 3,
      },
      {
        id: 19,
        type: 'Ferreiro',
        gold: 30,
        case: 'Tenho um grande suprimento de ferramentas e armas para fazer. Preciso aumentar o calor da minha forja. Tem alguma coisa que possa me ajudar?',
        order: ['fogo'],
        patience: 3,
      },
      {
        id: 20,
        type: 'Soldado',
        gold: 30,
        case: 'Um vampiro está invadindo casas de donzelas à noite para sugar-lhes a vida. Preciso de algo que mate ou afugente esse vampiro',
        order: ['repelente'],
        patience: 3,
      },
    ];
    return customer;
  }
}
