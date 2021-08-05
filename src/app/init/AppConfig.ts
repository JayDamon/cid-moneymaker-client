import { KeycloakOptions } from "keycloak-angular";

export interface AppConfig {
  resourceServer: string;
  keycloak: KeycloakConfig;
}

export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}
