import { Component, HostListener } from '@angular/core';
import { PlayerDto } from './dtos/player.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
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
}

