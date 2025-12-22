import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class AzureAdStrategy extends PassportStrategy(Strategy, 'azure-ad') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AZURE_CLIENT_ID, // L'ID de votre Application Azure
      issuer: `https://sts.windows.net/${process.env.AZURE_TENANT_ID}/`,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/common/discovery/v2.0/keys`,
      }),
    });
  }

  async validate(payload: any) {
    // Si le token est valide, Passport nous donne le contenu (payload)
    // On renvoie un objet utilisateur simplifié
    return { 
      userId: payload.oid, 
      email: payload.preferred_username, 
      tenantId: payload.tid 
    };
  }
}