// One-sentence absurd invention pitch — make.fun bounty
// u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a
//
// The pitch: a mailbox that eats junk mail, digests it overnight, and posts
// the sender a handwritten apology from the house for wasting its time.
// The annoyance is junk mail; the fix is absurd (a mailbox with a stomach)
// yet strangely sensible (the sender apologises in writing, the house gets
// peace, and nothing ends up in the bin).
import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "A mailbox that eats junk mail, digests it overnight, and posts the sender a handwritten apology from the house for wasting its time.";

const MAX_CHARS = 220;

function validate(pitch: string): void {
  if (pitch.length < 1 || pitch.length > MAX_CHARS) {
    throw new Error(`pitch must be 1-${MAX_CHARS} characters, got ${pitch.length}`);
  }
  if (pitch.includes("\n") || pitch.includes("\r")) {
    throw new Error("pitch must be exactly one line");
  }
  const trimmed = pitch.trim();
  if (trimmed !== pitch) {
    throw new Error("pitch must not have leading or trailing whitespace");
  }
  // Exactly one sentence: one terminal period at the very end, no other
  // sentence-ending punctuation anywhere in the sentence.
  if (!trimmed.endsWith(".")) {
    throw new Error("pitch must end with a single period");
  }
  const sentenceEnders = (trimmed.match(/[.!?]/g) ?? []).length;
  if (sentenceEnders !== 1) {
    throw new Error(`pitch must be exactly one sentence, found ${sentenceEnders} sentence-ending marks`);
  }
}

validate(PITCH);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");
console.log(`OK: wrote ${PITCH.length} characters to /output/entry.txt`);
console.log(PITCH);
