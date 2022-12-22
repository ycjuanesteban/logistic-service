import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'MySQL_Provider',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        migrations: ['../migrations/*.ts'],
        entities: [
            __dirname + '/../../domain/*.entity.ts',
        ],
        synchronize: true
      });

      return dataSource.initialize();
    },
  },
];