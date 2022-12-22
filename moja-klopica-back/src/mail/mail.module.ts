import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { OptionsService } from 'src/shared/factory/OptionsService';

@Module({
  imports: [
    OptionsService,
    MailerModule.forRoot(OptionsService.createEmailOptions()),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
