import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
  ) {}
  async create(data: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);

    return await this.findOne(user.id);
  }
  async findAll(): Promise<User[]> {
    const list = await this.usersRepository.find();

    return list;
  }
  async findOne(id: string): Promise<User> {
    console.log(id);
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id_user', { id_user: id })
      .leftJoinAndSelect('user.contacts', 'contacts')
      .getOne();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ id }, updateUserDto);

    return await this.findOne(id);
  }
  async delete(id: string): Promise<void> {
    await this.findOne(id);

    await this.usersRepository.delete({ id });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email_user', { email_user: email })
      .leftJoinAndSelect('user.contacts', 'contacts')
      .getOne();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async createContact(
    data: CreateContactDto,
    userId: string,
  ): Promise<Contact> {
    const user = await this.findOne(userId);

    const contact = this.contactsRepository.create({ ...data, user: user });

    await this.contactsRepository.save(contact);

    return await this.contactsRepository
      .createQueryBuilder('contacts')
      .where('contacts.user.id = :id_user', { id_user: userId })
      .getOne();
  }
}
