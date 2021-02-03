import { Component } from '@angular/core';
import {TranslationService} from '../api/translation.service';
import { HistoryRecord } from '../models/history-record.model';
import { HistoryService } from '../api/history.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  myinput:String = ''
  myoutput:String = ''

  vaha:String = ''
  vyska:String = ''

  detail:String = ''
  detailClass:String = 'hidden';

  signArr = ['+','-'];
  indexSign = 0;

  itemsBase = [];
  itemsShow = [];

  maxH:String = '0';
  maxW:String = '0';

  constructor(private translationService: TranslationService, private historyService: HistoryService) {
    this.translationService.getTranslation(this.myinput).subscribe( (data) =>
    {
      let tmp1;
      for(let i = 0; i < Object.keys(data).length; i++){
        let tmp =[
          data[i].name,
          data[i].image.url,
          data[i].weight.metric,
          data[i].height.metric,
          data[i].life_span,
          data[i].breed_group,
          data[i].bred_for,
          data[i].origin,
          data[i].temperament,
          data[i].id
        ];
        tmp1 = this.dataToInt(data[i].height.metric);
        if(this.maxH < tmp1[1]){
          this.maxH = tmp1[1];
        }
        tmp1 = this.dataToInt(data[i].weight.metric);
        if(this.maxW < tmp1[1]){
          this.maxW = tmp1[1];
        }
        this.itemsBase.push(tmp);
        this.itemsShow.push(tmp);
      }
    });
  }

  public _zmenaTextu(event: any, itemsBase, itemsShow, vaha, vyska, myinput): void{
    this.itemsShow = [];
    for(let i = 0; i < this.itemsBase.length; i++){
      if(this.itemsBase[i][0].toLowerCase().includes(this.myinput)){
        if(this.vyska == ''){
          if(this.vaha == ''){
            // oboji null
            this.itemsShow.push(this.itemsBase[i]);
          }else{
            // vyska null
            let vahaItem = this.dataToInt(this.itemsBase[i][2]);
            if(vahaItem[0] <= Object(this.vaha).upper && vahaItem[1] >= Object(this.vaha).lower){
              this.itemsShow.push(this.itemsBase[i]);
            }
          }
        }else{
          let vyskaItem = this.dataToInt(this.itemsBase[i][3]);
          if(this.vaha == ''){
            // vaha null
            if(vyskaItem[0] <= Object(this.vyska).upper && vyskaItem[1] >= Object(this.vyska).lower){
              this.itemsShow.push(this.itemsBase[i]);
            }
          }else{
            // zadny null
            let vahaItem = this.dataToInt(this.itemsBase[i][2]);
            if((vyskaItem[0] <= Object(this.vyska).upper && vyskaItem[1] >= Object(this.vyska).lower) && (vahaItem[0] <= Object(this.vaha).upper && vahaItem[1] >= Object(this.vaha).lower)){
              this.itemsShow.push(this.itemsBase[i]);
            }
          }
        }

      }
    }
  }

  public dataToInt(data:String){
    let toReturn = [];
    let tmp = '';
    data = data.replace(/\s/g, "");
    for(let i = 0; i < Object.keys(data).length; i++){
      if(data[i] != '-'){
        tmp += data[i];
        if((i + 1) == Object.keys(data).length){
          toReturn.push(tmp);
          tmp = '';
        }
      }else{
        toReturn.push(tmp);
        tmp = '';
      }
    }
    return toReturn;
  }

  itemSelected(item: string, vaha, vyska, myinput) {
    var checkboxElement = <HTMLInputElement> document.getElementById(item[9]);
    if(checkboxElement.checked){
      let record = new HistoryRecord(item[0], new Date().toLocaleString(), Object(this.vaha).lower, Object(this.vaha).upper, Object(this.vyska).lower, Object(this.vyska).upper, this.myinput);
      this.historyService.saveRecord(record);
      this.indexSign = 1;
    }else{
      this.indexSign = 0;
    }
  }
}
