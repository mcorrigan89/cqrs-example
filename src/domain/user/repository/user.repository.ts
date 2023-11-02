import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { EventPublisher } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return new UserEntity(user.id, user);
  }

  async save(user: UserEntity) {
    const userPubliser = this.eventPublisher.mergeObjectContext(user);
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: { id: user.id, name: user.name, email: user.email },
      update: { name: user.name, email: user.email },
    });
    userPubliser.commit();
    return Promise.resolve(userPubliser);
  }
}
