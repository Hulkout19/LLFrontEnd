import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpponentService {

  confidence: number = 0.50;
  assumedCard: number = 3;
  handmaid: boolean = false;
  play(opponentPlayCard: any) {
    throw new Error('Method not implemented.');
  }
  public ChooseCard(heldCard: any, drawnCard: any, assumedCard:any): any {
    switch (heldCard) {
      case '1':
      return this.heldGuard(drawnCard);
      break;
      case '2':
      //this.heldPriest(drawnCard);
      break;
      case '3':
      //this.heldBaron(drawnCard);
      break;
      case '4':
      //this.heldHandmaid(drawnCard);
      break;
      case '5':
      //this.heldPrince(drawnCard);
      break;
      case '7':
      //this.heldKing(drawnCard);
      break;
      case '8':
      //this.heldCountess(drawnCard);
      break;
      case '9':
      //this.heldPrincess(drawnCard);
      break;
      default:
      throw new Error('Invalid card value');
    }
    return drawnCard
  }




  heldGuard(drawnCard: any) {
    this.confidence = 1;
    if(this.confidence > 0.75 && this.assumedCard != 1){
      return 1;
    }
    else{
    switch (drawnCard) {
      case "1":
      return 1;
      break;
      case "2":
      if(this.confidence > 0.75){
        return 1;
      }
      else{
        return 0;
      }
      break;
      case "3":
      if(this.handmaid == true){
        return 0;
      }
      else{
        return 1;
      }
      break;
      case "4":
      return 0;
      break;
      case "5":
      if(this.assumedCard < 5){
        return 1;
      }
      else{
        return 0;
      }
      break;
      case "7":
      if(this.assumedCard > 7){
        return 0;
      }
      else{
        return 1;
      }
      break;
      // case 8 and 9 will result in the guard being played everytime
      default:
      return 0;
      break;
    }
  }
  }


  constructor() { }
}
