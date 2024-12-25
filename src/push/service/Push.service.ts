import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class PushService {

  private readonly algorithm = 'aes-256-cbc';
 
  async getAccessToken(): Promise<string> 
  {
    return new Promise((resolve, reject) => {
      
      const keyFilePath = 'D:/anik_VAS/vas_projects/push_notification/purno-35d14-3c3f72542602.json';
      
      const key = JSON.parse(fs.readFileSync(keyFilePath, 'utf-8'));

      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/cloud-platform'], // Modify SCOPES as needed
        null
      );

      jwtClient.authorize((err, tokens) => {
        if (err) {
          reject('Failed to authorize: ' + err);
        } else {
          console.log('Access Token:', tokens.access_token); // Log the access token
          resolve(tokens.access_token);
        }
      });     
    });
   
  }

  decryptSecret(encryptedData: string, key: string): string {
    const iv = Buffer.from(encryptedData.substring(0, 32), 'hex'); 
    const encrypted = encryptedData.substring(32);
    const keyBuffer = Buffer.from(key.padEnd(32, '0'), 'utf8');
    const decipher = crypto.createDecipheriv(this.algorithm, keyBuffer, iv);
    try {
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

}
