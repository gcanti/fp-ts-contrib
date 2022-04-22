# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases.
**Note**: A feature tagged as Experimental is in a high state of flux, you're at risk of it changing without notice.

# 0.1.29

- **New Feature**
  - `IOOption`
    - add `fromPredicate`, #94 (@thewilkybarkid)

# 0.1.28

- **New Feature**
  - `ReaderIO`
    - add `apW`, #93 (@thewilkybarkid)
    - add `chainW`, #93 (@thewilkybarkid)
    - add `flattenW`, #93 (@thewilkybarkid)
    - add `chainFirstW`, #93 (@thewilkybarkid)
  - `IOOption`
    - add `chainFirstIOK`, #88 (@thewilkybarkid)
    - add `chainIOK`, #88 (@thewilkybarkid)
    - add `fromIOK`, #88 (@thewilkybarkid)

# 0.1.27

- **New Feature**
  - `ReaderIO`
    - add `asksReaderIO` / `asksReaderIOW`, #91 (@thewilkybarkid)
  - `ReaderTaskEither`
    - Add `ReaderIO` constructors / combinators, #90 (@thewilkybarkid)
  - `ReaderTask`
    - Add `ReaderIO` constructors / combinators, #92 (@thewilkybarkid)

# 0.1.26

- **New Feature**
  - `Zipper`
    - add `moveByFindFirst`, #81 (@SRachamim)

# 0.1.25

- **New Feature**
  - `Zipper`
    - add `findIndex`, #80 (@SRachamim)

# 0.1.23

- **New Feature**
  - `Zipper`
    - refactor to work with readonly and NonEmpty\*, #76 (@SRachamim)

# 0.1.22

- **Bug Fix**
  - `RegExp`
    - fix `test` implementation, #77 (@DenisFrezzato)

# 0.1.21

- **New Feature**
  - export modules from entrypoint, #71 (@waynevanson)

# 0.1.20

- **New Feature**
  - `List`
    - Add `chain`, `chainFirst`, `ap`, `apFirst`, `apSecond` (@IMax153)
    - Add `bind`, `bindTo`, and `apS` (@IMax153)
    - Add `Apply`, `Applicative`, `Monad`, `Show`, `Semigroup`, and `Monoid` instances (@IMax153)
- **Internal**
  - Remove `fast-check` dependency for `List` tests (@IMax153)

# 0.1.19

- **New Feature**
  - expose modules without lib/es6 prefix, closes #67 (@gcanti)

# 0.1.18

- **New Feature**
  - `ArrayOption`
    - add `zero` method (@IMax153)
    - split "mega" `arrayOption` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
      - Add `Alt` instance (@IMax153)
      - Add `Alternative` instance (@IMax153)
  - `Free`
    - split "mega" `free` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
  - `IOOption`
    - add `zero` method (@IMax153)
    - split "mega" `ioOption` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
      - Add `Alt` instance (@IMax153)
      - Add `Alternative` instance (@IMax153)
      - Add `Compactable` instance (@IMax153)
      - Add `Filterable` instance (@IMax153)
  - `List`
    - split "mega" `list` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Foldable` instance (@IMax153)
      - Add `Traversable` instance (@IMax153)
  - `ReaderIO`
    - split "mega" `readerIO` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
  - `StateEither`
    - split "mega" `stateEither` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
      - Add `MonadThrow` instance (@IMax153)
  - `StateIO`
    - split "mega" `stateIO` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
  - `StateTaskEither`
    - split "mega" `stateTaskEither` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
  - `TaskOption`
    - split "mega" `taskOption` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Monad` instance (@IMax153)
      - Add `Alternative` instance (@IMax153)
      - Add `Compactable` instance (@IMax153)
      - Add `Filterable` instance (@IMax153)
  - `Zipper`
    - split "mega" `zipper` instance into individual typeclass instances (@IMax153)
      - Add `Functor` instance (@IMax153)
      - Add `FunctorWithIndex` instance (@IMax153)
      - Add `Applicative` instance (@IMax153)
      - Add `Apply` instance (@IMax153)
      - Add `Foldable` instance (@IMax153)
      - Add `Traversable` instance (@IMax153)
      - Add `Comonad` instance (@IMax153)
