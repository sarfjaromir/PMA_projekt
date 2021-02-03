import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  public getTranslation(text: String) {
    return this.http.get('https://api.thedogapi.com/v1/breeds');
  }
}
