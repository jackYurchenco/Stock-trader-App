import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MarketsComponent} from "./markets.component";
import {MarketsRoutingModule} from "./markets-routing.module";
import {MatTableModule, MatButtonModule, MatInputModule, MatSelectModule, MatPaginatorModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {TreeTableModule} from "primeng/components/treetable/treetable";





@NgModule({
  imports: [
    CommonModule,
    MarketsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    TreeTableModule


  ],
  declarations: [
    MarketsComponent
  ],

})
export class MarketsModule {}


