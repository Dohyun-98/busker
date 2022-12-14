import { FilesService } from './../files/files.service';
import { ArtistImage } from 'src/apis/artistImage/entity/artistImage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/jwt-access.stategy';
import { UserAuthority } from 'src/commons/role/entity/userAuthority.entity';
import { RoleService } from 'src/commons/role/role.service';
import { Category } from '../categories/entities/categories.entity';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { Artist } from './entity/artist.entity';
import { LikeArtistService } from '../likeArtist/likeArtist.service';
import { LikeArtist } from '../likeArtist/entity/likeArtist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Artist,
      UserAuthority,
      ArtistImage,
      LikeArtist,
    ]),
  ],
  providers: [
    ArtistsResolver,
    ArtistsService,
    JwtAccessStrategy,
    RoleService,
    FilesService,
    LikeArtistService,
  ],
})
export class ArtistsModule {}
