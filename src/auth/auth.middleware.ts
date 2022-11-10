import { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

import * as serviceAccount from './serviceAccount.json';

const firebaseParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseParams),
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token !== null && token !== '') {
      try {
        const decodedToken = await this.defaultApp
          .auth()
          .verifyIdToken(token.replace('Bearer ', ''));
        req['user'] = decodedToken;
        next();
      } catch (error) {
        res.status(401).send('Unauthorized');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  }
}
