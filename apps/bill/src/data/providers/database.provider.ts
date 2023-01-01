import { DataSource } from 'typeorm';
import { Bill, BillDetail, Product, User } from '../../domain';
import { ConfigService } from '@nestjs/config';

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
          User,
          Bill,
          BillDetail,
          Product
        ],
        synchronize: true,
        entityPrefix: 'bill_'
      });
      return dataSource.initialize();
    },
  },
];