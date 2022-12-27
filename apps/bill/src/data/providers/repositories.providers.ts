import { DataSource } from 'typeorm';
import { Bill, BillDetail, User } from '../../domain';

export const repositoryProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['MySQL_Provider'],
    },
    {
        provide: 'BILL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Bill),
        inject: ['MySQL_Provider'],
    },
    {
        provide: 'BILL_DETAILS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BillDetail),
        inject: ['MySQL_Provider'],
    },
];