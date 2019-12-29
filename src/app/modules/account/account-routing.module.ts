import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { NgModule } from '@angular/core';

const accountRoutes: Routes = [
    {
        path: 'accounts',
        component: AccountComponent
    },
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