import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LikeArtist } from 'src/apis/likeArtist/entity/likeArtist.entity';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';

import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true, type: 'varchar', length: 200 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ default: false, type: 'boolean' })
  is_auth: boolean;

  @Column({ type: 'varchar', length: 200, generated: 'uuid' })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  wrong_pass: number;

  @OneToMany(() => LikeArtist, (likeArtist) => likeArtist.user)
  @Field(() => [LikeArtist])
  liked_artist: LikeArtist[];

  @OneToOne(() => UserAuthority, (userAuthority) => userAuthority.user)
  @Field(() => UserAuthority)
  authorities?: UserAuthority;

  // @JoinColumn()
  // @OneToOne(() => UserImage, (userImage) => userImage.user)
  // @Field(() => UserImage, { nullable: true })
  // userImage: UserImage;
  @Column()
  @Field(() => String)
  userImageURL: string;
}
