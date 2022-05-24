// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {KeycloakConfig} from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url:'http://localhost:8081/auth',
  realm: 'SteakLasagne',
  clientId: 'steak-lasagne-frontend'
}

export const environment = {
  production: false,
  name: 'dev',
  baseApiUrl: "https://localhost:8080/api/v1",
  keycloak: keycloakConfig,
  // CHANGE THIS IF SOMETHINGS DOESN'T WORK LOL
  keycloakRedirectUri: "http://localhost:4200/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.