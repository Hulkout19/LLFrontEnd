import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { MovesService } from '../services/moves.service';
import { OpponentService } from '../services/opponent.service';
import { Router } from '@angular/router';

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
  possibleCards: any[] = ["1","1","1","1","1","2","2","3","3","4","4","5","5","7","8","9"];
  opponentPossibleCards: any[] = ["1","1","1","1","1","2","2","3","3","4","4","5","5","7","8","9"];
  opponentsPossibleCardsLow: any[] = ["1","1","1","1","1","2","2","3","3","4","4"];
  opponentsPossibleCardsHigh: any[] = ["5","5","7","8","9"];
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
  opponentHandMaid: boolean = false;
  decision: any;
  assumedCard: any;
  continue: boolean = false;
  initialSetup: boolean = true;
  newAssumedCard: any;
  doneGuess: boolean = false;

  constructor(private gameService: GameService, private move: MovesService, private opponent: OpponentService, private router: Router) {}


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

   async play(): Promise<void>{


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
        if(this.opponentHandMaid){
          console.log("the opponent is protected by the handmaid");
          break;
        }
        this.playerHandmaidActive = false;

        this.playGuard = true;
        while(this.playGuard){
          console.log("waiting for guard guess...");
          await this.delay(1000);
        }
        break;
       case "2":
        if(this.opponentHandMaid){
          console.log("the opponent is protected by the handmaid");
          break;
        }
         this.playerHandmaidActive = false;
         this.priestCard = this.move.priest(this.value.Player2HeldCard);
         this.showPriest = true;
         this.drawDisplay = false;
         await this.delay(7000);
         this.showPriest = false;
         this.drawDisplay = true;
         break;
      case "3":
        if(this.opponentHandMaid){
          console.log("the opponent is protected by the handmaid");
          break;
        }
        this.playerHandmaidActive = false;
        this.baronResult = this.move.baron(this.hold, this.value.Player2HeldCard);
        console.log("The card that was compared is: " + this.hold + " vs " + this.value.Player2HeldCard);
        if(this.baronResult == 0){
          this.gameOver = false;
          
        }
        else if(this.baronResult == 1){
          this.gameOver = true;
          this.winner = "you won!";
          this.router.navigate(['/finish'],{ queryParams: { held: this.tempHeldCard, opponentHeld: this.value.Player2HeldCard, play: this.playCard } });
        }
        else if(this.baronResult == -1){
          this.gameOver = true;
          this.winner = "you lost!";
            this.router.navigate(['/finish'],{ queryParams: { held: this.tempHeldCard, opponentHeld: this.value.Player2HeldCard, play: this.playCard } });
        }
        console.log(this.gameOver);
        break;
      case "4":
        this.playerHandmaidActive = true;
        break;
      case "5":
        if(this.opponentHandMaid){
          console.log("the opponent is protected by the handmaid");
          break;
        }
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
        if(this.opponentHandMaid){
          console.log("the opponent is protected by the handmaid");
          break;
        }
        this.playerHandmaidActive = false;
        this.kingHolder = this.value.Player2HeldCard;
        this.value.Player2HeldCard = this.hold;
        this.hold=this.kingHolder;
        break;
      case "8":
        this.playerHandmaidActive = false;
        //this.move.countess();
        break;

    }
    if(!this.gameOver){
      this.newAssumedCard = this.findAssumedCard(this.playCard,this.hold);
      console.log("new assumed card: " + this.newAssumedCard);
      console.log("the opponent is thinking...");
      await this.delay(2500);
      // this.opponentTurn(this.hold, this.newAssumedCard);
      this.opponentTurn(this.hold, this.assumedCard);
    }
  }



  findAssumedCard(playCard: any, hold:any): any{
    //remove the card from the possible cards
    if(Number(playCard) <= 4){
      const index = this.opponentsPossibleCardsLow.indexOf(playCard);
      if (index > -1) {
        this.opponentsPossibleCardsLow.splice(index, 1);
      }
    }
    else if(Number(playCard) > 4){
      const index = this.opponentsPossibleCardsHigh.indexOf(playCard);
      if (index > -1) {
        this.opponentsPossibleCardsHigh.splice(index, 1);
      }
    }

    const index = this.opponentPossibleCards.indexOf(playCard);
    if (index > -1) {
      this.opponentPossibleCards.splice(index, 1);
    }

    if(this.initialSetup){
          this.initialSetup = false;
          this.assumedCard = ["2", "3", "4", "5"][Math.floor(Math.random() * 4)];
          console.log("assumed card initial: " + this.assumedCard);
          console.log("initial setup:" + this.initialSetup)
    }
      
    else{
      if(this.assumedCard == playCard){
      switch (playCard) {
        case "1":
          this.assumedCard = this.opponentPossibleCards[Math.floor(Math.random() * this.opponentPossibleCards.length)];
          console.log("assumed card 1: " + this.assumedCard);
          break;
        case "2":
          this.assumedCard = this.opponentPossibleCards[Math.floor(Math.random() * this.opponentPossibleCards.length)];
          console.log("assumed card 2: " + this.assumedCard);
          break;
        case "4":
          this.assumedCard = this.opponentPossibleCards[Math.floor(Math.random() * this.opponentPossibleCards.length)];
          console.log("assumed card 4: " + this.assumedCard);
          break;
        case "5":
          this.assumedCard = this.opponentsPossibleCardsHigh[Math.floor(Math.random() * this.opponentsPossibleCardsHigh.length)];
          console.log("assumed card 5: " + this.assumedCard);
          break;
        case "7":
          this.assumedCard = hold;
          console.log("assumed card 7: " + this.assumedCard);
          break;
        case "8":
          this.assumedCard = this.opponentsPossibleCardsHigh[Math.floor(Math.random() * this.opponentsPossibleCardsHigh.length)];
          console.log("assumed card 8: " + this.assumedCard);
          break;
        default:
          this.assumedCard = this.opponentPossibleCards[Math.floor(Math.random() * this.opponentPossibleCards.length)];
          break;
      }
    }
      return this.assumedCard;
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
    if(this.value.Player2HeldCard == "9"){
      this.gameOver = true;
      this.winner = "you won!";
      this.router.navigate(['/finish'],{ queryParams: { held: this.tempHeldCard, opponentHeld: this.value.Player2HeldCard, play: this.playCard } });
      return;
    }
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
      this.router.navigate(['/finish'],{ queryParams: { held: this.tempHeldCard, opponentHeld: this.value.Player2HeldCard, play: this.playCard } });
      return true;
    }
    else{
      return false;
    }
  }

  public opponentTurn(playerCard: any, assumedCard: any): any{
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
    console.log("assumed card 1: " + assumedCard);
    this.playOpponent(this.opponentPlayCard,assumedCard, playerCard, this.value.Player2HeldCard);
  }

  public playOpponent(playCard:any, assumedCard:any, playerCard:any, heldCard:any): any{
    this.opponentHandMaid = false;
    console.log("opponent assumed:" + assumedCard);
    switch(playCard){
      case "1":
        if(this.playerHandmaidActive){
          console.log("the player is protected by the handmaid");
          break;
        }
        this.opponentGuard(assumedCard);
        break;
      case "2":
        if(!this.playerHandmaidActive){
          this.assumedCard = playerCard;
        }
        else{
          console.log("the player is protected by the handmaid");
        }
        break;
      case "3":
        if(this.playerHandmaidActive){
          console.log("the player is protected by the handmaid");
          break;
        }
        if(heldCard > playerCard){
          this.gameOver = true;
          this.winner = "player lost!";
        }
        else if(heldCard < playerCard){
          this.gameOver = true;
          this.winner = "player won!";
        }
        else if(heldCard == playerCard){
          this.gameOver = false;
          this.winner = "it was a tie! Continue on...";
        }
        break;
      case "4":
        this.opponentHandMaid = true;
        break;
      case "5":
        if(this.playerHandmaidActive){
          console.log("the player is protected by the handmaid");
          break;
        }
        this.opponentPrince();
        break;
      case "7":
        if(this.playerHandmaidActive){
          console.log("the player is protected by the handmaid");
          break;
        }
        this.kingHolder = this.value.Player2HeldCard;
        this.value.Player2HeldCard = playerCard;
        this.hold=this.kingHolder;
        break;
      case "8":
        console.log("opponent played countess");
        break;

    }
  }

  public opponentGuard(guess: any) {
    console.log("opponent guess is:" + guess);
    if(guess == "6"){
      this.gameOver = true;
      this.winner = "you lost!";
    }
    console.log(this.gameOver);
  }

  opponentPrince(): any{
    this.discardDeck.push(this.hold);
    if(this.hold == "9"){
      this.gameOver = true;
      this.winner = "player lost!";
      this.router.navigate(['/finish'],{ queryParams: { held: this.tempHeldCard, opponentHeld: this.value.Player2HeldCard, play: this.playCard } });
      return;
    }
    else{
      this.hold = this.deck[0];
      this.deck.splice(0,1);
      console.log(this.hold);
    }
    

  }


  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}


