import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from './Post'
import { Profile } from './Profile'


@Index("users_pkey", ["id",], { unique: true })
@Entity("users", { schema: "public" })
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("character varying", { name: "name", length: 80 })
  name: string;

  @Column("character varying", { name: "email", length: 80 })
  email: string;

  @Column("timestamp without time zone", { name: "created_at", default: () => "CURRENT_TIMESTAMP", })
  createdAt: Date;

  @Column("enum", { name: "role", enum: ["USER", "ADMIN", "SUSER", "SADMIN"], default: () => "'USER'" })
  role: "USER" | "ADMIN" | "SUSER" | "SADMIN";

  @Column("character varying", { name: "picture", nullable: true, length: 300 })
  picture: string | null;

  @Column("character varying", { name: "token", length: 1200 })
  token: string;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

}
