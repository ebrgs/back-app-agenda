import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateContactDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';

interface iTokenRequest extends Request {
  user: { userId: string; sub: string };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('/user/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Post('contact')
  @UseGuards(TokenAuthGuard)
  createContact(
    @Body() createContactDto: CreateContactDto,
    @Request() req: iTokenRequest,
  ) {
    return this.usersService.createContact(createContactDto, req.user.userId);
  }

  @Delete('contact/:id')
  @UseGuards(TokenAuthGuard)
  deleteContact(@Param('id') id: string) {
    return this.usersService.deleteContact(id);
  }

  @Patch('contact/:id')
  @UseGuards(TokenAuthGuard)
  updateContact(@Body() data: any, @Param('id') id: string) {
    return this.usersService.updateContact(data, id);
  }
}
