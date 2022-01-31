import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDto } from 'src/app/dtos/player.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private readonly boticariumService: BoticariumService,
    private readonly navigation: Router
  ) {}
  isNewPlayer = false;
  newPlayerName: string = '';
  newPlayer: PlayerDto = {
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
    potionStorage: [],
  };
  doubleNameMsg = false;
  fillNamePlease = false;
  playersList?: PlayerDto[];
  selectedPlayer?: PlayerDto;
  selectedPlayerId?: number;

  ngOnInit(): void {
    const listPlayers = this.getPlayers();
    if (listPlayers) {
      this.playersList = JSON.parse(listPlayers);
    }
  }

  startNewGame() {
    // creates the first player in localStorage
    const areTherePlayers = this.getPlayers();
    if (!areTherePlayers) {
      if (this.newPlayerName === '') {
        this.fillNamePlease = true;
      } else {
        this.fillNamePlease = false;
        this.newPlayer.stats.name = this.newPlayerName;
        this.newPlayer.stats.id = 1;
        localStorage.setItem('players', JSON.stringify([this.newPlayer]));
        sessionStorage.setItem('player', JSON.stringify(this.newPlayer));
        this.updatePlayersList();
        this.navigation.navigateByUrl('/historia');
      }
    } else {
      // creates the 'n' player in localStorage
      const player = this.getPlayers();
      if (player) {
        const parsePlayer = JSON.parse(player);
        const nameExists = parsePlayer.find(
          (play: any) => play.name === this.newPlayerName
        );
        if (nameExists) {
          this.doubleNameMsg = true;
        } else {
          this.doubleNameMsg = false;
          if (this.newPlayerName === '') {
            this.fillNamePlease = true;
          } else {
            this.fillNamePlease = false;
            this.newPlayer.stats.name = this.newPlayerName;
            this.newPlayer.stats.id = parsePlayer.length + 1;
            parsePlayer.push(this.newPlayer);
            localStorage.setItem('players', JSON.stringify(parsePlayer));
            sessionStorage.setItem('player', JSON.stringify(this.newPlayer));
            this.updatePlayersList();
            this.navigation.navigateByUrl('/historia');
          }
        }
      }
    }
  }

  getPlayers() {
    return localStorage.getItem('players');
  }

  updatePlayersList() {
    const storedPlayer = this.getPlayers();
    if (storedPlayer) {
      const parseStoredPlayer = JSON.parse(storedPlayer);
      this.boticariumService.setPlayersList(parseStoredPlayer);
      this.boticariumService.playersList.subscribe(
        (res) => (this.playersList = res)
      );
    }
  }

  selectPlayer(event: any) {
    this.selectedPlayerId = event.target.value;
    const playersList = this.getPlayers();
    if (playersList) {
      const parsePlayers = JSON.parse(playersList);
      const foundPlayer = parsePlayers.find(
        (player: any) => player.id == this.selectedPlayerId
      );
      this.selectedPlayer = foundPlayer;
    }
  }

  startGame() {
    const playersList = this.getPlayers();
    if (playersList) {
      const parsePlayers = JSON.parse(playersList);
      const foundPlayer = parsePlayers.find(
        (player: PlayerDto) => player.stats.id == this.selectedPlayerId
      );
      sessionStorage.setItem('player', JSON.stringify(foundPlayer));
      this.navigation.navigateByUrl("/laboratorio")
    }
  }
}
