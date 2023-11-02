import { AggregateRoot } from '@nestjs/cqrs';
import * as crypto from 'node:crypto';
import { UserCreatedEvent, UserUpdatedEvent } from './user.events';

interface UserProps {
  name: string;
  email: string | null;
}

export interface CreateUserArgs {
  name: string;
  email: string | null;
}

export class UserEntity extends AggregateRoot {
  constructor(public readonly id: string, private readonly props: UserProps) {
    super();
  }

  static create(args: CreateUserArgs): UserEntity {
    const id = crypto.randomUUID();
    const props: UserProps = { ...args };
    const userEntity = new UserEntity(id, props);
    userEntity.apply(new UserCreatedEvent(id, props.name));
    return userEntity;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.apply(new UserUpdatedEvent(this.id, 'name', name));
  }

  get email(): string | null {
    return this.props.email;
  }

  set email(email: string | null) {
    this.props.email = email;
    this.apply(new UserUpdatedEvent(this.id, 'email', email));
  }

  get nameAndEmail(): string {
    return `${this.props.name} <${this.props.email}>`;
  }
}
