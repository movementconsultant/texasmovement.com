import { describe, it, expect } from "vitest";
import {
  liveFooterFor,
  liveSocialAccounts,
  liveSocialAccountsForLane,
  isVerifiedInbox,
  verifiedGeneralContact,
  isLiveProperty,
  VERIFIED_INBOXES,
  PROPERTIES,
} from "../src/lib/site";

describe("liveFooterFor", () => {
  it("never includes a property whose status is not live", () => {
    const items = liveFooterFor("tmi");
    for (const item of items) {
      expect(PROPERTIES[item.key].status).toBe("live");
    }
  });

  it("excludes the known building-status properties (distribution, reparations, social)", () => {
    const keys = liveFooterFor("tmi").map((i) => i.key);
    expect(keys).not.toContain("distribution");
    expect(keys).not.toContain("reparations");
    expect(keys).not.toContain("social");
  });

  it("includes tmi itself, marked isCurrent, when tmi is the current property", () => {
    const items = liveFooterFor("tmi");
    const self = items.find((i) => i.key === "tmi");
    expect(self?.isCurrent).toBe(true);
  });
});

describe("liveSocialAccounts / liveSocialAccountsForLane", () => {
  it("never returns an account with a TBD url", () => {
    for (const a of liveSocialAccounts()) {
      expect(a.url).not.toBe("__TBD__");
    }
  });

  it("filters TBD accounts out of a specific lane (media has a TBD tiktok entry)", () => {
    const media = liveSocialAccountsForLane("media");
    expect(media.every((a) => a.url !== "__TBD__")).toBe(true);
    expect(media.some((a) => a.platform === "youtube")).toBe(true);
  });

  it("filters TBD accounts out of performance (has a TBD instagram entry)", () => {
    const perf = liveSocialAccountsForLane("performance");
    expect(perf.every((a) => a.url !== "__TBD__")).toBe(true);
  });
});

describe("isVerifiedInbox / verifiedGeneralContact", () => {
  it("VERIFIED_INBOXES is empty by default — nothing is verified until a human confirms it", () => {
    expect(VERIFIED_INBOXES.length).toBe(0);
  });

  it("returns false for every known inbox while VERIFIED_INBOXES is empty", () => {
    expect(isVerifiedInbox("hello@texasmovement.com")).toBe(false);
    expect(isVerifiedInbox("alexander@texasmovement.com")).toBe(false);
    expect(isVerifiedInbox(undefined)).toBe(false);
    expect(isVerifiedInbox(null)).toBe(false);
  });

  it("verifiedGeneralContact() returns null while nothing is verified — callers must render no CTA", () => {
    expect(verifiedGeneralContact()).toBeNull();
  });
});

describe("isLiveProperty", () => {
  it("matches PROPERTIES[key].status === 'live' for every property", () => {
    for (const key of Object.keys(PROPERTIES) as Array<keyof typeof PROPERTIES>) {
      expect(isLiveProperty(key)).toBe(PROPERTIES[key].status === "live");
    }
  });

  it("is true for tmi, false for the known building-status properties", () => {
    expect(isLiveProperty("tmi")).toBe(true);
    expect(isLiveProperty("distribution")).toBe(false);
    expect(isLiveProperty("reparations")).toBe(false);
    expect(isLiveProperty("social")).toBe(false);
  });
});

describe("tmi property registry sanity", () => {
  it("tmi's primaryCta points at the internal /lanes route, not an inbox", () => {
    expect(PROPERTIES.tmi.primaryCta.href).toBe("/lanes");
    expect(PROPERTIES.tmi.primaryCta.label).toBe("Find your lane");
  });
});
