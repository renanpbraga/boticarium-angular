import { Component, OnChanges, OnInit } from '@angular/core';
import { PlayerDto } from 'src/app/dtos/player.dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnChanges {
  constructor() {}
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
  playersList?: any[];
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
    const areTherePlayers = this.getPlayers();
    if (!areTherePlayers) {
      this.newPlayer.name = this.newPlayerName;
      this.newPlayer.id = 1;
      localStorage.setItem('players', JSON.stringify([this.newPlayer]));
    } else {
      const player = this.getPlayers();
      if (player) {
        const parsePlayer = JSON.parse(player);
        const nameExists = parsePlayer.find(
          (play: any) => play.name === Number(this.newPlayerName)
        );
        if (nameExists) {
          this.doubleNameMsg = true;
        } else {
          this.doubleNameMsg = false;
          this.newPlayer.name = this.newPlayerName;
          this.newPlayer.id = parsePlayer.length + 1;
          parsePlayer.push(this.newPlayer);
          localStorage.setItem('players', JSON.stringify(parsePlayer));
        }
      }
    }
  }

  getPlayers() {
    return localStorage.getItem('players');
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
