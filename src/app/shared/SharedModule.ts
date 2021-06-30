import { NgModule } from '@angular/core';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { MaterialModule } from '../material/material.module';
import { TransactionService } from '../core/services/transaction/transaction.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';

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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTreeModule,
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
