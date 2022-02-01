import { Component, OnInit } from '@angular/core';
import { find, retry } from 'rxjs';
import { HerbsStorageDto } from 'src/app/dtos/herbs-storage.dto';
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

  constructor(private readonly boticariumService: BoticariumService) {}

  ngOnInit(): void {
    this.herbsList = this.boticariumService.getPlayerHerbs();
  }

  putIntoCauldron() {
    if (this.selectedHerb === '') {
      this.selectHerbPlease = true;
      return;
    }
    if (this.herbsList && this.selectedHerb) {
      this.selectHerbPlease = false;
      const findSelectedHerb = this.herbsList.find(
        (herb) => herb.name === this.selectedHerb
      );
      if (findSelectedHerb && findSelectedHerb.quantity > 0) {
        findSelectedHerb.quantity -= 1;
        this.subtractHerbFromSessionStorage(this.selectedHerb);
        const repeatedHerb = this.cauldronIngreds.find(
          (her) => her.name === this.selectedHerb
        );
        if (repeatedHerb) {
          findSelectedHerb.quantity -= 1;
          this.subtractHerbFromSessionStorage(this.selectedHerb);
          repeatedHerb.quantity += 1;
        } else {
          findSelectedHerb.quantity = 1;
          this.cauldronIngreds.push(findSelectedHerb);
        }
      }
    }
  }

  subtractHerbFromSessionStorage(herb: string) {
    const player = this.boticariumService.getCurrentPlayer();
    const index = player.herbStorage.findIndex(
      (her: HerbsStorageDto) => her.name === herb
    );
    player.herbStorage[index].quantity -= 1;
    console.log(player);
    // sessionStorage.setItem('player', JSON.stringify(herbsListSubstracted));
  }

  selectHerb(event: any) {
    this.selectedHerb = event.target.value;
  }
}
