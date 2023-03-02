/* eslint-disable no-undef */
export class Listeners {
  private listeners: [string, EventListenerOrEventListenerObject, AddEventListenerOptions | boolean | undefined][] = [];

  constructor(private target: EventTarget | null) {}

  public add<T extends Event>(
    eventName: string,
    handler: (event: T) => void,
    options?: AddEventListenerOptions | boolean
  ) {
    this.target?.addEventListener(eventName, handler as EventListener, options);
    this.listeners.push([eventName, handler as EventListener, options]);
  }

  public removeAll = () => {
    this.listeners.forEach((listener) => this.target?.removeEventListener(...listener));
    this.listeners = [];
  };
  public remove = (eventName: String) => {
    this.listeners = this.listeners.filter((listener) => {
      if (listener[0] === eventName) {
        this.target?.removeEventListener(...listener);
        return false;
      }
      return true;
    });
  };
}
