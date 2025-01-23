// src/orders/chat-messages.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessage } from './chat-message.entity';

class CreateChatMessageDto {
  sender: string; // e.g. "buyer" or "manufacturer"
  content: string; // The message text
}

@Controller('orders/:orderId/chat')
export class ChatMessagesController {
  constructor(private readonly chatService: ChatMessagesService) {}

  @Get()
  async getOrderMessages(
    @Param('orderId') orderId: string,
  ): Promise<ChatMessage[]> {
    return this.chatService.getMessagesByOrder(orderId);
  }

  @Post()
  async createOrderMessage(
    @Param('orderId') orderId: string,
    @Body() dto: CreateChatMessageDto,
  ): Promise<ChatMessage> {
    return this.chatService.createMessage(orderId, dto.sender, dto.content);
  }
}
