import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Modules } from './Modules'

@Index('param_module_group_pkey', ['id'], { unique: true })
@Entity('param_module_group', { schema: 'app_crm' })
export class ParamModuleGroup {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number

  @Column('character varying', { name: 'title', nullable: true, length: 30 })
    title: string | null

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 50
  })
    description: string | null

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => "('now')::date"
  })
    createdAt: Date

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
    updatedAt: Date | null

  @ManyToOne(() => Modules, (modules) => modules.paramModuleGroups, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'module_id', referencedColumnName: 'id' }])
    module: Modules
}
