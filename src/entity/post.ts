import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "jsonb" })
    images: string[];

    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    user: User;
}
