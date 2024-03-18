import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from '../proto/user/user';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService implements OnModuleInit {
  private logger = new Logger(OrderService.name);

  private userServiceClient: UserServiceClient;

  constructor(
    @Inject('USER_PACKAGE')
    private grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userServiceClient =
      this.grpcClient.getService<UserServiceClient>('UserService');
  }

  async getOrders() {
    let d = '';
    const a = await fetch('https://ipinfo.io/161.185.160.93/geo')
      .then((r) => r.json())
      .then((data) => (d = data.org));

    const user = await firstValueFrom(
      this.userServiceClient.getUser({ data: d }),
    );
    this.logger.log(user);

    return d;
  }
}
