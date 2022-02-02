import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerDto } from './dtos/player.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit{

  constructor(private readonly route: Router) { }
  
  title = 'boticarium';

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    const playersInLocalStorage = localStorage.getItem('players');
    if (playersInLocalStorage) {
      const playerInSessionStorage = sessionStorage.getItem('player');
      if (playerInSessionStorage) {
        const parseLocalStoragePlayers: PlayerDto[] = JSON.parse(
          playersInLocalStorage
        );
        const parseSessionStoragePlayer: PlayerDto = JSON.parse(
          playerInSessionStorage
        );
        const filteredPlayers = parseLocalStoragePlayers.filter(
          (player: PlayerDto) =>
            player.stats.name !== parseSessionStoragePlayer.stats.name
        );
        filteredPlayers.push(parseSessionStoragePlayer);
        localStorage.setItem(
          'players',
          JSON.stringify(filteredPlayers)
        );
      }
    }
  }

  ngOnInit() : void {
    const sessionPlayer = sessionStorage.getItem('player');
    const localPlayer = localStorage.getItem('players');
    if (!sessionPlayer || !localPlayer) {
      sessionStorage.removeItem('player');
      this.route.navigateByUrl('/')
    }
  }
}

