import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { BeamRoutingModule } from "./beam-routing.module";
import { SizingInwardComponent } from './sizing-inward/sizing-inward.component';
import { BeamInwardComponent } from './beam-inward/beam-inward.component';
import { AddSizingInwardComponent } from './sizing-inward/add-sizing-inward/add-sizing-inward.component';
import { AddBeamInwardComponent } from './beam-inward/add-beam-inward/add-beam-inward.component';

@NgModule({
  declarations: [SizingInwardComponent, BeamInwardComponent, AddSizingInwardComponent, AddBeamInwardComponent],
  imports: [SharedModule, BeamRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BeamModule {}
