import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { ItemsService } from './items.service';

class CreateItemDto {
  @IsString()
  @MinLength(1)
  name: string;
}

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto.name);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
