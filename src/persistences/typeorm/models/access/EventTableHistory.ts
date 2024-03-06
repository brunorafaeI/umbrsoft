import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Users } from './Users'

@Index('event_table_history_pkey', ['id'], { unique: true })
@Entity('event_table_history', { schema: 'app_access' })
export class EventTableHistory {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
    id: string

  @Column('character varying', {
    name: 'table_ref',
    nullable: true,
    length: 50
  })
    tableRef: string | null

  @Column('jsonb', { name: 'content', nullable: true })
    content: object | null

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => "('now')::date"
  })
    createdAt: Date

  @ManyToOne(() => Users, (users) => users.eventTableHistories, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: Users
}
