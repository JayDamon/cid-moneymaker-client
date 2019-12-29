import { NgModule } from '@angular/core';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { MaterialModule } from '../material/material.module';
import { TransactionService } from '../core/services/transaction/transaction.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatDatepickerModule, MatInputModule,
  MatButtonModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const shared = [
    CommonModule,
    MaterialModule,
    BrowserModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
];

const custom = [
  TransactionTableComponent
];

@NgModule({
    declarations: [
      custom
    ],
    imports: [
        shared
    ],
    providers: [
        TransactionService
    ],
    exports: [
        shared,
        custom
    ]
})
export class SharedModule {}
