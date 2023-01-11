import { DataSource } from 'typeorm';
import { BillEntity, BillDetailEntity, ProductEntity, ShippingEntity, UserEntity } from '../models';

export const repositoryProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: ['MySQL_Provider'],
    },
    {
        provide: 'BILL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BillEntity),
        inject: ['MySQL_Provider'],
    },
    {
        provide: 'BILL_DETAILS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BillDetailEntity),
        inject: ['MySQL_Provider'],
    },
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: ['MySQL_Provider'],
    },
    {
        provide: 'SHIPPING_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ShippingEntity),
        inject: ['MySQL_Provider'],
    }
];