import { NgModule } from '@angular/core';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { MaterialModule } from '../material/material.module';
import { TransactionService } from '../core/services/transaction/transaction.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        TransactionTableComponent
    ],
    imports: [
        MaterialModule,
        BrowserModule
    ],
    providers: [
        TransactionService
    ],
    exports: [
        TransactionTableComponent
    ]
})
export class SharedModule {}