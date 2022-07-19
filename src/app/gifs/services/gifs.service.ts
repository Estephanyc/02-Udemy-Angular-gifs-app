import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { GIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string [] = [];
  private api_key : string = 'zjkI7BfWc4tQKc2JSWISEVjaapWr0b2X';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial') !) || []
   }

  buscarGifts(query: string) {

   if(!this._historial.includes(query)) {
    query = query.trim().toLowerCase();
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);
    localStorage.setItem('historial', JSON.stringify(this._historial))

   }

  const params = new HttpParams()
  .set('api_key', this.api_key)
  .set('limit', '10')
  .set('q', query )

    this.http.get<GIFResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe((resp: GIFResponse) => {
      this.resultados = resp.data;
    })
    }
  
}
