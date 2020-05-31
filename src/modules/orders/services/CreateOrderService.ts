import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const findCustomer = await this.customersRepository.findById(customer_id);

    if (!findCustomer) {
      throw new AppError('Customer id not found');
    }

    const findProduct = products.map(async () =>
      this.productsRepository.findAllById(products),
    );

    if (!findProduct) {
      throw new AppError('product not found');
    }
    const productX = [...findProduct]

    // const oderProducts = await this.ordersRepository.create({
    //   customer: findCustomer,
    //   products:
    // });
    // TODO
  }
}

export default CreateOrderService;
