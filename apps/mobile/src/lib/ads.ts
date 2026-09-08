import { useEffect, useRef, useCallback, useState } from "react";
import { Platform } from "react-native";
import mobileAds, {
  InterstitialAd,
  AdEventType,
  TestIds,
  AdsConsent,
} from "react-native-google-mobile-ads";
import {
  getTrackingPermissionsAsync,
  requestTrackingPermissionsAsync,
} from "expo-tracking-transparency";

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

// Set by the consent flow. Ads are only requested once Google's UMP SDK says
// we may — under GDPR a European user who refuses consent must see no ad
// request at all, not merely a non-personalised one.
let adsAllowed = false;

const consentListeners = new Set<() => void>();

export function canRequestAds(): boolean {
  return adsAllowed;
}

/** Fires once the consent flow settles, so a screen already mounted can load. */
export function onConsentResolved(listener: () => void): () => void {
  consentListeners.add(listener);
  return () => consentListeners.delete(listener);
}

function settleConsent(allowed: boolean) {
  adsAllowed = allowed;
  consentListeners.forEach((l) => l());
}

/**
 * Runs the consent flow, then starts the ads SDK.
 *
 * Order matters: UMP first, because on iOS its form explains why tracking is
 * being asked for before the system ATT prompt appears — and ATT can only be
 * shown once, so a user who dismisses it without context is lost for good.
 */
export async function initAds(): Promise<void> {
  if (initialized) return;
  initialized = true;

  try {
    // Presents the GDPR form when the user's region requires one, and is a
    // no-op elsewhere. Google decides based on the device's location.
    const consent = await AdsConsent.gatherConsent();
    adsAllowed = consent.canRequestAds;
  } catch {
    // A consent failure must not silently turn into ad requests: leaving
    // adsAllowed false errs toward showing no ads rather than risking an
    // unconsented one.
    adsAllowed = false;
  }

  if (adsAllowed && Platform.OS === "ios") {
    try {
      const current = await getTrackingPermissionsAsync();
      if (current.canAskAgain && current.status === "undetermined") {
        await requestTrackingPermissionsAsync();
      }
    } catch {
      // Denied or unavailable tracking permission is fine — ads still serve,
      // just non-personalised.
    }
  }

  if (!adsAllowed) {
    settleConsent(false);
    return;
  }

  try {
    await mobileAds().initialize();
    settleConsent(true);
  } catch {
    settleConsent(false);
  }
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
  // Consent usually resolves after this screen mounts, so track it as state
  // rather than reading it once and missing the window.
  const [consented, setConsented] = useState(canRequestAds());

  useEffect(() => onConsentResolved(() => setConsented(canRequestAds())), []);

  useEffect(() => {
    if (!enabled || !consented) return;

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
  }, [enabled, consented]);

  const show = useCallback(() => {
    if (!enabled || !consented || shownRef.current || !loadedRef.current) return;
    shownRef.current = true;
    try {
      adRef.current?.show();
    } catch {
      // Never let an ad failure interrupt the quiz flow.
    }
  }, [enabled, consented]);

  return { show };
}
