import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import * as serviceAccount from 'src/config/cinema-trend-firebase-adminsdk-neitk-a1670b9956.json';

@Injectable()
export class UserService {
  private readonly bucket;

  constructor(private readonly prismaService: PrismaService) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      storageBucket: 'cinema-trend.appspot.com',
    });

    this.bucket = admin.storage().bucket();
  }

  async findOne(email: string) {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async create(data: CreateUserDto) {
    const { email, password } = data;
    return await this.prismaService.user.create({
      data: { email, password },
    });
  }

  async update(
    data: Omit<UpdateUserDto, 'picture'>,
    userId: number,
    fileBuffer?: Buffer,
  ) {
    if (fileBuffer) {
      // Если есть файл, загружаем его
      const pictureUrl = await this.uploadAvatar(fileBuffer);

      const user = await this.prismaService.user.update({
        where: { id: userId },
        data: { picture: pictureUrl, ...data },
      });

      if (!user) throw new BadRequestException();

      return {
        username: user.username,
        gender: user.gender,
        date: user.date,
        picture: user.picture,
      };
    } else {
      const { username, gender, date } = data;

      const user = await this.prismaService.user.update({
        where: { id: userId },
        data: { username, gender, date },
      });

      if (!user) throw new BadRequestException();

      return {
        username: user.username,
        gender: user.gender,
        date: user.date,
        picture: user.picture,
      };
    }
  }

  private async uploadAvatar(fileBuffer: Buffer): Promise<string> {
    const fileName = `users/${uuidv4()}.jpg`;
    const firebaseFile = this.bucket.file(fileName);

    await firebaseFile.save(fileBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    await firebaseFile.makePublic();

    return `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
  }
}
