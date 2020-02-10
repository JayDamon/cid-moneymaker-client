import { AccountModule } from './modules/account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './modules/transaction/pages/transactions/transactions.component';
import { MaterialModule } from './material/material.module';
import { PublicNavbarComponent } from './core/public-navbar/public-navbar.component';
import { UserNavbarComponent } from './core/user-navbar/user-navbar.component';
import { UserHomeComponent } from './modules/home/pages/user-home/user-home.component';
import { FooterComponent } from './core/footer/footer.component';
import { BudgetModule } from './modules/budget/budget.module';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { TransactionService } from './core/services/transaction/transaction.service';
import { AppRoutingModule } from './modules/app-routing.module';
import { SharedModule } from './shared/SharedModule';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImportTransactionsComponent } from './modules/transaction/pages/import-transactions/import-transactions.component';
import { MatSidenavModule, MatCardModule, MatDialogModule, MatListModule } from '@angular/material';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFileUpload, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImportTransactionTableComponent } from './modules/transaction/components/import-transaction-table/import-transaction-table.component';
import { FileImportComponent } from './shared/components/file-import/file-import.component';
import { CsvHeaderMatchComponent } from './shared/components/csv-header-match/csv-header-match.component';
import { BudgetCountComponent } from './modules/transaction/components/budget-count/budget-count.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    PublicNavbarComponent,
    UserNavbarComponent,
    UserHomeComponent,
    FooterComponent,
    ImportTransactionsComponent,
    ImportTransactionTableComponent,
    FileImportComponent,
    CsvHeaderMatchComponent,
    BudgetCountComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ChartsModule,
    WavesModule,
    BudgetModule,
    SharedModule,
    MatGridListModule,
    AccountModule,
    MatSidenavModule,
    MatCardModule,
    FontAwesomeModule,
    NgxDropzoneModule,
    MatDialogModule,
    MatListModule,
    DragDropModule
  ],
  providers: [
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFileUpload, faFileCsv);
  }
}
