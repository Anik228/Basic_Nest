import { Module } from '@nestjs/common';
;
import { PushController } from '../controller/Push.controller';
import { PushService } from '../service/Push.service';


@Module({
    imports: [
       
    ],
    controllers: [PushController],
    providers: [PushService]
})
export class PushModule {}
