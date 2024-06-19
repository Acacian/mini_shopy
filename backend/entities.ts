import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  imageUrl!: string;

  @Column("simple-array")
  option!: string[];

  @Column({ type: 'bigint' })
  createdAt!: number;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @OneToMany(() => Cart, cart => cart.user)
  carts!: Cart[];
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.carts)
  user!: User;

  @ManyToOne(() => Product)
  product!: Product;

  @Column()
  quantity!: number;
}
