import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { MovesService } from '../services/moves.service';

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
  playCard: any;
  readyToPlay: boolean = false;
  displayOnly: boolean = true;
  drawDisplay: boolean = true;
  tempHeldCard: any;
  tempDrawnCard: any;

  constructor(private gameService: GameService, private move: MovesService) {}

  ngOnInit(): void {
    this.gameService.getGame().subscribe(data => {
      this.value = data.value;
      this.gameData = data.value;
      // console.log(this.gameData)
      this.deck = this.value.ShuffledDeck.trim().split(" ");
      console.log(this.value);
      this.hold = this.value.Player1HeldCard;
    });

    
  }

  drawCard(): string{
    this.drawDisplay = false;
    this.drawCardBool = true;
    this.drawnCard = this.deck[0];
    this.deck.splice(0,1)
    this.displayOnly = false;
    console.log(this.heldCard, this.deck);
    
    return "true";
  }

  // opponentDrawCard(): string{
  //   this.
  // }

  

  setHeldCard(): void {
    // if(!this.displayOnly){
    //   this.playCard = this.hold;
    //   this.hold = this.drawnCard;
    //   this.readyToPlay = true;
    //   console.log(this.playCard + "And " + this.hold);
    //   this.displayOnly = true;
    //   console.log("success");
    // }
    // console.log("no sir");
    this.readyToPlay = true;
    this.tempHeldCard = this.drawnCard;
    this.tempDrawnCard = this.hold;
    console.log("The card you are holding " + this.tempHeldCard);
    console.log("The card you have selcted for play "+ this.tempDrawnCard);
  }

  keepHeldCard(): void{
    // if(!this.displayOnly){
    //   this.playCard = this.drawnCard;
    //   this.readyToPlay = true;
    //   this.displayOnly = true;
    //   console.log("success");
    // }
    // console.log("No sir");

    this.readyToPlay = true;
    this.tempHeldCard = this.hold;
    this.tempDrawnCard = this.drawnCard;
    console.log("The card you are holding " + this.tempHeldCard);
    console.log("The card you have selected for play "+ this.tempDrawnCard);
    
  }

  play(): void{
    this.hold = this.tempHeldCard;
    this.playCard = this.tempDrawnCard;
    console.log("The card you are playing:" + this.playCard);
    this.drawCardBool = false;
    this.drawDisplay = true;

    switch(this.playCard){
      case "1":
        console.log(this.move.guard("1",this.value.Player2HeldCard));
    }

  }
  
  guard():void{
    this.guess = true;
  }
}
