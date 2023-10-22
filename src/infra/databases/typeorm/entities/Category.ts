import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryToPost } from "./CategoryToPost";

@Index("categories_pkey", ["id"], { unique: true })
@Entity("categories", { schema: "public" })
export class Category {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @OneToMany(() => CategoryToPost, (categoryToPost) => categoryToPost.a2)
  categoryToPosts: CategoryToPost[];
}
