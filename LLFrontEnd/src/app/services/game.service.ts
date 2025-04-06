import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private apiUrl = "http://localhost:5080/api/api_test/getGamePieces"
  private holder: any;

  constructor(private http: HttpClient) { }
    getGame(): Observable <any> {
      this.holder=this.http.get(this.apiUrl);
      return this.holder;
    
  }
}
