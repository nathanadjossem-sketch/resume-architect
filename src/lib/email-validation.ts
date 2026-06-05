// Strict email validation + disposable domain blocklist.
// Keeps faux / temporary emails out before we ask Supabase to send an OTP.

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "yopmail.com", "guerrillamail.com", "guerrillamail.info",
  "sharklasers.com", "10minutemail.com", "10minutemail.net", "tempmail.com",
  "temp-mail.org", "temp-mail.io", "trashmail.com", "trashmail.net",
  "throwawaymail.com", "getnada.com", "nada.email", "dispostable.com",
  "fakeinbox.com", "maildrop.cc", "mintemail.com", "mohmal.com",
  "moakt.com", "tmail.ws", "tmpmail.org", "tmpmail.net", "emailondeck.com",
  "discard.email", "discardmail.com", "spambox.us", "spam4.me",
  "mailnesia.com", "mailcatch.com", "mytemp.email", "mailtemp.info",
  "tempr.email", "burnermail.io", "anonbox.net", "byom.de",
  "fakemail.net", "incognitomail.com", "jetable.org", "mail-temporaire.fr",
  "yopmail.fr", "yopmail.net", "tempmailo.com", "minutemail.com",
  "trbvm.com", "trbvn.com", "rhyta.com", "armyspy.com", "cuvox.de",
  "dayrep.com", "einrot.com", "fleckens.hu", "gustr.com", "jourrapide.com",
  "superrito.com", "teleworm.us", "wegwerfmail.de", "wegwerfmail.net",
  "spambog.com", "tempinbox.com", "tempemail.net", "dropmail.me",
  "33mail.com", "anonaddy.com", "mail.tm", "linshiyou.com",
]);

export type EmailValidation = { ok: true } | { ok: false; reason: string };

export function validateEmail(raw: string): EmailValidation {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, reason: "Email requis" };
  if (email.length > 254) return { ok: false, reason: "Email trop long" };
  if (!EMAIL_RE.test(email)) return { ok: false, reason: "Format d'email invalide" };
  const domain = email.split("@")[1];
  if (!domain || !domain.includes(".")) return { ok: false, reason: "Domaine invalide" };
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "Les adresses jetables ne sont pas autorisées" };
  }
  // Block obvious test TLDs
  const tld = domain.split(".").pop()!;
  if (["test", "invalid", "example", "localhost"].includes(tld)) {
    return { ok: false, reason: "Domaine non autorisé" };
  }
  return { ok: true };
}
