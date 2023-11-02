export class PostCreatedEvent {
  constructor(public readonly id: string, public readonly title: string) {}
}

export class PostDeletedEvent {
  constructor(public readonly id: string) {}
}
