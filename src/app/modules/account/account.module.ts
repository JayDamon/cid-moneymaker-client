import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/SharedModule';
import { NgModule } from "@angular/core";
import { AccountComponent } from './pages/account/account.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
    declarations: [
        AccountComponent,
        AccountTableComponent,
        NewAccountComponent
    ],
    imports: [
        SharedModule,
        AccountRoutingModule
    ],
    providers: [

    ]
})
export class AccountModule{ }
