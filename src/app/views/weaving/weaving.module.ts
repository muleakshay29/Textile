import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../_shared/shared.module";

import { WeavingRoutingModule } from "./weaving-routing.module";
import { WeavingLoadMagComponent } from "./weaving-load-mag/weaving-load-mag.component";
import { AddWeavingLoadMagComponent } from "./weaving-load-mag/add-weaving-load-mag/add-weaving-load-mag.component";
import { WeavingLoadAutoComponent } from "./weaving-load-auto/weaving-load-auto.component";
import { AddWeavingLoadAutoComponent } from "./weaving-load-auto/add-weaving-load-auto/add-weaving-load-auto.component";

@NgModule({
  declarations: [
    WeavingLoadMagComponent,
    AddWeavingLoadMagComponent,
    WeavingLoadAutoComponent,
    AddWeavingLoadAutoComponent,
  ],
  imports: [SharedModule, WeavingRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeavingModule {}
