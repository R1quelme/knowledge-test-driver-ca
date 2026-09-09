# Premium Setup (RevenueCat + Stores)

End-to-end checklist to enable subscriptions in production.

## Current status

The RevenueCat project ("Drive Test") exists and is on the **Test Store** — no
real app configuration has been created yet. The key currently in `app.json` is
the Test Store key, which is why the same value appears for both platforms; the
Test Store does not distinguish Android from iOS.

Test Store purchases work in a debug build without Play Billing or a tester
account, so the paywall can be exercised end to end today. It does **not**
validate against a real store: before shipping, work through steps 2–6 below and
replace the key with the real per-platform ones.

## 1. RevenueCat account

1. ~~Create account at https://app.revenuecat.com~~ — done.
2. ~~Create a **Project**~~ — done, the project is "Drive Test".
3. **Todo:** add two **Apps** under it (Apps → New app configuration):
   - Android — bundle ID `com.matheusriquelme.driverquizcanada`
   - iOS — bundle ID `com.matheusriquelme.driverquizcanada`
4. **Todo:** copy each **Public SDK key** (`goog_…` for Android, `appl_…` for
   iOS) — these replace the Test Store key in step 6.

## 2. Google Play Console — create subscriptions

1. Go to **Monetize → Products → Subscriptions**.
2. Create two subscriptions:

| Product ID | Base plan ID | Billing period | Price (USD) | Free trial |
|---|---|---|---|---|
| `premium_monthly` | `monthly` | 1 month | 6.99 | — |
| `premium_yearly` | `annual` | 1 year | 13.99 | 3 days |

3. For the annual plan: add an **offer** of type "Free trial" with 3 days duration.
4. Activate both subscriptions.
5. Upload at least one signed AAB to the **Internal testing** track (required before subs are usable).
6. Add yourself as a **license tester** (Setup → License testing) so you can test purchases without being charged.

## 3. Google Play — service account for RevenueCat

RevenueCat needs API access to validate purchases.

1. **Google Cloud Console** → IAM → Service Accounts → Create. Grant role **Pub/Sub Editor**.
2. Generate a **JSON key**, download it.
3. **Play Console** → Setup → API access → link the service account, grant permissions: "View financial data" + "Manage orders and subscriptions".
4. In RevenueCat (Project settings → Apps → Android), upload that JSON key.

## 4. App Store Connect (when you're ready for iOS)

1. Create the app in App Store Connect with bundle ID matching `app.json`.
2. **Monetization → Subscriptions** → create a group "Premium", add two products:
   - `premium_monthly` — 6.99 USD/month
   - `premium_yearly` — 13.99 USD/year, with 3-day Introductory Offer (Free)
3. Generate an **App-Specific Shared Secret** + an **In-App Purchase Key** in App Store Connect, paste in RevenueCat (Apps → iOS).

## 5. RevenueCat — entitlements & offerings

1. **Entitlements** → already created: identifier `Drive Test Pro` (3 products attached).
2. **Products** → import from stores (Android first, iOS later).
3. Attach both `premium_monthly` and `premium_yearly` products to the `Drive Test Pro` entitlement.
4. **Offerings** → create a "default" (current) offering with two packages:
   - `$rc_monthly` → `premium_monthly`
   - `$rc_annual` → `premium_yearly`

The code matches on the entitlement **identifier**, not the display name, via
`PREMIUM_ENTITLEMENT` in `src/lib/premium.ts` — it must stay exactly
`Drive Test Pro`. If they ever diverge, a purchase succeeds but the customer
gets no access, and nothing in the app reports an error.

## 6. Wire keys into the app

Edit `apps/mobile/app.json`:

```json
"extra": {
  "revenuecatAndroidKey": "goog_xxxxxxxxxxxxxxxxxxxxxxx",
  "revenuecatIosKey": "appl_xxxxxxxxxxxxxxxxxxxxxxx"
}
```

Both keys are the **public SDK keys** from RevenueCat (Project → API keys).

For local builds: `npx expo prebuild --clean && npx expo run:android`.

## 6b. Store builds (EAS)

`eas.json` defines three profiles:

| Profile | Output | Use |
|---|---|---|
| `development` | APK, dev client | local development against Metro |
| `preview` | APK | share a build without the dev client |
| `production` | AAB | what Play Console and App Store accept |

```bash
npx eas-cli login          # needs a free Expo account
npx eas-cli build --platform android --profile production
```

`appVersionSource: "remote"` with `autoIncrement` on the production profile
means EAS tracks the build number for you — `app.json` keeps `version` as the
human-facing "1.0.0" and never needs a `versionCode`. Bumping it by hand is
the usual way a submission gets rejected for a duplicate build number.

The first Android production build asks whether to generate a keystore. There
is already one at `apps/mobile/drive-test.keystore`, which is gitignored and
exists only on this machine — if you let EAS generate a new one instead, the
app signature changes and Play will refuse the upload as a different app.
Either upload the existing keystore or back it up before choosing.

## 7. Testing

- **Android**: install the AAB from internal testing track on a real device signed in with a tester Google account. Purchases will work with test cards / no charge.
- Emulator won't work for IAP (Play Billing requires a Play Services-enabled device with a tester account).
- Use `restore purchases` button on the paywall to recover access on a fresh install of the same Google account.

## 8. Required store legal pages

Both stores require these public URLs in your store listing:

- Privacy policy (already exists)
- Terms of service / EULA — must mention auto-renewing subscription terms

Update the paywall's `paywall.legal` string in [packages/content/src/locales](../../packages/content/src/locales) if you want to embed links.

## What's already in the code

- `src/lib/premium.ts` — RevenueCat init + `usePremium()` hook checking the `Drive Test Pro` entitlement
- `src/lib/dailyAttempts.ts` — 2 attempts/day for free users, resets at local midnight
- `src/components/Paywall.tsx` — modal with monthly/annual + restore + legal
- Home, Quiz and Study screens gated accordingly

When `revenuecatAndroidKey` is empty, the app runs normally as **free tier** (Study locked, 2 quiz attempts/day) but purchases are disabled and the paywall shows a "billing not configured" warning.
