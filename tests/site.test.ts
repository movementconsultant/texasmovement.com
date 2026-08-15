import { describe, it, expect } from "vitest";
import {
  liveFooterFor,
  liveSocialAccounts,
  liveSocialAccountsForLane,
  isVerifiedInbox,
  verifiedGeneralContact,
  isLiveProperty,
  isPrivateProperty,
  ecosystemEntry,
  ECOSYSTEM_MAP,
  safeOrganizationJsonLd,
  CONTACT_CTA_LABEL,
  LINKEDIN_URL_PENDING,
  VERIFIED_INBOXES,
  PROPERTIES,
  PROPERTY_ORDER,
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

  it("excludes properties marked private in ECOSYSTEM_MAP even though their status is live (founderlink, health)", () => {
    const keys = liveFooterFor("tmi").map((i) => i.key);
    expect(keys).not.toContain("founderlink");
    expect(keys).not.toContain("health");
  });

  it("includes tmi itself, marked isCurrent, when tmi is the current property", () => {
    const items = liveFooterFor("tmi");
    const self = items.find((i) => i.key === "tmi");
    expect(self?.isCurrent).toBe(true);
  });
});

describe("ECOSYSTEM_MAP / isPrivateProperty", () => {
  it("has exactly one entry per property in PROPERTY_ORDER", () => {
    const keys = ECOSYSTEM_MAP.map((e) => e.key).sort();
    expect(keys).toEqual([...PROPERTY_ORDER].sort());
  });

  it("marks exactly founderlink, health, and reparations as private", () => {
    const privateKeys = ECOSYSTEM_MAP.filter((e) => e.badge === "private").map((e) => e.key).sort();
    expect(privateKeys).toEqual(["founderlink", "health", "reparations"].sort());
  });

  it("marks every other property as building, including tmi and founder", () => {
    const buildingKeys = ECOSYSTEM_MAP.filter((e) => e.badge === "building").map((e) => e.key);
    expect(buildingKeys).toContain("tmi");
    expect(buildingKeys).toContain("founder");
    expect(buildingKeys).toContain("media");
    expect(buildingKeys).toContain("consulting");
    expect(buildingKeys).toContain("hero");
    expect(buildingKeys).toContain("performance");
    expect(buildingKeys).toContain("distribution");
    expect(buildingKeys).toContain("social");
  });

  it("isPrivateProperty agrees with ECOSYSTEM_MAP for every property", () => {
    for (const key of PROPERTY_ORDER) {
      expect(isPrivateProperty(key)).toBe(ecosystemEntry(key)?.badge === "private");
    }
  });

  it("tmi is grouped as core and founder is grouped as founder", () => {
    expect(ecosystemEntry("tmi")?.group).toBe("core");
    expect(ecosystemEntry("founder")?.group).toBe("founder");
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

describe("LinkedIn URL held pending confirmation", () => {
  it("liveSocialAccounts() never returns the unconfirmed tmi-lane LinkedIn URL", () => {
    for (const a of liveSocialAccounts()) {
      expect(a.url).not.toBe("https://www.linkedin.com/company/texasmovement");
    }
  });

  it("liveSocialAccountsForLane('tmi') never returns the unconfirmed LinkedIn URL", () => {
    for (const a of liveSocialAccountsForLane("tmi")) {
      expect(a.url).not.toBe("https://www.linkedin.com/company/texasmovement");
    }
  });

  it("safeOrganizationJsonLd().sameAs excludes the unconfirmed LinkedIn URLs", () => {
    const jsonLd = safeOrganizationJsonLd();
    expect(jsonLd.sameAs).not.toContain("https://www.linkedin.com/company/texasmovement");
    expect(jsonLd.sameAs).not.toContain("https://www.linkedin.com/company/texas-movement-consulting");
  });

  it("safeOrganizationJsonLd().sameAs excludes every linkedin.com URL, including the founder's personal profile — no LinkedIn URL of any kind is confirmed for public output yet", () => {
    const jsonLd = safeOrganizationJsonLd();
    expect(jsonLd.sameAs).not.toContain("https://www.linkedin.com/in/alexandermathai");
    expect(jsonLd.sameAs.some((u) => u.includes("linkedin.com"))).toBe(false);
  });

  it("safeOrganizationJsonLd() still includes other confirmed, non-LinkedIn accounts (nothing over-filtered)", () => {
    const jsonLd = safeOrganizationJsonLd();
    expect(jsonLd.sameAs.length).toBeGreaterThan(0);
    expect(jsonLd.sameAs).toContain("https://youtube.com/@texasmovementmedia");
  });

  it("liveSocialAccounts() excludes every linkedin.com URL", () => {
    expect(liveSocialAccounts().some((a) => (a.url as string).includes("linkedin.com"))).toBe(false);
  });

  it("liveSocialAccountsForLane('founder') excludes the personal LinkedIn URL but keeps other founder accounts", () => {
    const founder = liveSocialAccountsForLane("founder");
    expect(founder.some((a) => (a.url as string).includes("linkedin.com"))).toBe(false);
    expect(founder.some((a) => a.platform === "tiktok")).toBe(true);
  });

  it("LINKEDIN_URL_PENDING is a placeholder flag only — true, and not itself a URL", () => {
    expect(LINKEDIN_URL_PENDING).toBe(true);
  });
});

describe("primary CTA copy", () => {
  it("CONTACT_CTA_LABEL matches the exact approved copy, independent of verification state", () => {
    expect(CONTACT_CTA_LABEL).toBe("Contact Texas Movement");
  });

  it("verifiedGeneralContact(), if ever non-null, would use CONTACT_CTA_LABEL", () => {
    // Currently null (VERIFIED_INBOXES is empty) — this just documents the
    // contract so it can't silently drift if the inbox is later verified.
    const cta = verifiedGeneralContact();
    if (cta) {
      expect(cta.label).toBe(CONTACT_CTA_LABEL);
    } else {
      expect(cta).toBeNull();
    }
  });
});
