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
import { Interval } from '@nestjs/schedule';

@Injectable()
export class OrderService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  constructor(
    @Inject('USER_PACKAGE')
    private grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userServiceClient =
      this.grpcClient.getService<UserServiceClient>('UserService');
  }
  @Interval(5000)
  async getOrders() {
    let fetchedData = '';
    //random api call
    await fetch('https://ipinfo.io/161.185.160.93/geo')
      .then((r) => r.json())
      .then((data) => (fetchedData = data.org));

    const user = await firstValueFrom(
      this.userServiceClient.getUser({ data: fetchedData }),
    );

    console.log(user);
    return fetchedData;
  }
}
