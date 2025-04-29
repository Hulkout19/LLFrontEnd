import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { MovesService } from '../services/moves.service';
import { OpponentService } from '../services/opponent.service';

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
  guardDeck: any[] = ["2","3","4","5","7","8","9"];
  playGuard: boolean = false;
  gameOver: boolean = false;
  playableCard: boolean= false;
  playableCard2: boolean= false;
  baronResult: any;
  winner: any;
  opponentDrawnCard: any;
  opponentDrawnCard2: any;
  opponentPlayCard: any;
  decision: any;
  assumedCard: any;

  constructor(private gameService: GameService, private move: MovesService, private opponent: OpponentService) {}


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

  

  gameloop(): void{
    
  }

  

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
      case "3":
        this.playerHandmaidActive = false;
        this.baronResult = this.move.baron(this.playCard, this.value.Player2HeldCard);
        if(this.baronResult == 0){
          this.gameOver = false;
        }
        else if(this.baronResult == 1){
          this.gameOver = true;
          this.winner = "you won!";
        }
        else if(this.baronResult == -1){
          this.gameOver = true;
          this.winner = "you lost!";
        }
        console.log(this.gameOver);
        break;
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
    if(!this.gameOver){
      console.log("playing...");
      this.opponentTurn(this.hold);
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
      this.winner = "you won!";
    }
    console.log(this.gameOver);
  }

  public opponentTurn(playerCard: any): any{
    this.assumedCard = "6";
    this.opponentDrawnCard2 = this.deck[0];
    this.deck.splice(0,1);
    console.log("opponent hold:" + this.value.Player2HeldCard);
    console.log("opponent draw:" + this.opponentDrawnCard2);
    this.decision = this.opponent.ChooseCard(this.value.Player2HeldCard,this.opponentDrawnCard2, 3);
    //0 means keep held card and play drawn card, 1 means keep drawn card and play held card
    if(this.decision == 0){
      console.log("Opponent played drawn card");
      this.opponentPlayCard = this.opponentDrawnCard2;
      this.discardDeck.push(this.opponentDrawnCard2);
      //this.opponent.play(this.opponentPlayCard);
      console.log("the opponent played:" + this.opponentPlayCard);
      console.log("the opponent is now holding:" + this.value.Player2HeldCard);
    }
    else if(this.decision == 1){
      console.log("Opponent played held card");
      this.opponentPlayCard = this.value.Player2HeldCard;
      this.discardDeck.push(this.value.Player2HeldCard);
      this.value.Player2HeldCard = this.opponentDrawnCard2;
      console.log("the opponent played:" + this.opponentPlayCard);
      console.log("the opponent is now holding:" + this.value.Player2HeldCard);
    }
    console.log(this.opponentPlayCard);
    console.log("assumed card 1: " + this.assumedCard);
    this.playOpponent(this.opponentPlayCard,this.assumedCard, playerCard);
  }

  public playOpponent(playCard:any, assumedCard:any, playerCard:any): any{
    console.log("opponent assumed:" + assumedCard);
    switch(playCard){
      case "1":
        this.opponentGuard(assumedCard);
        break;
      case "2":
        this.opponent.setAssumedCard(playerCard);
        break;
      // case "3":
      //   this.baronResult = this.move.baron(this.opponentPlayCard, this.hold);
      //   if(this.baronResult == 0){
      //     this.gameOver = false;
      //   }
      //   else if(this.baronResult == 1){
      //     this.gameOver = true;
      //     this.winner = "you lost!";
      //   }
      //   else if(this.baronResult == -1){
      //     this.gameOver = true;
      //     this.winner = "you won!";
      //   }
      //   console.log(this.gameOver);
      //   break;
      // case "4":
      //   //this.opponent.handmaid();
      //   break;
      // case "5":
      //   //this.opponent.prince();
      //   break;
      // case "7":
      //   //this.opponent.king();
      //   break;
      // case "8":
      //   //this.opponent.countess();
      //   break;

    }
  }

  public opponentGuard(guess: any) {
    console.log(guess);
    if(guess == "6"){
      this.gameOver = true;
      this.winner = "you lost!";
    }
    console.log(this.gameOver);
  }




  
}


