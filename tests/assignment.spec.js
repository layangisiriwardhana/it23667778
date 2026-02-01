import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.swifttranslator.com/", { waitUntil: "domcontentloaded" });
});

// Locator helpers (clean & same style)
const inputBox = (page) => page.getByPlaceholder("Input Your Singlish Text Here.");
const sinhalaOut = (page) => page.locator('div.bg-slate-50').first();

// Small helper: wait until Sinhala output is not empty
async function waitForOutput(page) {
  await expect
    .poll(async () => {
      const txt = await sinhalaOut(page).textContent();
      return (txt || "").trim();
    }, { timeout: 25000 })
    .not.toBe("");
}


test("Pos_Fun_0001: Greeting", async ({ page }) => {
  await inputBox(page).fill("suba dhavasak");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("සුබ දවසක්");
});

test("Pos_Fun_0002: Simple statement", async ({ page }) => {
  await inputBox(page).fill("oyaa hodhin dha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔයා හොදින් ද?");
});

test("Pos_Fun_0003: Polite request for help", async ({ page }) => {
  await inputBox(page).fill("eya poddak balanna.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("එය පොඩ්ඩක් බලන්න.");
});

test("Pos_Fun_0004: Convert a past tense sentence", async ({ page }) => {
  await inputBox(page).fill("ohu kalin call ekak gaththa");
  await expect(sinhalaOut(page)).toHaveText("ඔහු කලින් call එකක් ගත්ත", { timeout: 25000 });

});

test("Pos_Fun_0005: Future plan", async ({ page }) => {
  await inputBox(page).fill("mama heta ennam");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මම හෙට එන්නම්");
});

test("Pos_Fun_0006: Repetition for emphasis", async ({ page }) => {
  await inputBox(page).fill("hari hari mama dhanam");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("හරි හරි මම දනම්");
});

test("Pos_Fun_0007: Command with location", async ({ page }) => {
  await inputBox(page).fill("Kandy yanna");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("Kandy යන්න");
});

test("Pos_Fun_0008: Convert a negative sentence", async ({ page }) => {
  await inputBox(page).fill("mata adha office yanna bae.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මට අද office යන්න බැ.");
});

test("Pos_Fun_0009: Singular pronoun", async ({ page }) => {
  await inputBox(page).fill("oyaa monavadha karanne");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔයා මොනවද කරන්නේ");
});

test("Pos_Fun_0010: Convert a plural pronoun sentence", async ({ page }) => {
  await inputBox(page).fill("teacher class ekata enavaa.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("teacher class එකට එනවා.");
});

test("Pos_Fun_0011: Complex condition", async ({ page }) => {
  await inputBox(page).fill("vaessa nathi vunaoth api yamu");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("වැස්ස නති වුනඔත් අපි යමු");
});

test("Pos_Fun_0012: Convert a mixed Singlish and English sentence", async ({ page }) => {
  await inputBox(page).fill("ohuta document tika upload karanna thiyenavaa.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔහුට document ටික upload කරන්න තියෙනවා.");
});

test("Pos_Fun_0013: Word combination", async ({ page }) => {
  await inputBox(page).fill("gihin enna");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ගිහින් එන්න");
});

test("Pos_Fun_0014: Convert a sentence containing a place name", async ({ page }) => {
  await inputBox(page).fill("mama Colombo valata travel karanavaa.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මම Colombo වලට travel කරනවා.");
});

test("Pos_Fun_0015: Mixed tech terms", async ({ page }) => {
  await inputBox(page).fill("magee Laptop eka slow");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මගේ Laptop එක slow");
});

test("Pos_Fun_0016: Convert a sentence with currency value", async ({ page }) => {
  await inputBox(page).fill("photo eka Rs. 1500 yi");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("photo එක Rs. 1500 යි");
});

test("Pos_Fun_0017: Basic punctuation", async ({ page }) => {
  await inputBox(page).fill("oyaata kohomadha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔයාට කොහොමද?");
});

test("Pos_Fun_0018: Convert a sentence with extra spaces", async ({ page }) => {
  await inputBox(page).fill("ohu practice yanna hadhanavaa.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔහු practice යන්න හදනවා.");
});

test("Pos_Fun_0019: Date formats in one input", async ({ page }) => {
  await inputBox(page).fill("2026-03-01 thamaayi dhennee");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("2026-03-01 තමායි දෙන්නේ");
});

test("Pos_Fun_0020: Informal slang phrase", async ({ page }) => {
  await inputBox(page).fill("supiri wadak machan!");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("සුපිරි wඅඩක් මචන්!");
});

test("Pos_Fun_0021: Convert a future tense sentence", async ({ page }) => {
  await inputBox(page).fill("api heta meeting ekata yamu");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අපි හෙට meeting එකට යමු");
});

test("Pos_Fun_0022: Mixed English", async ({ page }) => {
  await inputBox(page).fill("mage phone eka wada na");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("mage phone එක wඅඩ න");
});

test("Pos_Fun_0023: Convert a sentence with repeated emphasis words", async ({ page }) => {
  await inputBox(page).fill("eka hari hari lassanayi.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("එක හරි හරි ලස්සනයි.");
});

test("Pos_Fun_0024: Long paragraph", async ({ page }) => {
  await inputBox(page).fill("lecturer kiwwa widhiyata api hAmoema exam ekata lAsthii unaa eeyei eith eika maara amaaruyi.api hAmoetama lakuNu aduweyi.karanna dheyak nae ithin.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("lecturer කිwwඅ wඉදියට අපි හමොඑම exam එකට ලස්තී උනා ඒයේ එඉත් එඉක මාර අමාරුයි.අපි හමොඑටම ලකුණු අඩුwඑයි.කරන්න දෙයක් නැ ඉතින්.");

test("Pos_UI_0001: Real-time typing", async ({ page }) => {
  await inputBox(page).fill("api yamu");
  await waitForOutput(page);

  // Now clear input
  await inputBox(page).fill("");

  // Output should be empty (or cleared)
  await expect
    .poll(async () => ((await sinhalaOut(page).textContent()) || "").trim(), { timeout: 15000 })
    .toBe("");
});


test("Neg_Fun_0001: Handle sentence without grammatical structure", async ({ page }) => {
  await inputBox(page).fill("mama yanava office");
  await waitForOutput(page);

  const cleanExpected = "මම office යනව";
  await expect(sinhalaOut(page)).toHaveText(cleanExpected);
});

test("Neg_Fun_0002: Handle numeric noise in sentence", async ({ page }) => {
  await inputBox(page).fill("mama 123 office yanavaa");
  await waitForOutput(page);

  const cleanExpected = "මම 123 office යනවා";
  await expect(sinhalaOut(page)).toHaveText(cleanExpected);
});

test("Neg_Fun_0003: Complex Negation", async ({ page }) => {
  await inputBox(page).fill("mata eeka baee kiyannako");
  await waitForOutput(page);

  const cleanExpected = "මට ඒක බැහැ කියන්නකෝ";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0004: Extreme Punctuation", async ({ page }) => {
  await inputBox(page).fill("ehema karanna epa!!!!!");
  await waitForOutput(page);

  const cleanExpected = "එහෙම කරන්න එපා!!!!!";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0005: Handle unsupported chat shorthand", async ({ page }) => {
  await inputBox(page).fill("u r ok?");
  await waitForOutput(page);

  const cleanExpected = "උ ර් ඔක්?";
  await expect(sinhalaOut(page)).toHaveText(cleanExpected);
});

test("Neg_Fun_0006: Improper capitalization", async ({ page }) => {
  await inputBox(page).fill("mAmA yAnAvA");
  await waitForOutput(page);

  const cleanExpected = "මම යනවා";
  const actual = (await sinhalaOut(page).textContent()) || "";
  // Compare raw text to ensure multiple spaces are detected (Playwright's toHaveText normalizes whitespace)
  expect(actual).not.toBe(cleanExpected);
});

test("Neg_Fun_0007: Unknown acronyms", async ({ page }) => {
  await inputBox(page).fill("magee CV eka check karanna");
  await waitForOutput(page);

  const cleanExpected = "මගේ CV එක check කරන්න";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0008: Line break split", async ({ page }) => {
  await inputBox(page).fill("mama \n yanavaa");
  await waitForOutput(page);

  const cleanExpected = "මම යනවා";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0009: Handle incorrect tense construction", async ({ page }) => {
  await inputBox(page).fill("mama iiyee yanna");
  await waitForOutput(page);

  const cleanExpected = "මම ඊයේ යන්න";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0010: Handle mixed English dominance", async ({ page }) => {
  await inputBox(page).fill("mam office yanna late because traffic very heavy");
  await waitForOutput(page);

  const cleanExpected = "mam office යන්න late because traffic very heavy";
  await expect(sinhalaOut(page)).toHaveText(cleanExpected);
});

// Updated by Layangi Siriwardhana
