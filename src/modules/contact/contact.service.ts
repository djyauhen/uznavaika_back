import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  constructor(private readonly configService: ConfigService) {}

  private transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // Используем SSL
    auth: {
      user: this.configService.get<string>('YANDEX_EMAIL'), // Укажи свою Яндекс-почту
      pass: this.configService.get<string>('SECRET_YANDEX'), // Пароль для приложения из Яндекса
    },
  });

  async sendEmail(
    name: string,
    category: string,
    childAge: string,
    phone: string,
  ) {
    try {
      await this.transporter.sendMail({
        from: `"Узнавайка" ${this.configService.get<string>('YANDEX_EMAIL')}`, // Отправитель (твоя почта)
        to: this.configService.get<string>('YANDEX_EMAIL'), // Куда приходит письмо (твоя же почта)
        subject: `Новое сообщение с сайта от ${name}`,
        text: `Имя: ${name}\nТелефон: +7${phone}\nЗаинтересовала категория - ${category}\n Возраст ребенка: ${childAge}`,
      });
      return {
        error: false,
        message: 'Сообщение успешно отправлено',
      };
    } catch (e) {
      return {
        error: true,
        message: 'Ошибка отправки сообщения',
        errorType: e,
      };
    }
  }
}
