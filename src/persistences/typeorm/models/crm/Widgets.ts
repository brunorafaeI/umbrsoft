import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Modules } from './Modules'
import { ParamTypeModuleWidget } from './ParamTypeModuleWidget'

@Index('widgets_pkey', ['id'], { unique: true })
@Entity('widgets', { schema: 'app_crm' })
export class Widgets {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', { name: 'title', nullable: true, length: 30 })
    title: string | null

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 50
  })
    description: string | null

  @Column('date', { name: 'created_at', default: () => "('now')::date" })
    createdAt: string

  @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: string | null

  @ManyToOne(() => Modules, (modules) => modules.widgets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_module', referencedColumnName: 'id' }])
    idModule: Modules

  @ManyToOne(
    () => ParamTypeModuleWidget,
    (paramTypeModuleWidget) => paramTypeModuleWidget.widgets,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'id_type', referencedColumnName: 'id' }])
    idType: ParamTypeModuleWidget
}
