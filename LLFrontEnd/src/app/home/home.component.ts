import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  gameData : any[] = [];
  value: any;
  deck: any[] = []
  heldCard: any;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGame().subscribe(data => {
      this.value = data.value;
      this.gameData = data.value;
      // console.log(this.gameData)
      this.deck = this.value.ShuffledDeck.trim().split(" ");
      console.log(this.value);
    });

    
  }

  onClick(){

  }

  drawCard(): string{
    const newCard = this.deck[0];
    this.heldCard = newCard;
    console.log(this.heldCard);
    return newCard;
  }
}
