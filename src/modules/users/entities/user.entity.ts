import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @OneToMany(() => Contact, (user) => user.user)
  @JoinColumn()
  contacts: Contact[];

  @CreateDateColumn()
  created_at: Date;
}
