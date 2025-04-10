import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

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
}
