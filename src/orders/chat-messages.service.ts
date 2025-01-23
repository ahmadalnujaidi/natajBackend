// src/orders/chat-messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';
import { Order } from './order.entity';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepo: Repository<ChatMessage>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createMessage(
    orderId: string,
    sender: string,
    content: string,
  ): Promise<ChatMessage> {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) {
      throw new Error('Order not found');
    }

    const msg = this.chatMessageRepo.create({
      order,
      sender,
      content,
    });

    return this.chatMessageRepo.save(msg);
  }

  async getMessagesByOrder(orderId: string): Promise<ChatMessage[]> {
    return this.chatMessageRepo.find({
      where: { order: { id: orderId } },
      order: { createdAt: 'ASC' },
    });
  }
}
