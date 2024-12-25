import { BadRequestException, Controller, Get ,Query} from '@nestjs/common';
import { PushService } from '../service/Push.service';

@Controller('pushauth')
export class PushController {
  constructor(private readonly googleAuthService: PushService) {}

  @Get('token')
  async getToken(): Promise<string> {
    return this.googleAuthService.getAccessToken();
  }

  @Get('decrypt')
  decryptSecret(@Query('encryptedString') encryptedData: string): { decryptedString: string } {
    const key = "robi1997";
      const decryptedString = this.googleAuthService.decryptSecret(encryptedData, key);
      return { decryptedString };
   
  }
  

}
