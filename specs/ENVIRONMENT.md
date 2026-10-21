# Environment gotchas

Things that cost hours to diagnose on this machine. Read this before
concluding something is broken in the code.

Last verified: October 21, 2026

## The project must live outside ~/Documents

It is at `~/Projects/knowledge-test-driver-ca`. It used to be at
`~/Documents/Projects/…`, and **Documents is synced to iCloud Drive**
(`FXICloudDriveDesktop = 1`).

iCloud tries to sync `node_modules` and `build/`, and on conflict it
duplicates files with " 2" appended — `node_modules/metro 2`,
`ExpoModulesPackageList 2.java`. 1,131 such entries existed at one point.
A duplicated `metro` competing in module resolution is what made Metro
deadlock, and the duplicated generated `.java` broke Gradle outright.

Symptoms this caused, none of which pointed at the real culprit:
- Metro accepting connections but never serving a bundle, 0% CPU, stack
  parked in `__psynch_cvwait`
- `expo export` hanging at "Starting Metro Bundler"
- `pnpm install` failing with ENOENT on chmod
- Gradle: "class X is public, should be declared in a file named X.java"

If duplicates ever reappear:
`find . \( -name "* 2.*" -o -name "* 2" \) -not -path "./.git/*" -delete`

Do not move the project back into Documents.

## PATH after the macOS 26 (Tahoe) upgrade

New shells lost nvm, Homebrew and the JDK. Commands that build the app need
all three set explicitly:

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 22.22.0
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH="$JAVA_HOME/bin:/opt/homebrew/bin:$PATH:$HOME/Library/Android/sdk/platform-tools"
export ANDROID_HOME=$HOME/Library/Android/sdk
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
```

- **Node**: nvm has 22.22.0. Without sourcing nvm, `node` is not found at
  all — and the iOS Podfile shells out to `node`, so `pod install` dies too.
- **Java**: the system JDK is Zulu **11**; Gradle requires **17+**. Java 21
  only exists inside Android Studio's bundled JBR, at the path above.
- **LANG**: without UTF-8, `pod install` fails with "Unicode Normalization
  not appropriate for ASCII-8BIT". Android still generates fine; only the iOS
  pods are skipped, which makes it look like a different problem.

Adding these to `~/.zshrc` would make them permanent. That has not been done.

## Android emulator

`Pixel_7` AVD, Play Store enabled (so Play Billing works there).

- It has crashed mid-session before. After a restart the installed APK can be
  stale — reinstall from
  `apps/mobile/android/app/build/outputs/apk/debug/app-debug.apk`, otherwise
  JS looks for native modules the old binary does not have
  ("RNGoogleMobileAdsModule could not be found").
- The emulator reaches the host Metro via `adb reverse tcp:8081 tcp:8081`
  plus a `localhost` URL. `10.0.0.x` host addresses do not reliably work.
- `adb shell input tap/swipe` works for driving the UI; the iOS simulator has
  no equivalent in `simctl`.

## Library version constraints

`react-native-google-mobile-ads` is pinned to exactly **16.0.0**, no caret.
The window is narrow and both sides fail at Gradle:

| Version | AdMob SDK | Result |
|---|---|---|
| 16.4.0+ | 25.4.0 | fails — built with Kotlin 2.3.0, Expo SDK 54 uses 2.1.0 |
| **16.0.0** | 24.6.0 | works |
| 15.4.0 | 24.3.0 | fails — `Unresolved reference 'currentActivity'` on RN 0.81 |

`npx expo install` picks the newest release, which does not compile. Re-pin
after any Expo SDK upgrade, since a newer SDK moves the Kotlin ceiling.

## Keystore

`apps/mobile/drive-test.keystore` is gitignored and **exists only on this
machine**. It has never been committed.

If EAS generates a new one on the first production build, the app signature
changes and Play rejects the upload as a different app. Back it up, and
upload the existing one rather than letting EAS create a fresh keystore.

## After installing a native dependency

Metro caches module resolution. A newly installed package shows up as
`UnableToResolveError` until Metro restarts with `--clear`, and the native
project needs `npx expo prebuild --platform <os> --clean` before the module
exists in the binary.
