import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCar = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const car = request.body;
    return data ? car[data] : car;
  },
);
