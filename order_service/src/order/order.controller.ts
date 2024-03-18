import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('myOrders')
  getOrders() {
    return this.orderService.getOrders();
  }
}
