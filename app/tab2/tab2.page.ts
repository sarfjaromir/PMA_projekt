import { Component } from '@angular/core';
import { HistoryService } from '../api/history.service';
import { HistoryRecord } from '../models/history-record.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  today: String
  historyArray: HistoryRecord[]

  constructor(private historyService: HistoryService) {
  }

  ionViewWillEnter() {
    this.historyArray = this.historyService.getRecord();
  }
}
