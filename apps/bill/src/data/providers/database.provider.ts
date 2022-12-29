import { DataSource } from 'typeorm';
import { Bill, BillDetail, Product, User } from '../../domain';

export const databaseProviders = [
  {
    provide: 'MySQL_Provider',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'password',
        database: 'db',
        entities: [
          User,
          Bill,
          BillDetail,
          Product
        ],
        synchronize: true
      });

      return dataSource.initialize();
    },
  },
];