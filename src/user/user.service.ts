import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: dto.passwordHash,
        name: dto.name,
        picture: dto.picture,
      },
    });
    return this.toUserDto(user);
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.toUserDto(user) : null;
  }

  async getById(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toUserDto(user) : null;
  }

  async getProfile(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, ...safeData } = user;

    return safeData;
  }

  private toUserDto(user: any): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
