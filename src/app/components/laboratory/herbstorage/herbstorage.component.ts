import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HerbsStorageDto } from 'src/app/dtos/herbs-storage.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-herbstorage',
  templateUrl: './herbstorage.component.html',
  styleUrls: ['./herbstorage.component.scss'],
})
export class HerbstorageComponent implements OnInit {
  herbstorage?: HerbsStorageDto[];
  constructor(private readonly boticariumService: BoticariumService) {}

  ngOnInit(): void {
    this.boticariumService.herbStorageList.subscribe(
      (res) => {
        if (res) {
          this.herbstorage = res;
        } else {
          this.herbstorage = this.boticariumService.getPlayerHerbs();
        }
      }
    );
  }
}
