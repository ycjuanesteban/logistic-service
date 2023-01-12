import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource, Repository } from 'typeorm';
import { BillController } from './api/controllers/bill.controller';
import { commandsHandlers } from './application/extensions/providers.cqrs';
import { factoriesServices } from './application/extensions/services';
import { databaseProviders, repositoryProviders } from './data';
import { Bill, BillDetail, Product, User } from './domain';

@Module({
  imports: [CqrsModule],
  controllers: [BillController],
  providers: [
    ...databaseProviders,
    ...repositoryProviders,
    ...commandsHandlers,
    ...factoriesServices,
  ],
})
export class BillModule implements OnModuleInit {

  async onModuleInit() {

    let dbContext = await this.initializeDbContex();

    await this.insertUsers(dbContext.getRepository(User));
    await this.insertProducts(dbContext.getRepository(Product));
  }

  //Seeds methods
  async insertUsers(userRepository: Repository<User>) {
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

  async insertProducts(productRepository: Repository<Product>) {
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
        User,
        Bill,
        BillDetail,
        Product
      ],
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATA_BASE,
      entityPrefix: 'bill_',
    }).initialize();
  }

}
