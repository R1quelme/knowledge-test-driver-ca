import { useEffect, useState, useCallback } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import Purchases, {
  type CustomerInfo,
  type PurchasesOffering,
  type PurchasesPackage,
} from "react-native-purchases";

export const PREMIUM_ENTITLEMENT = "Drive Test Pro";

type Extra = { revenuecatAndroidKey?: string; revenuecatIosKey?: string };

function getApiKey(): string | null {
  const extra = (Constants.expoConfig?.extra ?? {}) as Extra;
  const key =
    Platform.OS === "ios" ? extra.revenuecatIosKey : extra.revenuecatAndroidKey;
  return key && key.length > 0 ? key : null;
}

let initialized = false;

export async function initPurchases(): Promise<void> {
  if (initialized) return;
  const apiKey = getApiKey();
  if (!apiKey) return;
  await Purchases.configure({ apiKey });
  initialized = true;
}

function hasPremium(info: CustomerInfo | null): boolean {
  if (!info) return false;
  return info.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;
}

export type PurchaseResult =
  | { status: "success" }
  | { status: "cancelled" }
  | { status: "error" };

type PremiumState = {
  ready: boolean;
  isPremium: boolean;
  offering: PurchasesOffering | null;
  purchase: (pkg: PurchasesPackage) => Promise<PurchaseResult>;
  restore: () => Promise<boolean>;
  refresh: () => Promise<void>;
};

export function usePremium(): PremiumState {
  const [ready, setReady] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);

  const apiKey = getApiKey();

  const loadOfferings = useCallback(async () => {
    if (!apiKey) return;
    try {
      const offerings = await Purchases.getOfferings();
      setOffering(offerings.current ?? null);
    } catch {}
  }, [apiKey]);

  const refresh = useCallback(async () => {
    if (!apiKey) {
      setReady(true);
      return;
    }
    try {
      const info = await Purchases.getCustomerInfo();
      setIsPremium(hasPremium(info));
    } catch {}
    setReady(true);
  }, [apiKey]);

  useEffect(() => {
    if (!apiKey) {
      setReady(true);
      return;
    }
    refresh();
    loadOfferings();
    const listener = (info: CustomerInfo) => setIsPremium(hasPremium(info));
    Purchases.addCustomerInfoUpdateListener(listener);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, [apiKey, refresh, loadOfferings]);

  const purchase = useCallback(
    async (pkg: PurchasesPackage): Promise<PurchaseResult> => {
      try {
        const { customerInfo } = await Purchases.purchasePackage(pkg);
        const ok = hasPremium(customerInfo);
        setIsPremium(ok);
        return ok ? { status: "success" } : { status: "error" };
      } catch (e: unknown) {
        const err = e as { userCancelled?: boolean };
        if (err?.userCancelled) return { status: "cancelled" };
        return { status: "error" };
      }
    },
    [],
  );

  const restore = useCallback(async () => {
    try {
      const info = await Purchases.restorePurchases();
      const ok = hasPremium(info);
      setIsPremium(ok);
      return ok;
    } catch {
      return false;
    }
  }, []);

  return { ready, isPremium, offering, purchase, restore, refresh };
}

export function isRevenueCatConfigured(): boolean {
  return getApiKey() !== null;
}
