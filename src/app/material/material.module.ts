import { NgModule } from '@angular/core';
import { MatToolbarModule, MatTableModule, MatSortModule, MatMenuModule, MatButtonModule } from '@angular/material';

const material = [
    MatToolbarModule, 
    MatTableModule, 
    MatSortModule,
    MatMenuModule,
    MatButtonModule
]

@NgModule({
    imports: [material],
    exports: [material]
  })
  export class MaterialModule { }