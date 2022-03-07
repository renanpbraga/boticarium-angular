import { Component, OnInit } from '@angular/core';
import { PlayerDto } from 'src/app/dtos/player.dto';
import { BoticariumService } from 'src/app/services/boticarium.service';

@Component({
  selector: 'app-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.scss']
})
export class BedroomComponent implements OnInit {

  constructor(private readonly boticariumService: BoticariumService) { }
player?: PlayerDto;
stats?: any;
  ngOnInit(): void {
    this.player = this.boticariumService.getCurrentPlayer();
    console.log(this.player);
  }

}
