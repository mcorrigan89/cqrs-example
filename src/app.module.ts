import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './domain/user/user.module';
import { Subject, takeUntil } from 'rxjs';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { PostModule } from './domain/post/post.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: true,
      port: 8000,
    }),
    CqrsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {
  private destroy$ = new Subject<void>();

  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private eventbus: EventBus,
  ) {
    this.queryBus.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      console.log(' ~~Logged Query~~ ', query);
    });

    this.commandBus.pipe(takeUntil(this.destroy$)).subscribe((command) => {
      console.log(' ~~Logged Command~~ ', command);
    });

    this.eventbus.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      console.log(' ~~Logged Event~~ ', event);
    });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
