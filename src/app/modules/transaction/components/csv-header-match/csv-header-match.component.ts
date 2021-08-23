import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-csv-header-match',
  templateUrl: './csv-header-match.component.html',
  styleUrls: ['./csv-header-match.component.scss']
})
export class CsvHeaderMatchComponent implements OnChanges {

  @Input()
  headers: Array<string> = [];

  valuesSet: boolean = false;

  transactionDate: string;
  description: string;
  debit: string;
  credit: string;

  headerForm = this.fb.group({
    transactionSelect:  ['', [Validators.required]],
    descriptionSelect:  ['', [Validators.required]],
    debitSelect:  ['', [Validators.required]],
    creditSelect:  ['', [Validators.required]]
  });

  @Output()
  headersAssigned = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnChanges() {
    if (this.headers.length > 0 && !this.valuesSet) {
      for (const header of this.headers) {

        let headVal: string = header.toLowerCase();

        if (headVal === "transaction date" || headVal.includes("date")) {
          this.transactionDate = header;
          this.headerForm.get('transactionSelect').setValue(header);
        } else if (headVal === "description" || headVal.includes("description")) {
          this.description = header;
          this.headerForm.get('descriptionSelect').setValue(header);
        } else if (headVal === "debit" || headVal.includes("debit")) {
          this.debit = header;
          this.headerForm.get('debitSelect').setValue(header);
        } else if (headVal === "credit" || headVal.includes("credit")) {
          this.credit = header;
          this.headerForm.get('creditSelect').setValue(header);
        }

      }
    }
  }

  returnHeaders() {
    this.headersAssigned.emit(
      [
        this.createCsvHeader("Transaction Date", this.transactionDate),
        this.createCsvHeader("Description", this.description),
        this.createCsvHeader("Debit", this.debit),
        this.createCsvHeader("Credit", this.credit)
      ]
    );
  }

  private createCsvHeader(val: string, headval: string) {
    return {
      requiredValue: val,
      csvHeaderValue: headval
    };
  }

}
