import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovesService {
 
  holder1: string = "";

  constructor() { }

  public guard(myGuess: string, opponentCard: string): boolean{
    if(myGuess == opponentCard){
      console.log(true);
      return true;
    }
    else{
      console.log(false);
      return false;
    }

  }

  public priest(opponentCard: string): string{
    return opponentCard;
  }

  public baron(playerCard: string, opponent: string): any{
    if(Number(playerCard) == Number(opponent)){
      return 0
    }
    else if(Number(playerCard) > Number(opponent)){
      return 1;
    }
    else if(Number(opponent) > Number(playerCard)){
      return -1;
    }
    return 0;
  }

  // public king(playerCard: string, opponentCard: string): any{
  //   this.holder1 = opponentCard;
  //   opponentCard = playerCard;
  //   playerCard = this.holder1;
  //   return playerCard,opponentCard;
  // }

  public handMaid(){
    
  }
}
