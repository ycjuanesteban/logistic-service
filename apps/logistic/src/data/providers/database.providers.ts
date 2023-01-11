import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { BillEntity, BillDetailEntity, ProductEntity, ShippingEntity, UserEntity } from '../models';

export const databaseProviders = [
  {
    provide: 'MySQL_Provider',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USER_NAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATA_BASE'),
        entities: [
          UserEntity,
          BillEntity,
          BillDetailEntity,
          ProductEntity,
          ShippingEntity
        ],
        synchronize: true,
        entityPrefix: 'logistic_',
      });
      return dataSource.initialize();
    },
  },
];
