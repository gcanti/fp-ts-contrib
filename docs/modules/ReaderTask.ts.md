---
title: ReaderTask.ts
nav_order: 15
parent: Modules
---

## ReaderTask overview

Added in v0.1.27

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainFirstReaderIOK](#chainfirstreaderiok)
  - [chainFirstReaderIOKW](#chainfirstreaderiokw)
  - [chainReaderIOK](#chainreaderiok)
  - [chainReaderIOKW](#chainreaderiokw)
  - [fromReaderIOK](#fromreaderiok)
- [natural transformations](#natural-transformations)
  - [fromReaderIO](#fromreaderio)

---

# combinators

## chainFirstReaderIOK

**Signature**

```ts
export declare const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => (ma: RT.ReaderTask<R, A>) => RT.ReaderTask<R, A>
```

Added in v0.1.27

## chainFirstReaderIOKW

Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).

**Signature**

```ts
export declare const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1>(ma: RT.ReaderTask<R1, A>) => RT.ReaderTask<R1 & R2, A>
```

Added in v0.1.27

## chainReaderIOK

**Signature**

```ts
export declare const chainReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => (ma: RT.ReaderTask<R, A>) => RT.ReaderTask<R, B>
```

Added in v0.1.27

## chainReaderIOKW

Less strict version of [`chainReaderIOK`](#chainreaderiok).

**Signature**

```ts
export declare const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1>(ma: RT.ReaderTask<R1, A>) => RT.ReaderTask<R1 & R2, B>
```

Added in v0.1.27

## fromReaderIOK

**Signature**

```ts
export declare const fromReaderIOK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => RIO.ReaderIO<R, B>
) => (...a: A) => RT.ReaderTask<R, B>
```

Added in v0.1.27

# natural transformations

## fromReaderIO

**Signature**

```ts
export declare const fromReaderIO: <R, A>(fa: RIO.ReaderIO<R, A>) => RT.ReaderTask<R, A>
```

Added in v0.1.27
