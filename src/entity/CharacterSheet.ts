import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
 } from 'typeorm';
 import { User } from './User';
 
 @Entity()
 export class CharacterSheet {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    title: string;
 
    @Column('text')
    content: string;
 
    @ManyToOne(() => User, user => user.id)
    owner: User;
 }
 