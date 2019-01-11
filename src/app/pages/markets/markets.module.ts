import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MarketsComponent} from "./markets.component";
import {MarketsRoutingModule} from "./markets-routing.module";
import {MatTableModule, MatButtonModule, MatInputModule, MatSelectModule, MatPaginatorModule} from "@angular/material";
import {FormsModule} from "@angular/forms";




@NgModule({
  imports: [
    CommonModule,
    MarketsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule

  ],
  declarations: [
    MarketsComponent
  ],

})
export class MarketsModule {}


