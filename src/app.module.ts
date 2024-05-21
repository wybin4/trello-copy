import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMySQLConfig } from './configs/mysql.config';
import { JwtStrategy } from './users/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.dev.env' }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => getMySQLConfig(configService),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }