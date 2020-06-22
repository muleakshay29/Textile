import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { AutoProductionComponent } from './auto-production/auto-production.component';
import { AddAutoProductionComponent } from './auto-production/add-auto-production/add-auto-production.component';
import { MagProductionComponent } from './mag-production/mag-production.component';
import { AddMagProductionComponent } from './mag-production/add-mag-production/add-mag-production.component';


@NgModule({
  declarations: [AutoProductionComponent, AddAutoProductionComponent, MagProductionComponent, AddMagProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule
  ]
})
export class ProductionModule { }
