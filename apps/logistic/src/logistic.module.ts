import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource, Repository } from 'typeorm';
import { ShippingController } from './api/controllers/shipping.controller';
import { commandsHandlers } from './application/extensions/providers.cqrs';
import { databaseProviders, repositoryProviders } from './data';
import { BillDetailEntity, BillEntity, ProductEntity, ShippingEntity, UserEntity } from './data/models';

@Module({
  imports: [CqrsModule],
  controllers: [ShippingController],
  providers: [
    ...databaseProviders,
    ...repositoryProviders,
    ...commandsHandlers
  ]
})
export class LogisticModule implements OnModuleInit {

  async onModuleInit() {

    let dbContext = await this.initializeDbContex();

    await this.insertUsers(dbContext.getRepository(UserEntity));
    await this.insertProducts(dbContext.getRepository(ProductEntity));
  }

  //Seeds methods
  async insertUsers(userRepository: Repository<UserEntity>) {
    if ((await userRepository.find()).length == 0) {
      await userRepository.insert([
        {
          Name: 'User 1'
        },
        {
          Name: 'User 2'
        }
      ])
    }
  }

  async insertProducts(productRepository: Repository<ProductEntity>) {
    if ((await productRepository.find()).length == 0) {
      await productRepository.insert([
        {
          Name: 'Product 1'
        },
        {
          Name: 'Product 2'
        }
      ])
    }
  }

  //Initialize dbcontext
  private initializeDbContex() {
    return new DataSource({
      type: "mysql",
      entities: [
        UserEntity,
        BillEntity,
        BillDetailEntity,
        ProductEntity,
        ShippingEntity
      ],
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATA_BASE,
      entityPrefix: 'logistic_',
    }).initialize();
  }

}