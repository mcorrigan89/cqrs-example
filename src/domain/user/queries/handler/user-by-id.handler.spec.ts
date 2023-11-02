import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';
import { CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { INestApplication } from '@nestjs/common';
import { UserByIdHandler } from './user-by-id.handler';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { UserByIdQuery } from '../impl/user-by-id.query';
import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/domain/user/domain/user.entity';

describe('UserByIdHandler', () => {
  let app: INestApplication;
  let handler: UserByIdHandler;
  let repository: UserRepository;
  let eventPublisher: EventPublisher;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [UserByIdHandler, UserRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    handler = module.get<UserByIdHandler>(UserByIdHandler);
    repository = module.get<UserRepository>(UserRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
    eventBus = module.get<EventBus>(EventBus);

    app = module.createNestApplication<INestApplication>();

    await app.init();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should call the repository with the id', async () => {
    const uuid = faker.string.uuid();
    const user = new UserEntity(uuid, { name: 'name', email: 'email' });
    const repositorySpy = jest
      .spyOn(repository, 'findById')
      .mockResolvedValue(user);
    const query = new UserByIdQuery(uuid);
    const response = await handler.execute(query);
    expect(repositorySpy).toHaveBeenCalledWith(uuid);
    expect(response.id).toEqual(user.id);
  });
});
