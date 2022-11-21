import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';

@Module({
  imports: [UserModule],
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
