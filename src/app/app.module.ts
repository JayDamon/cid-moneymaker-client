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
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { TransactionService } from './core/services/transaction/transaction.service';
import { AppRoutingModule } from './modules/app-routing.module';
import { SharedModule } from './shared/SharedModule';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    PublicNavbarComponent,
    UserNavbarComponent,
    UserHomeComponent,
    FooterComponent
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
    SharedModule
  ],
  providers: [
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
