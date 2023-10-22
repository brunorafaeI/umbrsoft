import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Index("profiles_pkey", ["id"], { unique: true })
@Index("profiles_user_id_key", ["userId"], { unique: true })
@Entity("profiles", { schema: "public" })
export class Profile {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "bio" })
  bio: string;

  @Column("text", { name: "user_id" })
  userId: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })

  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
