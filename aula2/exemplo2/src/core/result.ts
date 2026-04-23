export type Result<T, E = string> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function emptyOk(): Result<void, never> {
  return { ok: true, value: undefined };
}

export function mapResult<T, U, E>(
  r: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  return r.ok ? ok(fn(r.value)) : r;
}
