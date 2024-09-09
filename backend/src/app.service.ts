import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): object {
    return {
      vitor: {
        id: 1,
        login: {
          email: 'vitorvaleriohoffmann@gmail.com',
          senha: 'minhasenha',
        },
        dados: {
          dado1: {
            data: '09-10-2024',
            valor: 436.04,
            natureza: 'Recebimento de vendas do mercado livre',
          },
        },
      },
    };
  }
}
