import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/SharedModule';
import { NgModule } from "@angular/core";
import { AccountComponent } from './pages/account/account.component';
import { AccountTableComponent } from './components/account-table/account-table.component';

@NgModule({
    declarations: [
        AccountComponent,
        AccountTableComponent
    ],
    imports: [
        SharedModule,
        AccountRoutingModule
    ],
    providers: [

    ]
})
export class AccountModule{ }