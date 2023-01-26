import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: 'giovanni',
      database: 'Todo',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      isGlobal: true
    }),
    SharedModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
  