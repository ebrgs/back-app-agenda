import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @ManyToOne(() => User, (contact) => contact.contacts)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
