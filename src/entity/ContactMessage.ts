import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    message: string;

    @Column({ default: false })
    resolved: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    resolvedAt: Date;

    @Column({ nullable: true })
    resolvedBy: string;

    @Column({ nullable: true })
    response: string;

    @Column({ nullable: true })
    responseAt: Date;

}
