import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { NgModule } from '@angular/core';
import { NewAccountComponent } from './components/new-account/new-account.component';

const accountRoutes: Routes = [
    {
        path: 'accounts',
        component: AccountComponent
    },
    {
        path: 'newAccount',
        component: NewAccountComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }