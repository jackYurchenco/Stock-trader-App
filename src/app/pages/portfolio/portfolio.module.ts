import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {PortfolioRoutingModule} from "./portfolio-routing.module";
import {PortfolioComponent} from "./portfolio.component";
import {MatTableModule, MatButtonModule, MatInputModule, MatSelectModule, MatPaginatorModule} from "@angular/material";
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule

  ],
  declarations: [
    PortfolioComponent
  ],

})
export class PortfolioModule {}
