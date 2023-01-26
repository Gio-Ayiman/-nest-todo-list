import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { AuthService } from "./auth.service";

export class OAuth2Strategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: "api-nestjs-todo",
            clientSecret: "OySMsEU9dcP9b0bZdGuAJcqErC6vzFKc",
            callbackUrl: "http://localhost:3000/*",
            authorizeUrl: "http://localhost:8081/realms/Learn/protocol/openid-connect/auth",
            tokenUrl: "http://localhost:8081/realms/Learn/protocol/openid-connect/token",
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const { name, emails } = profile;
        console.log({name, emails});
        
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
            refreshToken,
        }

        return user;
    }
}