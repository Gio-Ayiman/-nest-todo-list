import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { OAuth2Strategy } from "./oauth2.strategy";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    providers: [OAuth2Strategy]
})
export class AuthModule {

}