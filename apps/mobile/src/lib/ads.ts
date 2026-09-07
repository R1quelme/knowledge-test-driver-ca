import { useEffect, useRef, useCallback } from "react";
import { Platform } from "react-native";
import mobileAds, {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

/**
 * Free users see one interstitial when they reach the quiz results. With a
 * 2-attempt daily limit that caps at two ads a day, which is what the paywall
 * promises to remove.
 */

// TODO(ads): no AdMob account exists yet, so every build uses Google's
// always-fill test unit and earns nothing. Once the real unit ids exist, put
// them in the production branch below — keep TestIds under __DEV__, since
// serving real ads to a debug build risks an AdMob policy strike.
// See ADS_SETUP.md.
const PROD_INTERSTITIAL_UNIT_ID = Platform.select({
  android: TestIds.INTERSTITIAL,
  ios: TestIds.INTERSTITIAL,
  default: TestIds.INTERSTITIAL,
})!;

const INTERSTITIAL_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : PROD_INTERSTITIAL_UNIT_ID;

let initialized = false;

export async function initAds(): Promise<void> {
  if (initialized) return;
  await mobileAds().initialize();
  initialized = true;
}

/**
 * Loads an interstitial ahead of time and returns a `show` that plays it once.
 * Ads are never loaded or shown when `enabled` is false, so a subscriber never
 * requests one.
 */
export function useInterstitial(enabled: boolean) {
  const adRef = useRef<InterstitialAd | null>(null);
  const loadedRef = useRef(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const ad = InterstitialAd.createForAdRequest(INTERSTITIAL_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    adRef.current = ad;

    const unsubLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      loadedRef.current = true;
    });
    // A failed load must not block the results screen; show() just no-ops.
    const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
      loadedRef.current = false;
    });

    ad.load();

    return () => {
      unsubLoaded();
      unsubError();
      adRef.current = null;
      loadedRef.current = false;
    };
  }, [enabled]);

  const show = useCallback(() => {
    if (!enabled || shownRef.current || !loadedRef.current) return;
    shownRef.current = true;
    try {
      adRef.current?.show();
    } catch {
      // Never let an ad failure interrupt the quiz flow.
    }
  }, [enabled]);

  return { show };
}
