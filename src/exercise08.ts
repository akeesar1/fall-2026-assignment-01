export type EventMap = {
  launch: string;
  shutdown: number;
};

export class SimpleEventEmitter<T extends EventMap> {
  private handlers: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  public on<K extends keyof T>(
    eventName: K,
    callback: (data: T[K]) => void,
  ): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName]!.push(callback);
  }

  public emit<K extends keyof T>(eventName: K, data: T[K]): void {
    this.handlers[eventName]?.forEach((callback) => callback(data));
  }
}
