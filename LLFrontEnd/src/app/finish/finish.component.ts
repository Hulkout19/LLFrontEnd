import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent {

heldCard: any;
opponentHeldCard: any;
playCard: any;
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.heldCard = params['held'];
    this.opponentHeldCard = params['opponentHeld'];
    this.playCard = params['play'];

  });
}
}
