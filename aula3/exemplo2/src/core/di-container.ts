export class DiContainer {
  readonly #singletons = new Map<symbol, unknown>();
  readonly #factories = new Map<symbol, () => unknown>();

  registerSingleton<T>(token: symbol, factory: () => T): void {
    this.#factories.set(token, () => {
      if (!this.#singletons.has(token)) {
        this.#singletons.set(token, factory());
      }
      return this.#singletons.get(token);
    });
  }

  registerTransient<T>(token: symbol, factory: () => T): void {
    this.#factories.set(token, factory);
  }

  resolve<T>(token: symbol): T {
    const factory = this.#factories.get(token);
    if (factory === undefined) {
      throw new Error(`Token não registrado: ${String(token.description ?? token)}`);
    }
    return factory() as T;
  }
}
