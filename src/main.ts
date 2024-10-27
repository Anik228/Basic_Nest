import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  // Get the machine's network interfaces
  const networkInterfaces = os.networkInterfaces();
  const localIp = Object.values(networkInterfaces)
    .flat()
    .find((iface) => iface?.family === 'IPv4' && !iface.internal)?.address;

  await app.listen(port);

  console.log(`Application is running at the following URLs:`);
  console.log(`- Localhost: http://localhost:${port}/`);
  if (localIp) {
    console.log(`- Local IP: http://${localIp}:${port}/`);
  }
}

bootstrap();
