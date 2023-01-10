import { CheckoutFactoryService } from '../factories/checkout.factory.service';
import { BillService } from '../services/bill.service';
import { LogisticService } from '../services/logistic.service';

export const services = [BillService, LogisticService];

export const factoriesServices = [CheckoutFactoryService];
