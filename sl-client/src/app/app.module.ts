import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogModule} from "@angular/material/dialog";
import {AppComponent} from './app.component';
import {NgChartsModule} from "ng2-charts";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";
import {HeaderMenuComponent} from "./components/header-menu/header-menu.component";
import {TransactionListComponent} from "./components/transaction-list/transaction-list.component";
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {GraphComponent} from './components/graph/graph.component';
import {TransactionDialogComponent} from "./components/transaction-dialog/transaction-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {AuthGuard} from "./auth/auth.guard";
import {environment} from "../environments/environment";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      authorizationHeaderName: "Authorization"
    });
}

@NgModule({
  declarations: [
    AppComponent,
    TransactionListComponent,
    HeaderMenuComponent,
    PageNotFoundComponent,
    GraphComponent,
    TransactionDialogComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
