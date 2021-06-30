import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CsvHeader } from '../../models/CsvHeader';

@Component({
  selector: 'app-csv-header-match',
  templateUrl: './csv-header-match.component.html',
  styleUrls: ['./csv-header-match.component.scss']
})
export class CsvHeaderMatchComponent implements OnInit {

  @Input()
  expectedHeaders: Array<string> = [];

  @Input()
  headers: Array<string> = [];

  @Output()
  headersAssigned = new EventEmitter();

  requiredHeaders: Array<CsvHeader> = [];

  constructor() { }

  ngOnInit() {
    for (const header of this.expectedHeaders) {
      this.requiredHeaders.push({requiredValue: header} as CsvHeader);
    }
  }

  returnHeaders() {
    this.headersAssigned.emit(this.requiredHeaders);
  }

  updateRequiredHeaders(head: CsvHeader, value) {
    head.csvHeaderValue = value;
    for (const i in this.requiredHeaders) {
      if (this.requiredHeaders[i].requiredValue === head.requiredValue) {
        this.requiredHeaders[i] = head;
        break;
      }
    }
  }

}
