import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

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