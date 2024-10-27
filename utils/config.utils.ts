import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

export class ConfigUtils {
  static getValue<T>(configService: ConfigService, key: string) {
    return configService.get<T>(key);
  }

  static getRawEnvValue(key: string) {
    return process.env[key];
  }

  static getEnv() {
    return process.argv.slice(2)[0] || 'dev';
  }

  static isProdEnv() {
    return process.argv.slice(2)[0] === 'prod';
  }

  static getTlsConfigs() {
    return [
      fs.readFileSync(this.getRawEnvValue('KEY_PATH'), 'utf-8'),
      fs.readFileSync(this.getRawEnvValue('CERT_PATH'), 'utf-8'),
    ];
  }
  
}
