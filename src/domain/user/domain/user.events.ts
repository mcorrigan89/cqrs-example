export class UserCreatedEvent {
  constructor(public readonly id: string, public readonly name: string) {}
}

type UserUpdatedEventProperty = 'name' | 'email';

export class UserUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly property: UserUpdatedEventProperty,
    public readonly value: string | number | boolean | null,
  ) {}
}
