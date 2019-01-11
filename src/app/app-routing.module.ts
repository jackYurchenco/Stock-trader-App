import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'markets',
    pathMatch: 'full'
  },
  {
    path: 'markets',
    loadChildren: "./pages/markets/markets.module#MarketsModule"
  },
  {
    path: 'portfolio',
    loadChildren: "./pages/portfolio/portfolio.module#PortfolioModule"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
