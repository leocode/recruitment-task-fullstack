export interface Event {}

type EventConstructor<T> = new (...args: any[]) => T;
type EventHandler<T extends Event> = (event: T) => Promise<void> | void;

export class EventBus {
  private listeners: { eventType: EventConstructor<unknown>, cb: EventHandler<any> }[] = [];

  public async addEventListener<T extends Event>(eventType: EventConstructor<T>, cb: EventHandler<T>) {
    this.listeners.push({ eventType, cb });
  }

  public async removeEventListener<T extends Event>(eventType: EventConstructor<T>, cb: EventHandler<T>) {
    const listenerIndex = this.listeners.findIndex(l => l.cb === cb && l.eventType === eventType);

    if (listenerIndex >= 0) {
      this.listeners.splice(listenerIndex, 1);
    }
  }

  public async publish(event: Event) {
    const listeners = this.listeners.filter(l => event.constructor === l.eventType);

    listeners.forEach(l => l.cb(event));
  }
}
