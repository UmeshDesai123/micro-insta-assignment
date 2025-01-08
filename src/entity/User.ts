import { DataTypes } from "sequelize";
import { sequelize } from "../data-source";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    });

    sequelize.sync().then(() => {
        console.log('User table created successfully!');
    }).catch((error) => {
        console.error('Unable to create user table : ', error);
    });

    // User.associate = (models) => {
    //     User.hasMany(models.Post, { foreignKey: "userId", as: "posts" });
    // };

    // return User;

    

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { Post } from "./post";

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ type: "varchar", length: 256 })
//     name: string;

//     @Column({ type: "bigint", unique: true })
//     mobileNumber: number;

//     @Column({ type: "text" })
//     address: string;

//     @Column({ type: "int", default: 0 })
//     postCount: number;

//     @OneToMany(() => Post, (post) => post.user)
//     posts: Post[];
// }
