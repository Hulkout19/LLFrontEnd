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
      return this.heldPriest(drawnCard);
        break;
      case '3':
        return this.heldBaron(drawnCard);
        break;
      case '4':
        return this.heldHandmaid(drawnCard);
        break;
      case '5':
        return this.heldPrince(drawnCard);
        break;
      case '7':
        return this.heldKing(drawnCard);
        break;
      case '8':
        return this.heldCountess(drawnCard);
        break;
      case '9':
        return this.heldPrincess(drawnCard);
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
      if(this.assumedCard > 7 && this.confidence == 1){
        return 0;
      }
      else{
        return 1;
      }
      break;
      // case 8 and 9 will result in the guard being played everytime
      default:
      return 1;
      break;
    }
  }
  }

  heldPriest(drawnCard: any) {
    switch (drawnCard) {
      case "1":
      if(this.confidence > 0.75){
        return 0;
      }
      else{
        return 1;
      }
      break;
      case "2":
        return 0;
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
      if(this.assumedCard > 2 && this.confidence > 0.75){
        return 0;
      }
      else{
        return 1;
      }
      break;
      case "7":
      if(this.assumedCard > 7 && this.confidence == 1){
        return 0;
      }
      else{
        return 1;
      }
      break;
      // case 8 and 9 will result in the guard being played everytime
      default:
      return 1;
      break;
    }
  }

  heldBaron(drawnCard: any) {
    switch (drawnCard) {
      case "1":
        return 0;
      break;
      case "2":
        return 0;
      break;
      case "3":
        return 0;
      break;
      case "4":
        return 0;
      break;
      case "5":
        if(this.assumedCard <= 5 && this.confidence >= 0.9){
          return 1;
        }
        else{
          return 0;
        }
      break;
      case "7":
        if(this.assumedCard <= 7 && this.confidence >= 0.8){
          return 1;
        }
        else{
          return 0;
        }
      break;
      case "8":
        if(this.assumedCard != 9 && this.confidence >= 0.7){
          return 1;
        }
        else{
          return 0;
        }
      break;
      case "9":
        return 1;
      break;
      default:
        return 1;
      break;
      }
      
    }

  heldHandmaid(drawnCard: any) {
    switch (drawnCard) {
      case "1":
        if(this.assumedCard != 1 && this.confidence > 0.9){
          return 0;
        }
        else{
          return 1;
        }
      break;
      case "2":
        if(this.confidence < 0.5){
          return 0;   
        }
        else{
          return 1;
        } 
      break;
      case "3":
        return 1;
      break;
      case "4":
        return 0;
      break;
      default:
        return 1;
      break;
    }
  }
  heldPrince(drawnCard: any) {
    switch (drawnCard) {
      case "1":
        if(this.assumedCard != 1 && this.confidence > 0.5){
          return 0;
        }
        else{
          return 1;
        }
      break;
      case "2":
        if(this.confidence < 1){
          return 0;   
        }
        else{
          return 1;
        }
      break;
      case "3":
        if(this.assumedCard < 5 && this.confidence > 0.9){
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
        return 0;
      break;
      case "7":
        return 1;
      break;
      case "8":
        return 0;
      break;
      case "9":
        return 1;
      break;
      default:
        return 1;
      break;
    }
  }

  heldKing(drawnCard: any) {
    return 1;
    switch (drawnCard) {
      case "1":
          return 0
        break;
      case "2":
        return 0;
      break;
      case "3":
        if(this.assumedCard <= 7 && this.confidence > 0.5){
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
        return 0;
      break;
      case "8":
        return 0;
      break;
      case "9":
        return 1;
      break;
      default:
        return 0;
      break;
    }
  }
  heldCountess(drawnCard: any) {
    switch (drawnCard) {
      case "1":
        return 0;

      break;
      case "2":
        return 0;
      break;
      case "3":
        if(this.assumedCard <= 8 && this.confidence > 0.7){
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
        return 1;
      break;
      case "7":
        return 1;
      break;
      case "9":
        return 1;
      break;
      default:
        return 1;
      break;
    }
  }
  heldPrincess(drawnCard: any) {
    return 0;
  }

  public setAssumedCard(assumedCard: any) {
    this.assumedCard = assumedCard;
    this.confidence = 1;
    console.log("knownCard: " + this.assumedCard);
  }

  constructor() { }
}
