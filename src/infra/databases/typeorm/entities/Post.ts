import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryToPost } from "./CategoryToPost";
import { User } from "./User";

@Index("posts_pkey", ["id"], { unique: true })
@Entity("posts", { schema: "public" })
export class Post {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("boolean", { name: "published", default: () => "false" })
  published: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => CategoryToPost, (categoryToPost) => categoryToPost.b2)
  categoryToPosts: CategoryToPost[];

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
  author: UserActivation;
}
