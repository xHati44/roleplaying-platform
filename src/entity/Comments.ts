import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
 } from 'typeorm';
 import { User } from './User';
 import { CharacterSheet } from './CharacterSheet';
 
 @Entity()
 export class Comments {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column('text')
    content: string;
 
    @ManyToOne(() => User, user => user.id)
    commenter: User;
 
    @ManyToOne(() => CharacterSheet, sheet => sheet.id)
    characterSheet: CharacterSheet;
 }