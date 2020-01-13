import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class EmailConfirm extends BaseEntity {
  @PrimaryColumn('text', { unique: true })
  id: string;

  @Column('int', { unique: true })
  user: number;

  @Column('bigint')
  expiration: number;
}