- **Polish**
  - standardize export declarations in all modules (@IMax153)
  - add category tags to all module exports (@IMax153)
- **Internal**
  - remove pipeable from all modules (@IMax153)
  - add tests for `StateIO` (@IMax153)
  - add tests for `StateTaskEither` (@IMax153)

# 0.1.17

- **New Feature**
  - add `FunctorWithIndex` instance to `Zipper`, #65 (@giogonzo)

# 0.1.16

- **Polish**
  - add `Alternative1` instance to `TaskOption`, #62 (@pbadenski)

# 0.1.15

- **New Feature**
  - add `filterA` module, #56 (@SamHH)

# 0.1.14

- **New Feature**
  - add `IOOption` module, #53 (@DenisFrezzato)

# 0.1.13

- **New Feature**
  - `Do`
    - add `let`, `letL`, #49 (@kgtkr)

# 0.1.12

- **New Feature**
  - add `StateEither` module, #45 (@haredev)

# 0.1.11

- **New Feature**
  - `Zipper`
    - add missing pipeable combinators (@gcanti)

# 0.1.10

- **New Feature**
  - add `from<Monad>K`, `chain<Monad>K` to `ArrayOption`, `ReaderIO`, `StateIO`, `StateTaskEither`, `TaskOption` (@gcanti)

# 0.1.9

- **Bug Fix**
  - `Do`
    - replace `unknown` with `any`, fix #38 (@gcanti)
- **Polish**
  - rewrite es6 imports (@gcanti)

# 0.1.8

- **New Feature**
  - add `collectUntil` module (@gcanti)
  - add `List` module (@DenisFrezzato)
  - add `Task/getLine` module (@gcanti)

# 0.1.7

- **Bug Fix**
  - `TaskOption.fromNullable` now uses `NonNullable` in its return type, fixes #29 (@gcanti)

# 0.1.6

- **New Feature**
  - add `Zipper` module, #25 (@DenisFrezzato)

# 0.1.5

- **New Feature**
  - add some combinators to `TaskOption`, #24 (@bwlt)

# 0.1.4

- **New Feature**
  - add some combinators to `TaskOption`, #22 (@bwlt)

# 0.1.3

- **New Feature**
  - add `Free` monad, #19 (@YBogomolov)

# 0.1.2

- **Polish**
  - upgrade to `fp-ts@2.0.0` (@gcanti)

# 0.1.1

- **New Feature**
  - add es6 modules build (@gcanti)

# 0.1.0

- **Breaking Change**
  - upgrade to `fp-ts@2.x` (@gcanti)
  - rename `batchTraverseM` to `batchTraverse` (@gcanti)
  - remove `batchSequenceM` (@gcanti)
  - make `withTimeout` compatible with both `Task` and `TaskEither` (@gcanti)
  - remove `TaskEither/withTimeout` (@gcanti)

# 0.0.6

- **New Feature**
  - add `Task/withTimeout` (@gabro)
  - add `TaskEither/withTimeout` (@gabro)
  - add `TaskOption.withTimeout` (@gabro)
  - add `TaskValidation.withTimeout` (@gabro)
- **Bug Fix**
  - revert 55fe295e5d984a6b54c72005277733fd893f2234 (@gcanti)

# 0.0.5

- **New Feature**
  - (`Do` notation) add support for `sequenceS` (@gcanti)

# 0.0.4

- **Polish**
  - improve `Do` performance (@gcanti)

# 0.0.3

- **New Feature**
  - add `Semialign`, `Align` type classes (@Wraul)
  - add `IxIO` (@gcanti)

# 0.0.2

- **New Feature**
  - add `Do` notation (@pfgray)

# 0.0.1

Initial release
