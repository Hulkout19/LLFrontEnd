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
  playerHandmaidActive: boolean = false;
  discardDeck: any[] = [];
  playOnSelf: boolean = true;

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

  

  // public discard(): void{
  //   this.discardDeck.push(this.hold);
  //   this.hold = this.forceDraw();
  // }

  

  setHeldCard(): void {
    if(!this.displayOnly){
      this.readyToPlay = true;
      this.tempHeldCard = this.drawnCard;
      this.tempDrawnCard = this.hold;
      console.log("The card you are holding " + this.tempHeldCard);
      console.log("The card you have selected for play "+ this.tempDrawnCard);
    }
  }

  keepHeldCard(): void{
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
    this.discardDeck.push(this.playCard);
    this.drawCardBool = false;
    this.drawDisplay = true;
    this.readyToPlay = false;
    this.displayOnly = true;

    switch(this.playCard){
      case "1":
        console.log(this.move.guard("1",this.value.Player2HeldCard));
        break;
      // case "2":
      //   this.move.priest();
      //   break;
      // case "3":
      //   this.move.baron();
      //   break;
      // case "4":
      //   this.playerHandmaidActive = true;
      //   break;
      case "5":
        this.playOnSelf = true;
        if(this.playOnSelf){
          this.hold = this.forceDraw(this.hold);
        }
        else{
          this.value.Player2HeldCard = this.forceDraw(this.value.Player2HeldCard);
        }
        
      //   break;
      // case "7":
      //   this.move.king();
      //   break;
      // case "8":
      //   this.move.countess();
      //   break;

    }

  }
  
  guard():void{
    this.guess = true;
  }

 

  public opponentDrawCard(value: string): any {
    this.drawnCard = this.deck[0];
    this.deck.splice(0,1)
    value = this.drawnCard
    console.log(value, this.deck);
    
    return value;
  }

  public forceDraw(value: string): any{
    this.discardDeck.push(value);
    console.log(value);
    this.opponentDrawCard(value);
  }
}
