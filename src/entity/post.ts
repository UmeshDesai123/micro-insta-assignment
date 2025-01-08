import { sequelize } from "../data-source";
import { DataTypes } from "sequelize";
import { User } from "./User";

export const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference to the User model
            key: "id",   // Key in User model
        },
        onDelete: "CASCADE", 
    }
});

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

sequelize.sync().then(() => {
    console.log('Post table created successfully!');
}).catch((error) => {
    console.error('Unable to create post table : ', error);
});


// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
// import { User } from "./User";

// @Entity()
// export class Post {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ type: "text" })
//     title: string;

//     @Column({ type: "text" })
//     description: string;

//     @Column({ type: "jsonb" })
//     images: string[];

//     @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
//     user: User;
// }
