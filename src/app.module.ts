import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { LogMiddlewareMiddleware } from './middleware/log-middleware/log-middleware.middleware.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module.js';
import { PublishersModule } from './publishers/publishers.module.js';
import { AuthorsModule } from './authors/authors.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { CustomerAddressesModule } from './customer-addresses/customer-addresses.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ShipmentsModule } from './shipments/shipments.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_DATA: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATA,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    PublishersModule,
    CategoriesModule,
    BooksModule,
    UserModule,
    AuthModule,
    AuthorsModule,
    CustomersModule,
    CustomerAddressesModule,
    OrdersModule,
    PaymentsModule,
    ShipmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddlewareMiddleware).forRoutes('*');
  }
}
