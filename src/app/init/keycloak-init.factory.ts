import { KeycloakService } from "keycloak-angular";
import { AppConfig } from "./AppConfig";
import { ConfigurationService } from "./configuration.service";

export function initializeKeycloak(keycloak: KeycloakService, configService: ConfigurationService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {

        let config: AppConfig;

        try {
          config = await configService.loadConfiguration().toPromise();
        } catch (error) {
          reject();
          return;
        }

        try {
          await keycloak.init({
            config: {
              url: config.keycloak.url,
              realm: config.keycloak.realm,
              clientId: config.keycloak.clientId
            },
            initOptions: {
              onLoad: 'login-required',
              checkLoginIframe: false
            }
          });
          resolve(true);
        } catch (error) {
          reject();
        }

    });
  };
}
