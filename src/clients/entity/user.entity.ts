import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    private phone: string;
    @Column({ name: 'prepaid_card_number' })
    private prepaidCardNumber: string;
    @Column()
    private email: string;
}