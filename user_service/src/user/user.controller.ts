import { Controller } from '@nestjs/common';
import {
  GetUserRequest,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from '../proto/user/user';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  getUser(request: GetUserRequest): Promise<User> {
    // Implement your logic to retrieve the item based on the request
    // You can use the request.itemId to fetch the specific item from your data source
    console.log(request);
    const item: User = {
      data: request.data,
    };
    return Promise.resolve(item);
  }
}
