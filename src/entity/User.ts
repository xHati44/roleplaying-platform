import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
 } from 'typeorm';
 
 @Entity()
 export class User {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    googleId: string;
 
    @Column()
    name: string;
 
    @Column()
    email: string;
 
    @Column({ default: false })
    isAdmin: boolean;
 
    @Column({ default: false })
    isModerator: boolean;
 }
 