import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/configs/jwt.config';
import { AuthService } from './services/auth.service';
import { ColumnEntity } from './entities/column.entity';
import { CardEntity } from './entities/card.entity';
import { CommentEntity } from './entities/comment.entity';
import { ColumnService } from './services/column.service';
import { ColumnController } from './controllers/column.controller';
import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ColumnEntity, CardEntity, CommentEntity]),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule,
  ],
  providers: [UserService, ColumnService, CardService, CommentService, AuthService],
  controllers: [UserController, ColumnController, CardController, CommentController],
})
export class UserModule { }