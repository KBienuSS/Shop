import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { order, contactData } = createOrderDto;

    const newOrder = this.ordersRepository.create({
      ...contactData,
      products: order.products.map((p) => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        comment: p.comment,
      })),
    });

    return this.ordersRepository.save(newOrder);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: { products: true } });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!order) {
      throw new NotFoundException(`Zamówienie o id ${id} nie istnieje`);
    }

    return order;
  }
}