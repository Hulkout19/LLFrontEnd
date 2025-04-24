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
  priestCard: any;
  showPriest: boolean = false;
  kingHolder: string = "";
  deckPlay: any[] = ["1","2","3","4","5","7","8","9"];
  guardDeck: any[] = ["1","2","3","4","5","7","8","9"];
  playGuard: boolean = false;
  gameOver: boolean = false;
  playableCard: boolean= false;
  playableCard2: boolean= false;

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
        this.playerHandmaidActive = false;
        this.playGuard = true;

        break;
       case "2":
        this.playerHandmaidActive = false;
         this.priestCard = this.move.priest(this.value.Player2HeldCard);
         this.showPriest = true;
         this.drawDisplay = false;
         break;
      // case "3":
      //this.playerHandmaidActive = false;
      //   this.move.baron();
      //   break;
      case "4":
        this.playerHandmaidActive = true;
        break;
      case "5":
        this.playerHandmaidActive = false;
        this.playOnSelf = false;
        if(this.playOnSelf){
          this.hold = this.forceDraw(this.hold);
        }
        else{
          this.value.Player2HeldCard = this.forceDraw(this.value.Player2HeldCard);
        }
        
        break;
      case "7":
        this.playerHandmaidActive = false;
        this.kingHolder = this.value.Player2HeldCard;
        this.value.Player2HeldCard = this.hold;
        this.hold=this.kingHolder;
        break;
      // case "8":
      //   this.playerHandmaidActive = false;
      //   this.move.countess();
      //   break;

    }

  }
  
  public hideCard(): any{
    this.showPriest = false;
    this.priestCard = "";
    this.drawDisplay = true;
  }

 

  public opponentDrawCard(value: string): any {
    value = this.deck[0];
    this.deck.splice(0,1)
    // value = this.drawnCard
    // console.log(value, this.deck);
    
    return value;
  }

  public forceDraw(value: string): any{
    this.discardDeck.push(value);
    console.log(value);
    value = this.opponentDrawCard(value);
    return value;
  }

  
  public guessGuard(guess: any) {
    console.log(guess);
    this.playGuard = false;
    if(guess == this.value.Player2HeldCard){
      this.gameOver = true;
    }
    console.log(this.gameOver);
  }
}
