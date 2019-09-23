import { TransactionService } from './core/services/transaction.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './modules/home/app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './modules/home/components/transactions/transactions.component';
import { MaterialModule } from './material/material.module';
import { PublicNavbarComponent } from './core/public-navbar/public-navbar.component';
import { UserNavbarComponent } from './core/user-navbar/user-navbar.component';
import { UserHomeComponent } from './modules/pages/user-home/user-home.component';
import { FooterComponent } from './core/footer/footer.component';
import { TransactionTableComponent } from './shared/components/transaction-table/transaction-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    PublicNavbarComponent,
    UserNavbarComponent,
    UserHomeComponent,
    FooterComponent,
    TransactionTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
