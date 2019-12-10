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

# 0.1.8

- **New Feature**
  - add `Task/getLine` module (@gcanti)
  - add `collectUntil` module (@gcanti)

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
