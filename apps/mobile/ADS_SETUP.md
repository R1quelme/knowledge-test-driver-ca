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

**App IDs** go in `app.json`:

```json
"react-native-google-mobile-ads": {
  "androidAppId": "ca-app-pub-XXXXXXXX~YYYYYYYY",
  "iosAppId": "ca-app-pub-XXXXXXXX~YYYYYYYY"
}
```

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

## 5. Consent — required before launch

Not wired up yet, and **this is a shipping blocker in the EU and UK**:

- **GDPR/UMP** — European users must be asked for consent before personalized
  ads. `react-native-google-mobile-ads` ships Google's UMP SDK
  (`AdsConsent.requestInfoUpdate` / `showForm`). Until then the code requests
  non-personalized ads only (`requestNonPersonalizedAdsOnly: true`), which is
  the conservative default but not a substitute for the consent form.
- **iOS ATT** — App Store review rejects apps that track without the
  App Tracking Transparency prompt. Needs `expo-tracking-transparency` and an
  `NSUserTrackingUsageDescription` string in `app.json`.

Android-only launch can defer ATT, but not GDPR.

## 6. Store listing

Both stores ask whether the app contains ads — answer **yes** on the Play
Console data safety form and the App Store privacy questionnaire. Getting this
wrong is a takedown risk.

## What's already in the code

- `src/lib/ads.ts` — `initAds()` plus `useInterstitial(enabled)`, which
  preloads an ad and shows it once
- `app/_layout.tsx` — initializes the SDK at startup
- `app/quiz.tsx` — preloads while answering, shows on the results screen, and
  only when the user is not premium

A failed load never blocks the results screen: `show()` no-ops and the user
continues.
