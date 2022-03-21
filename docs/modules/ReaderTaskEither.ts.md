---
title: ReaderTaskEither.ts
nav_order: 16
parent: Modules
---

## ReaderTaskEither overview

Added in v0.1.27

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainFirstReaderIOK](#chainfirstreaderiok)
  - [chainFirstReaderIOKW](#chainfirstreaderiokw)
  - [chainReaderIOK](#chainreaderiok)
  - [chainReaderIOKW](#chainreaderiokw)
  - [fromReaderIOK](#fromreaderiok)
- [constructors](#constructors)
  - [leftReaderIO](#leftreaderio)
  - [rightReaderIO](#rightreaderio)

---

# combinators

## chainFirstReaderIOK

**Signature**

```ts
export declare const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => <E = never>(ma: RTE.ReaderTaskEither<R, E, A>) => RTE.ReaderTaskEither<R, E, A>
```

Added in v0.1.27

## chainFirstReaderIOKW

Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).

**Signature**

```ts
export declare const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1, E = never>(ma: RTE.ReaderTaskEither<R1, E, A>) => RTE.ReaderTaskEither<R1 & R2, E, A>
```

Added in v0.1.27

## chainReaderIOK

**Signature**

```ts
export declare const chainReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => <E = never>(ma: RTE.ReaderTaskEither<R, E, A>) => RTE.ReaderTaskEither<R, E, B>
```

Added in v0.1.27

## chainReaderIOKW

Less strict version of [`chainReaderIOK`](#chainreaderiok).

**Signature**

```ts
export declare const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1, E = never>(ma: RTE.ReaderTaskEither<R1, E, A>) => RTE.ReaderTaskEither<R1 & R2, E, B>
```

Added in v0.1.27

## fromReaderIOK

**Signature**

```ts
export declare const fromReaderIOK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => RIO.ReaderIO<R, B>
) => <E = never>(...a: A) => RTE.ReaderTaskEither<R, E, B>
```

Added in v0.1.27

# constructors

## leftReaderIO

**Signature**

```ts
export declare const leftReaderIO: <R, E = never, A = never>(me: RIO.ReaderIO<R, E>) => RTE.ReaderTaskEither<R, E, A>
```

Added in v0.1.27

## rightReaderIO

**Signature**

```ts
export declare const rightReaderIO: <R, E = never, A = never>(ma: RIO.ReaderIO<R, A>) => RTE.ReaderTaskEither<R, E, A>
```

Added in v0.1.27
