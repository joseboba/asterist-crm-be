import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    phone: string;
    @Column()
    names: string;
    @Column()
    lastnames: string;
    @Column({ name: 'birth_date' })
    birthdate: Date;
    @Column()
    email: string;
}