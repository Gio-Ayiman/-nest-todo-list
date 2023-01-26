import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from "nest-keycloak-connect";



@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    
    keycloakOptions: KeycloakConnectOptions;

    constructor(private configService: ConfigService) {}

    createKeycloakConnectOptions(): KeycloakConnectOptions | Promise<KeycloakConnectOptions> {
        
        this.keycloakOptions = {
            authServerUrl: this.configService.get('OIDC_AUTH_URL'),
            realm: this.configService.get('OIDC_REALM'),
            clientId: this.configService.get('OIDC_CLIENT_ID'),
            secret: this.configService.get('OIDC_CLIENT_SECRET'),
        }

        return this.keycloakOptions;
    }
}