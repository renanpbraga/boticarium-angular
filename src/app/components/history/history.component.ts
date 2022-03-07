import { Component, OnInit } from '@angular/core';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
playerName?: string;
  constructor(private readonly boticariumService: BoticariumService) { }

  ngOnInit(): void {
    const player = this.boticariumService.getCurrentPlayer();
    this.playerName = player.stats.name;
  }

}
