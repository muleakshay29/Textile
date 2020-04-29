import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { DefaultLayoutComponent } from "./containers";
const APP_CONTAINERS = [DefaultLayoutComponent];

import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./views/login/login.component";
import { MasterModule } from "./views/master.module";
import { SharedModule } from "./_shared/shared.module";
import { RegisterComponent } from "./views/register/register.component";
import { JwtInterceptor } from "./_helper/jwt.interceptor";
import { DeleteConfirmationComponent } from "./_helper/delete-confirmation/delete-confirmation.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MasterModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent,
    DeleteConfirmationComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  entryComponents: [DeleteConfirmationComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
