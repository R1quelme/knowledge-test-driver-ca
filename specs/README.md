# specs

Context a new conversation needs, and cannot recover from the code alone.

| File | What it holds |
|---|---|
| `STATUS.md` | what works, what is unverified, which accounts exist, what is left |
| `ENVIRONMENT.md` | machine-specific traps that cost hours to diagnose |

Setup instructions live next to the code they configure, not here:
`apps/mobile/PREMIUM_SETUP.md` (RevenueCat + stores) and
`apps/mobile/ADS_SETUP.md` (AdMob + consent).

## Verify before trusting

These notes were true when written. Code moves; account state moves faster.
Check before acting on anything here.

```bash
# entitlement name — must match the RevenueCat dashboard exactly
grep PREMIUM_ENTITLEMENT apps/mobile/src/lib/premium.ts

# are the keys still placeholders?
grep -E "revenuecat.*Key|AppId" apps/mobile/app.json
#   test_…                      → RevenueCat Test Store, not a real store
#   ca-app-pub-3940256099942544 → Google's sample AdMob id, earns nothing

# are ad unit ids still test ids?
grep -n "TestIds.INTERSTITIAL" apps/mobile/src/lib/ads.ts

# are the legal pages still live?
curl -s -o /dev/null -w "%{http_code}\n" \
  https://r1quelme.github.io/knowledge-test-driver-ca/terms.html
```

Account state — Play Console, RevenueCat, AdMob — cannot be verified from the
repository. Only the dashboards know. Ask rather than assume.

## Two failure modes worth knowing

**The entitlement string is a silent failure.** If
`PREMIUM_ENTITLEMENT` in the code and the identifier in RevenueCat ever
differ, purchases succeed, customers are charged, and they get nothing. No
error surfaces anywhere.

**Diagnosis went wrong twice in this project** by blaming the obvious
suspect. Metro hanging was blamed on the Node version, then NativeWind, then
pnpm's linker — it was iCloud duplicating files. A Gradle failure was blamed
on the AdMob library version — it was, but only after a first fix went too far
in the other direction. Reproduce against a blank project before concluding
the cause is in this one.
