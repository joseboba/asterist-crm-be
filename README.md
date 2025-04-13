## Project setup

```bash
$ yarn
```

## Compile and run the project

```bash
# watch mode
$ yarn run start:dev
```

## Base de datos

```bash
docker run --name mysql-asterisk -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:lts
```

```bash
CREATE database asterisk;
USE asterisk;

create table credit_card
(
    credit_card_id   int auto_increment
        primary key,
    due_payment_date datetime       not null,
    payment_balance  decimal(18, 2) not null,
    is_debt_active   tinyint        null
);

create definer = root@`%` trigger set_default_values_on_insert_credit_card
    before insert
    on credit_card
    for each row
BEGIN

    IF NEW.payment_balance > 0 THEN
        SET NEW.is_debt_active = 1;
    ELSE
        SET NEW.is_debt_active = 0;
    end if;

END;

create definer = root@`%` trigger set_default_values_on_update_credit_card
    before update
    on credit_card
    for each row
BEGIN

    IF NEW.payment_balance > 0 THEN
        SET NEW.is_debt_active = 1;
    ELSE
        SET NEW.is_debt_active = 0;
    end if;

END;

create table fee
(
    fee_id          int auto_increment
        primary key,
    cost_per_minute decimal(8, 2) null
);

create table prepaid_card
(
    card_number varchar(8)        not null
        primary key,
    balance     decimal(18, 2)    not null,
    is_active   tinyint default 1 null,
    fee_id      int               not null,
    constraint FK_FEE
        foreign key (fee_id) references fee (fee_id)
);

create definer = root@`%` trigger set_default_values_on_update
    before update
    on prepaid_card
    for each row
BEGIN

    IF NEW.balance <= 0 THEN
        SET NEW.balance = 0;
        SET NEW.is_active = 0;
    ELSE
        SET NEW.is_active = 1;
    END IF;


END;

create table users
(
    phone               varchar(100) not null
        primary key,
    prepaid_card_number varchar(8)   null,
    email               varchar(50)  null,
    user_credit_card    int          null,
    names               varchar(100) null,
    lastnames           varchar(100) null,
    birth_date          datetime     null,
    constraint FK_PREPAID_CARD
        foreign key (prepaid_card_number) references prepaid_card (card_number),
    constraint fk_user_credit_card
        foreign key (user_credit_card) references credit_card (credit_card_id)
);
```

### ENDPOINTS

```bash
http://localhost:3000/clients/emit-id/{phone}
http://localhost:3000/clients/emit-id/1733

http://localhost:3000/clients/close
```

## CAMPOS SUGERIDOS
- NOMBRE
- APELLIDOS
- TELEFONO
- CORREO
- FECHA NACIMIENTO