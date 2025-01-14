// require-login.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RequireLogin = () => SetMetadata('requireLogin', true);
