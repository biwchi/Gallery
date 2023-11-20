import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceTestFactory } from './data-sourse-factory';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { GalleryModule } from './gallery/gallery.module';
import { AppQueryInterceptor } from './shared/interceptors/app-query.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dataSourceTestFactory,
    }),
    FileModule,
    UserModule,
    GalleryModule,
  ],    
  controllers: [FileController],
})
export class AppModule {}