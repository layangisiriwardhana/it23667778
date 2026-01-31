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
  await inputBox(page).fill("aayuboovan! oyaata kohomadha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ආයුබෝවන්! ඔයාට කොහොමද?");
});

test("Pos_Fun_0002: Simple statement", async ({ page }) => {
  await inputBox(page).fill("adha mama gedhara inne.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අද මම ගෙදර ඉන්නේ.");
});

test("Pos_Fun_0003: Polite request for help", async ({ page }) => {
  await inputBox(page).fill("karuNaakarala podi help ekak karanna puluvandha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("කරුණාකරල පොඩි help එකක් කරන්න පුලුවන්ද?");
});

test("Pos_Fun_0004: Urgent command", async ({ page }) => {
  await inputBox(page).fill("vahaama enna!");
  await expect(sinhalaOut(page)).toHaveText("වහාම එන්න!", { timeout: 25000 });

});

test("Pos_Fun_0005: Negative form statement", async ({ page }) => {
  await inputBox(page).fill("mama adha ennee naehae.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මම අද එන්නේ නැහැ.");
});

test("Pos_Fun_0006: Past tense statement", async ({ page }) => {
  await inputBox(page).fill("api iiyee market giyaa.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අපි ඊයේ market ගියා.");
});

test("Pos_Fun_0007: Future plan statement", async ({ page }) => {
  await inputBox(page).fill("api heta film ekak balamu.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අපි හෙට film එකක් බලමු.");
});

test("Pos_Fun_0008: Invitation question", async ({ page }) => {
  await inputBox(page).fill("oyaa maath ekka yanavadha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔයා මාත් එක්ක යනවද?");
});

test("Pos_Fun_0009: Plural pronoun instruction", async ({ page }) => {
  await inputBox(page).fill("oyaalaa dhaen yamu.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔයාලා දැන් යමු.");
});

test("Pos_Fun_0010: Compound sentence with cause", async ({ page }) => {
  await inputBox(page).fill("mama class yanna haedhuvee, namuth vaessa nisaa bus eka late una.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මම class යන්න හැදුවේ, නමුත් වැස්ස නිසා bus එක late උන.");
});

test("Pos_Fun_0011: Conditional with alternative", async ({ page }) => {
  await inputBox(page).fill("oyaa enavanam api cafe ekata yamu, nathnam gedhara imu.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("ඔයා එනවනම් අපි cafe එකට යමු, නත්නම් ගෙදර ඉමු.");
});

test("Pos_Fun_0012: Question + short follow-up", async ({ page }) => {
  await inputBox(page).fill("meeka hariyata vaeda karanavadha? mata sure naee.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මේක හරියට වැඩ කරනවද? මට sure නෑ.");
});

test("Pos_Fun_0013: Repeated words for emphasis", async ({ page }) => {
  await inputBox(page).fill("hari hari, mama dhaenma ennam.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("හරි හරි, මම දැන්ම එන්නම්.");
});

test("Pos_Fun_0014: Food request", async ({ page }) => {
  await inputBox(page).fill("mata paan kanna oone.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මට පාන් කන්න ඕනෙ.");
});

test("Pos_Fun_0015: Places + English words kept", async ({ page }) => {
  await inputBox(page).fill("api Colombo yamu, passe hotel ekee dinner gamu.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අපි Colombo යමු, පස්සෙ hotel එකේ dinner ගමු.");
});

test("Pos_Fun_0016: Brand terms + time format", async ({ page }) => {
  await inputBox(page).fill("magee Zoom meeting eka 7.30 AM. link eka WhatsApp eken evanavadha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මගේ Zoom meeting එක 7.30 AM. link එක WhatsApp එකෙන් එවනවද?");
});

test("Pos_Fun_0017: Email + attachment request", async ({ page }) => {
  await inputBox(page).fill("documents tika attach karala email ekak evanna puluvandha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("documents ටික attach කරල email එකක් එවන්න පුලුවන්ද?");
});

test("Pos_Fun_0018: Currency and number formatting", async ({ page }) => {
  await inputBox(page).fill("adha bill eka Rs. 5343 venna puluvan.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අද bill එක Rs. 5343 වෙන්න පුලුවන්.");
});

test("Pos_Fun_0019: Date formats in one input", async ({ page }) => {
  await inputBox(page).fill("appointment eka 2026-05-21 dha? naethnam 25/12/2025 dha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("appointment එක 2026-05-21 ද? නැත්නම් 25/12/2025 ද?");
});

test("Pos_Fun_0020: Office + late wording", async ({ page }) => {
  await inputBox(page).fill("mama adha office yanne late velaa.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මම අද office යන්නෙ late වෙලා.");
});

test("Pos_Fun_0021: Units with numbers", async ({ page }) => {
  await inputBox(page).fill("kiri 250ml k dhaanna, saha sugar 10g k dhaanna.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("කිරි 250ml ක් දාන්න, සහ sugar 10g ක් දාන්න.");
});

test("Pos_Fun_0022: Line break", async ({ page }) => {
  await inputBox(page).fill("mama adha gedhara inne.\noyaa enavadha?");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("මම අද ගෙදර ඉන්නේ.\nඔයා එනවද?");
});

test("Pos_Fun_0023: Long paragraph", async ({ page }) => {
  await inputBox(page).fill("adha api trip eka plan kalaa. morning 8.00 AM ta pitath venna oone. ehenam bag tika ready karaganna. Kandy gihillaa lunch gaena hithamu, passe nuvara Eliye yanna puluvan. weather eka hodhayi nam photos ganna puluvan, naeththam cafe ekee poddak imu. fuel cost eka LKR 7000 vath venna puluvan. api fruits ganna balamu, saha water bottles 3k vithara ganna ooni. yanna kalin Google Maps eken route eka check karala, parking place ehema hoyamu.");
  await waitForOutput(page);
  await expect(sinhalaOut(page)).toHaveText("අද අපි trip එක plan කලා. morning 8.00 AM ට පිටත් වෙන්න ඕනෙ. එහෙනම් bag ටික ready කරගන්න. Kandy ගිහිල්ලා lunch ගැන හිතමු, පස්සෙ නුවර එලියෙ යන්න පුලුවන්. weather එක හොදයි නම් photos ගන්න පුලුවන්, නැත්තම් cafe එකේ පොඩ්ඩක් ඉමු. fuel cost එක LKR 7000 වත් වෙන්න පුලුවන්. අපි fruits ගන්න බලමු, සහ water bottles 3ක් විතර ගන්න ඕනි. යන්න කලින් Google Maps එකෙන් route එක check කරල, parking place එහෙම හොයමු.");
});

test("Pos_UI_0001: Output clears when input cleared", async ({ page }) => {
  await inputBox(page).fill("mama dhaen vaeda karanavaa.");
  await waitForOutput(page);

  // Now clear input
  await inputBox(page).fill("");

  // Output should be empty (or cleared)
  await expect
    .poll(async () => ((await sinhalaOut(page).textContent()) || "").trim(), { timeout: 15000 })
    .toBe("");
});


test("Neg_Fun_0001: Joined words without spaces (should NOT match cleaned sentence)", async ({ page }) => {
  await inputBox(page).fill("mamagedharayanavaaoyaaennavada");
  await waitForOutput(page);

  const cleanExpected = "මම ගෙදර යනවා ඔය එනවද";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0002: Heavy spelling distortion (should NOT match cleaned sentence)", async ({ page }) => {
  await inputBox(page).fill("mta bath one api heta gedr yamu");
  await waitForOutput(page);

  const cleanExpected = "මට බත් ඕන අපි හෙට ගෙදර යමු ";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0003: Repeated characters stress (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("aneeeee mataa poddakk help karannaaaa puluvandha?");
  await waitForOutput(page);

  const cleanExpected = "අන මට පොඩ්ඩක් help කරන්න පුලුවන්ද?";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0004: Punctuation overload (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("oyaa enawada??? mata dan kiyanna!!!");
  await waitForOutput(page);

  const cleanExpected = "ඔයා එනවද? මට දැන කියන්න!";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0005: Numbers inside words (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("mama adha 2ta gedhara yanna hadhanne oyaa 4ta enawada?");
  await waitForOutput(page);

  const cleanExpected = "මම අද 2ට ගෙදර යන්න හදන්නෙ. ඔය 4ට එනවද?";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0006: Irregular spacing (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("mama    adha      gedhara     innee");
  await waitForOutput(page);

  const cleanExpected = "මම අද ගෙදර ඉන්නේ";
  const actual = (await sinhalaOut(page).textContent()) || "";
  // Compare raw text to ensure multiple spaces are detected (Playwright's toHaveText normalizes whitespace)
  expect(actual).not.toBe(cleanExpected);
});

test("Neg_Fun_0007: Random capitalization (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("MaMa ADha GeDhArA YaNnAvA");
  await waitForOutput(page);

  const cleanExpected = "මම අද ගෙදර යනව";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0008: English sentence inserted (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("mata adha class yanna Please confirm the schedule. oyaa enawada?");
  await waitForOutput(page);

  const cleanExpected = "මට අද class යන්න Please confirm the schedule. ඔය එනවද?";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0009: Long messy paragraph (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("adha api trip eka plan kala... morning 7.30 AM depart wenna one.\nKandy gihilla passe Nuwara Eliya yanna hithamu!!!\nfuel cost Rs. 5343 wenna puluvan   api passe   balamu");
  await waitForOutput(page);

  const cleanExpected = "අද අපි trip එක plan කල. morning 7.30 AM depart වෙන්න ඕනෙ.\nKandy ගිහිල්ල පස්සෙ නුවර එලිය යන්න හිතමු!\nfuel cost Rs. 5343 වෙන්න පුලුවන්. අපි පස්සෙ බලමු.";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});

test("Neg_Fun_0010: Ambiguous negation (should NOT match clean Sinhala)", async ({ page }) => {
  await inputBox(page).fill("mata baya nae naththam mata baya hithenawada?");
  await waitForOutput(page);

  const cleanExpected = "මට බය නෑ නැත්නම මට බය හිතෙනවද ?";
  await expect(sinhalaOut(page)).not.toHaveText(cleanExpected);
});