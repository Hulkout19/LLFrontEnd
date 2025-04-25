import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpponentService {
  play(opponentPlayCard: any) {
    throw new Error('Method not implemented.');
  }
  public ChooseCard(heldCard: any, drawnCard: any, assumedCard:any): void {
    
    return drawnCard
  }

  constructor() { }
}
