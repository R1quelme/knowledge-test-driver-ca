# Project status

Where the app actually stands, so a new conversation can pick it up without
re-deriving it. Update this when something below changes.

Last verified: October 21, 2026

## What this app is

Drive Test — a practice app for the Alberta, Canada driver's knowledge test.
110 questions in English, Portuguese, Spanish and Chinese.

- `apps/mobile` — the Expo app (this is the product)
- `apps/web` — a web version of the quiz
- `packages/content` — questions and translations, shared by both

Bundle id on both platforms: `com.matheusriquelme.driverquizcanada`

## Business model

| | Free | Premium |
|---|---|---|
| Practice tests | 2 per day, resets at local midnight | unlimited |
| Complete Study Mode | locked | unlocked |
| Ads | one interstitial at quiz results | none |

Intended pricing: **6.99 USD/month**, **13.99 USD/year** with a 3-day free
trial. These are what the terms of service state publicly. The app currently
shows Test Store prices instead (9.99 / 79.98) because the real store products
do not exist yet.

## Account status

| Service | Created? | State |
|---|---|---|
| Google Play Console | yes — $25 paid Oct 21, 2026 | app not created yet |
| RevenueCat | yes | project "Drive Test" exists, **Test Store only** — no real Android/iOS app configuration |
| AdMob | **no** | app uses Google's public sample ids |
| GitHub | yes | repo public, Pages live |

### RevenueCat specifics

- Entitlement identifier: **`Drive Test Pro`** (3 products attached, created
  May 11, 2026). The code matches on this exact string in
  `apps/mobile/src/lib/premium.ts`. If the two ever diverge, a purchase
  succeeds but the customer gets no access, and nothing reports an error.
- Keys in `app.json` are Test Store keys (`test_…`), which is why both
  platforms share one value. Real keys are `goog_…` and `appl_…`.
- Test Store purchases work in a debug build with no real store account — a
  modal offers "simulate success / failure / cancel".

### AdMob specifics

- App ids in `app.json` are `ca-app-pub-3940256099942544~…` — Google's sample
  ids from their docs, not yours.
- Ad unit ids do not exist at all; the code uses `TestIds.INTERSTITIAL` even
  in the production branch.
- Ads therefore work but earn nothing.
- AdMob pays nothing until the billing profile is complete and the address is
  PIN-verified by mail, which takes weeks. Worth starting early.

## Verified working

Confirmed by actually running the app, not by reading code:

- iOS: full purchase flow through the Test Store — paywall opens, purchase
  completes, `Drive Test Pro` unlocks Complete Study Mode. Cancelling is
  handled silently (the red LogBox screen on cancel is React Native dev
  tooling reacting to the SDK's own `console.error`; it does not exist in a
  release build).
- Android: builds, runs, daily limit counter renders, Study Mode shows locked
  with the PREMIUM badge, paywall opens with live prices, restore link
  present, legal links open the browser.
- Ads consent (UMP) initialises and ads load — tested **outside the EEA**,
  where UMP correctly shows no form.

## Not verified

- **The European consent form has never been shown.** Testing happened
  outside the EEA. Before an EU launch, force it with
  `AdsConsent.gatherConsent({ debugGeography })` and confirm it renders, that
  refusing blocks ads, and that the privacy options entry point works.
- Real store purchases (Play Billing / StoreKit) — only the Test Store has
  been exercised.
- The 3-day trial, renewal, and receipt validation.

## Remaining work

All of it is store configuration, not code:

1. **Play Console** — create the app; create subscriptions `premium_monthly`
   and `premium_yearly`; link a service account for RevenueCat; upload an AAB
   to internal testing (subscriptions do not work before this).
2. **RevenueCat** — add Android and iOS app configurations, import the
   products, attach them to `Drive Test Pro`, create a "default" offering with
   `$rc_monthly` and `$rc_annual` packages, then swap the Test Store key in
   `app.json` for the real per-platform keys.
3. **AdMob** — create the account and two apps, create an interstitial unit
   per platform, put the app ids in `app.json` and the unit ids in
   `PROD_INTERSTITIAL_UNIT_ID` in `src/lib/ads.ts`.
4. **Store listings** — both stores ask whether the app contains ads and
   in-app purchases. The answer to both is yes.

Step-by-step for 1–3 lives in `apps/mobile/PREMIUM_SETUP.md` and
`apps/mobile/ADS_SETUP.md`.

## Legal pages (live)

- Terms: https://r1quelme.github.io/knowledge-test-driver-ca/terms.html
- Privacy: https://r1quelme.github.io/knowledge-test-driver-ca/index.html

Served by GitHub Pages from `docs/` on `main`. Both stores require these URLs
in the listing, and the terms must describe auto-renewal — they do. The
paywall links to both from the point of purchase.

The repository was made public so Pages would work on a free plan. The history
was scanned for secrets first: none found, and the keystore has never been
committed.
