import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { Post } from "./Post";

@Index("_CategoryToPost_AB_unique", ["a", "b"], { unique: true })
@Index("_CategoryToPost_B_index", ["b"], {})
@Entity("_CategoryToPost", { schema: "public" })
export class CategoryToPost {
  @Column("text", { name: "A" })
  a: string;

  @Column("text", { name: "B" })
  b: string;

  @ManyToOne(() => Category, (category) => category.categoryToPosts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "A", referencedColumnName: "id" }])
  a2: Category;

  @ManyToOne(() => Post, (post) => post.categoryToPosts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "B", referencedColumnName: "id" }])
  b2: Post;
}
