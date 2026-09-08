# Ads Setup (AdMob)

Free users get one interstitial when they reach the quiz results. The daily
limit is 2 attempts, so that caps at two ads a day. Premium removes them — this
is the `paywall.feature_no_ads` promise, so **ads must actually ship** or that
line has to come out of the paywall.

## Current status

No AdMob account exists yet. Everything below runs on **Google's test unit
ids**, which always fill and earn nothing. The app is wired end to end and you
can see a real interstitial in a dev build today; it just isn't making money.

Two things must happen before shipping: create the account (steps 1–3) and
replace the ids (step 4).

## 1. Create the AdMob account

1. Sign up at https://admob.google.com with the same Google account as Play Console.
2. **Apps → Add app** — twice, one per platform:
   - Android — `com.matheusriquelme.driverquizcanada`
   - iOS — `com.matheusriquelme.driverquizcanada`
3. Answer "Is your app listed on a store?" — if not published yet, choose No;
   you can link the store listing later.
4. Copy each **App ID** (format `ca-app-pub-XXXXXXXX~YYYYYYYY`, note the `~`).

## 2. Create the ad units

For each app, **Ad units → Add ad unit → Interstitial**:

| Platform | Ad unit name | Format |
|---|---|---|
| Android | `quiz_results_interstitial` | Interstitial |
| iOS | `quiz_results_interstitial` | Interstitial |

Copy each **Ad unit ID** (format `ca-app-pub-XXXXXXXX/ZZZZZZZZ`, note the `/`).
App ID and ad unit ID are different values — mixing them up is the most common
setup mistake.

## 3. Link payments

AdMob pays nothing until **Payments → billing profile** is complete and the
address is PIN-verified by mail. Start this early; the PIN letter takes weeks.

## 4. Wire the ids into the app

**App IDs** are props on the config plugin in `app.json` — they belong in the
`plugins` array, not in `extra`, or the plugin silently skips them and the
native SDK crashes on startup:

```json
"plugins": [
  [
    "react-native-google-mobile-ads",
    {
      "androidAppId": "ca-app-pub-XXXXXXXX~YYYYYYYY",
      "iosAppId": "ca-app-pub-XXXXXXXX~YYYYYYYY"
    }
  ]
]
```

To confirm a prebuild picked them up: `AndroidManifest.xml` should contain a
`com.google.android.gms.ads.APPLICATION_ID` meta-data entry, and iOS
`Info.plist` a `GADApplicationIdentifier` key.

**Ad unit IDs** go in `src/lib/ads.ts`, in `PROD_INTERSTITIAL_UNIT_ID`:

```ts
const PROD_INTERSTITIAL_UNIT_ID = Platform.select({
  android: "ca-app-pub-XXXXXXXX/ZZZZZZZZ",
  ios: "ca-app-pub-XXXXXXXX/ZZZZZZZZ",
  default: TestIds.INTERSTITIAL,
})!;
```

Leave the `__DEV__` branch on `TestIds`. Serving real ads to your own debug
builds is how accounts get flagged for invalid traffic — a strike there can
disable the whole AdMob account, not just the unit.

After changing `app.json`: `npx expo prebuild --clean`.

On this machine `pod install` fails during prebuild with
`Unicode Normalization not appropriate for ASCII-8BIT` unless the terminal is
UTF-8. Android still generates correctly; only the iOS pods are skipped. Fix:

```bash
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
npx expo prebuild --clean
```

Adding those exports to `~/.zshrc` makes it permanent.

## 5. Consent

Wired up in `src/lib/ads.ts`, in this order:

1. **GDPR/UMP** — `AdsConsent.gatherConsent()` shows Google's consent form when
   the user's region requires one, and does nothing elsewhere; Google decides
   from the device's location. No ad is requested unless it returns
   `canRequestAds`, so a European user who refuses sees no ad request at all.
2. **iOS ATT** — the system App Tracking Transparency prompt, via
   `expo-tracking-transparency`. The explanation string lives in `app.json`
   under the plugin's `userTrackingPermission`.

UMP runs before ATT deliberately: its form explains why tracking is about to
be requested, and iOS only ever shows the ATT prompt once, so a user who
dismisses it with no context cannot be asked again.

If the consent flow throws, `adsAllowed` stays false and no ads load. Failing
closed is the point — an unconsented ad in the EU is a legal problem, a
missing ad is lost revenue.

**Still to verify before an EU launch:** the form has only been exercised
outside the EEA, where UMP correctly does nothing. Use
`AdsConsent.gatherConsent({ debugGeography, testDeviceIdentifiers })` to force
the European form and confirm it renders, that refusing blocks ads, and that
the privacy options entry point works.

## 6. Store listing

Both stores ask whether the app contains ads — answer **yes** on the Play
Console data safety form and the App Store privacy questionnaire. Getting this
wrong is a takedown risk.

## Why the library version is pinned

`react-native-google-mobile-ads` is pinned to exactly **16.0.0** — no caret.
The version has to land in a narrow window, and both sides fail at Gradle:

| Version | AdMob SDK | Android build |
|---|---|---|
| 16.4.0+ | 25.4.0 | fails — compiled with Kotlin 2.3.0, Expo SDK 54 uses 2.1.0 |
| **16.0.0** | **24.6.0** | **works** |
| 15.4.0 | 24.3.0 | fails — `Unresolved reference 'currentActivity'` on RN 0.81 |

`npx expo install` picks the newest release, which is 16.5.0 today: it checks
compatibility with Expo itself but not the transitive Kotlin metadata, so it
resolves to a version that cannot compile. iOS builds fine either way — this
only breaks Android.

Re-pin here if you ever upgrade the Expo SDK, since a newer SDK ships a newer
Kotlin and the upper bound moves.

## What's already in the code

- `src/lib/ads.ts` — `initAds()` plus `useInterstitial(enabled)`, which
  preloads an ad and shows it once
- `app/_layout.tsx` — initializes the SDK at startup
- `app/quiz.tsx` — preloads while answering, shows on the results screen, and
  only when the user is not premium

A failed load never blocks the results screen: `show()` no-ops and the user
continues.
