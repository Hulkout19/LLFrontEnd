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
  drawCardBool: boolean = false;
  drawnCard: any;
  hold: any;
  guess: any;

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

  drawCard(): string{
    this.drawCardBool = true;
    this.drawnCard = this.deck[0];
    this.deck.splice(0,1)
    console.log(this.heldCard, this.deck);
    
    return "true";
  }

  play(): void{
    this.value.Player1HeldCard = this.hold;
    this.drawCardBool = false;

    switch(this.hold){
      case "1":

      
    }

  }
  guard():void{
    this.guess = true;
  }
}
