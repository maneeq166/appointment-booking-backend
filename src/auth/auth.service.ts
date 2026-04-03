import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  test() {
    return {
      message: 'Testing....',
    };
  }
  register(body: any) {
    return {
      message: 'User registered',
      data: body,
    };
  }
}
