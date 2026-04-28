import type { Token } from "#app/ioc/tokens.js";

type Fabrica<T> = (container: IocContainer) => T;

// IoC: quem “monta” o grafo de objetos é o container; o app só pede instâncias por token.
export class IocContainer {
  private readonly fabricas = new Map<Token, Fabrica<unknown>>();
  private readonly singletons = new Map<Token, unknown>();

  registrarSingleton<T>(token: Token, fabrica: Fabrica<T>): this {
    this.fabricas.set(token, fabrica);
    return this;
  }

  resolve<T>(token: Token): T {
    if (this.singletons.has(token)) {
      return this.singletons.get(token) as T;
    }

    const fabrica = this.fabricas.get(token);
    if (!fabrica) {
      throw new Error(`Token não registrado: ${token}`);
    }

    const instancia = fabrica(this) as T;
    this.singletons.set(token, instancia);
    return instancia;
    
  }
}
