import { Component, OnChanges, OnInit } from '@angular/core';
import { PlayerDto } from 'src/app/dtos/player.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnChanges {
  constructor(private readonly boticariumService: BoticariumService) {}
  isNewPlayer = false;
  newPlayerName: string = '';
  newPlayer: PlayerDto = {
    id: 0,
    gold: 0,
    name: '',
    level: 1,
    reputation: 0,
    tendency: 'Neutro',
    experience: 0,
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

  ngOnChanges(): void {
    this.getPlayers();
  }

  startNewGame() {
    // creates the first player in localStorage
    const areTherePlayers = this.getPlayers();
    if (!areTherePlayers) {
      if (this.newPlayerName === '') {
        this.fillNamePlease = true;
      } else {
        this.fillNamePlease = false;
        this.newPlayer.name = this.newPlayerName;
        this.newPlayer.id = 1;
        localStorage.setItem('players', JSON.stringify([this.newPlayer]));
        this.updatePlayersList();
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
            this.newPlayer.name = this.newPlayerName;
            this.newPlayer.id = parsePlayer.length + 1;
            parsePlayer.push(this.newPlayer);
            localStorage.setItem('players', JSON.stringify(parsePlayer));
            this.updatePlayersList();
            const storedPlayer = this.getPlayers();
            if (storedPlayer) {
              const parseStoredPlayer = JSON.parse(storedPlayer);
              this.boticariumService.setPlayersList(parseStoredPlayer);
              this.boticariumService.playersList.subscribe(
                (res) => (this.playersList = res)
              );
            }
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
        (player: any) => player.id == this.selectedPlayerId
      );
      sessionStorage.setItem('player', JSON.stringify(foundPlayer));
    }
  }
}
