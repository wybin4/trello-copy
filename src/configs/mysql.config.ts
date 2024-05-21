import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CardEntity } from 'src/users/entities/card.entity';
import { ColumnEntity } from 'src/users/entities/column.entity';
import { CommentEntity } from 'src/users/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export const getMySQLConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get('MYSQL_HOST'),
    port: +configService.get('MYSQL_PORT'),
    username: configService.get('MYSQL_USERNAME'),
    password: configService.get('MYSQL_PASSWORD'),
    database: configService.get('MYSQL_DATABASE'),
    synchronize: true,
    entities: [UserEntity, ColumnEntity, CardEntity, CommentEntity],
    autoLoadEntities: true
});
