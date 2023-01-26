import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, PolicyEnforcementMode, ResourceGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect';
import { KeycloakConfigService } from 'src/core/config/keycloak-config.service';

@Module({
    imports: [
       KeycloakConnectModule.registerAsync({
            useClass: KeycloakConfigService,
            imports: [ConfigModule]
       })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
          },
          {
            provide: APP_GUARD,
            useClass: ResourceGuard,
          },
          {
            provide: APP_GUARD,
            useClass: RoleGuard,
          }
    ],
    exports: [
        KeycloakConnectModule
    ]
})
export class SharedModule {}
