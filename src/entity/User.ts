import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 256 })
    name: string;

    @Column({ type: "bigint", unique: true })
    mobileNumber: number;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "int", default: 0 })
    postCount: number;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}
