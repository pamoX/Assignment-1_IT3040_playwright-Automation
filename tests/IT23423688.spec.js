const { test, expect } = require('@playwright/test');

test.describe('ITPM Assignment 1 - Singlish to Sinhala Automation', () => {

  const inputSelector = 'textarea[placeholder="Input Your Singlish Text Here."]';
  const outputSelector = 'div.flex-grow.bg-slate-50';

  // ======================================================
  // COMMON SETUP
  // ======================================================
  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000); // extra safety

    await page.goto('https://www.swifttranslator.com/', {
      waitUntil: 'domcontentloaded',
    });

    await page.waitForSelector(inputSelector, { timeout: 15000 });
    await page.waitForSelector(outputSelector, { timeout: 15000 });
  });

  // ===================================================================
  // 1. POSITIVE FUNCTIONAL TESTS (24)
  // ===================================================================

  const positiveTests = [ 
  { id: 'Pos_Fun_0001', input: 'mama iskole inne.', expected: 'මම ඉස්කොලෙ ඉන්නේ' },
  { id: 'Pos_Fun_0002', input: 'mama dhaen vaeda karanavaa.', expected: 'මම දැන් වැඩ කරනවා.' },
  { id: 'Pos_Fun_0003', input: 'mama iiyee Colombo giyaa.', expected: 'මම ඊයේ Colombo ගියා.' },
  { id: 'Pos_Fun_0004', input: 'mama iskole en naee.haebaeyi panthi enavaa.', expected: 'මම ඉස්කොලෙ එන් නෑ.හැබැයි පන්ති එනවා.' },
  { id: 'Pos_Fun_0005', input: 'oyaa gedhara gihin liyumak evanakan maQQ balan innavaa ', expected: 'ඔයා ගෙදර ගිහින් ලියුමක් එවනකන් මං බලන් ඉන්නවා' },
  { id: 'Pos_Fun_0006', input: 'poddak kathaa karanna puLuvandha?', expected: 'පොඩ්ඩක් කතා කරන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_0007', input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?', expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_0008', input: 'issarahata yanna.', expected: 'ඉස්සරහට යන්න.' },
  { id: 'Pos_Fun_0009', input: 'mata eeka karanna baee.', expected: 'මට ඒක කරන්න බෑ.' },
  { id: 'Pos_Fun_0010', input: 'api iridhaa polata yamu.', expected: 'අපි ඉරිදා පොලට යමු.' },
  { id: 'Pos_Fun_0011', input: 'hari hari lassanayi', expected: 'හරි හරි ලස්සනයි' },
  { id: 'Pos_Fun_0012', input: 'adoo patta !', expected: 'අඩෝ පට්ට !' },
  { id: 'Pos_Fun_0013', input: 'mama office yanna kalin email ekak evannam.', expected: 'මම office යන්න කලින් email එකක් එවන්නම්.' },
  { id: 'Pos_Fun_0014', input: 'meeting eka 7.30 AM', expected: 'meeting එක 7.30 AM' },
  { id: 'Pos_Fun_0015', input: 'heta paasalata paeminena vita rs.500 k raegena enna.', expected: 'හෙට පාසලට පැමිනෙන විට rs.500 ක් රැගෙන එන්න.' },
  { id: 'Pos_Fun_0016', input: 'hirunige wedding eka 2026-01-04 thiyenavaa.', expected: 'හිරුනිගෙ wedding එක 2026-01-04 තියෙනවා.' },
  { id: 'Pos_Fun_0017', input: 'wow, eeka lassanayi.', expected: 'wow, ඒක ලස්සනයි.' },
  { id: 'Pos_Fun_0018', input: 'kiri liter 1 k ganna', expected: 'කිරි liter 1 ක් ගන්න' },
  { id: 'Pos_Fun_0019', input: 'google eken heta enakota photo tika download karagena enna puluvandha?', expected: 'google එකෙන් හෙට එනකොට photo ටික download කරගෙන එන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0020', input: 'salli dhiilaa aragena varen.', expected: 'සල්ලි දීලා අරගෙන වරෙන්.' },
  { id: 'Pos_Fun_0021', input: 'oyaata ATM ekata gihin salli aragena enna puluvandha?', expected: 'ඔයාට ATM එකට ගිහින් සල්ලි අරගෙන එන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0022', input: 'oyaata heta call ekak dhenna puluvandha?', expected: 'ඔයාට හෙට call එකක් දෙන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0023', input: 'parisaraya yanu apee jivithayee anivaarya aQQgayaki.minisaa svaBhaavaDharmaya samaGA badhDha vii sitiyadha, varthamaanayee sidhuvana vinaashayan barapathaLaya.vana vinaashaya, gQQgaa dhuuShaNaya saha plaastik Bhaavithaya nisaa pRUThiviyee samathulithathaavaya biDHA vaetii aetha. apa anaagatha parapura udhesaa pirisidhu vaathaya saha jalaya sahitha parisarayak ithiri kalayuthuya. kudaa hoo paeLayak situviima saha parisara hithakaamii purudhu aethi kara gaeniima apa saemagee uththariithara vagakiimaki.', expected: 'පරිසරය යනු අපේ ජිවිතයේ අනිවාර්ය අංගයකි.මිනිසා ස්වභාවධර්මය සමඟ බද්ධ වී සිටියද, වර්තමානයේ සිදුවන විනාශයන් බරපතළය.වන විනාශය, ගංගා දූෂණය සහ ප්ලාස්ටික් භාවිතය නිසා පෘථිවියේ සමතුලිතතාවය බිඳ වැටී ඇත. අප අනාගත පරපුර උදෙසා පිරිසිදු වාතය සහ ජලය සහිත පරිසරයක් ඉතිරි කලයුතුය. කුඩා හෝ පැළයක් සිටුවීම සහ පරිසර හිතකාමී පුරුදු ඇති කර ගැනීම අප සැමගේ උත්තරීතර වගකීමකි.' },
  { id: 'Pos_Fun_0024', input: 'poth kiyaviima minis manasa pooShaNaya karana hoDHAma purudhdhaki. pothpath magin apata nodhannaa lookayan gaena dhaenuma labaa gaeniimatath, chinthanaya puLul kiriimatath haekiyaava laebee. navakathaa, kaavYA saha vidhYaathmaka poth kiyaviimen BhaaShaa NYAaNaya dha varDhanaya vee. kaaryAbahula jivithaya thuLa pothak kiyaviimata kaalaya ven kiriima, maanasika sahanaya salasana atharama, budhDhimath samaajayak godanaegiimata dha vishaala rukulak labaa dheyi.', expected: 'පොත් කියවීම මිනිස් මනස පෝෂණය කරන හොඳම පුරුද්දකි. පොත්පත් මගින් අපට නොදන්නා ලෝකයන් ගැන දැනුම ලබා ගැනීමටත්, චින්තනය පුළුල් කිරීමටත් හැකියාව ලැබේ. නවකතා, කාව්‍ය සහ විද්‍යාත්මක පොත් කියවීමෙන් භාෂා ඤාණය ද වර්ධනය වේ. කාර්යබහුල ජිවිතය තුළ පොතක් කියවීමට කාලය වෙන් කිරීම, මානසික සහනය සලසන අතරම, බුද්ධිමත් සමාජයක් ගොඩනැගීමට ද විශාල රුකුලක් ලබා දෙයි.' },
  ];

  positiveTests.forEach(data => {
    test(data.id, async ({ page }) => {
      const input = page.locator(inputSelector);
      const output = page.locator(outputSelector);

      await input.fill(data.input); // ✅ FIX
      await expect(output).toContainText(data.expected, { timeout: 10000 });
    });
  });

  // ===========================================================================
  // 2. NEGATIVE FUNCTIONAL TESTS (EXPECTED FAILURES)
  // ===========================================================================

  const negativeTests = [
    { id: "Neg_Fun_0001", input: "thaaththaakadeetagiyaa", expected: "තාත්තා කඩේට ගියා" },
    { id: "Neg_Fun_0002", input: "mama @ ragapaanna # yanavaa", expected: "මම රගපාන්න යනවා" },
    { id: "Neg_Fun_0003", input: "adoo machan supiri eka full ela", expected: "අඩෝ මචන් සුපිරි එක එල" },
    { id: "Neg_Fun_0004", input: "aBA gediyak kadalaa dhennadha?", expected: "අඹ ගෙඩියක් කඩලා දෙන්නද?" },
    { id: "Neg_Fun_0005", input: "maNYANYAokkaa kanna haemooma enna..", expected: "මඤ්ඤොක්කා කන්න හැමෝම එන්න.." },
    { id: "Neg_Fun_0006", input: "machaQQ                 mama            heta        enavaa.", expected: "මචං මම හෙට එනවා." },
    { id: "Neg_Fun_0007", input: "MacBook eka aragena enna.", expected: "MacBook එක අරගෙන එන්න." },
    { id: "Neg_Fun_0008", input: "Press ctrl + C , iitapassee paste karanna.", expected: "Press ctrl + C , ඊටපස්සේ paste කරන්න." },
    { id: "Neg_Fun_0009", input: "https://courseweb.sliit.lk/my/", expected: "https://courseweb.sliit.lk/my/" },
    { id: "Neg_Fun_0010", input: "ohugee waasanaawata ohuma payin gaehuwaa.", expected: "ඔහුගේ වාසනාවට ඔහුම පයින් ගැහුවා." },
 ];

  negativeTests.forEach(data => {
    test(data.id, async ({ page }) => {
      const input = page.locator(inputSelector);
      const output = page.locator(outputSelector);

      await input.fill(data.input); // FIX

      // INTENTIONALLY WRONG → FAIL
      await expect(output).toHaveText(data.expected, { timeout: 8000 });
    });
  });
  // ===================================================================
// 3. POSITIVE UI TEST
// ===================================================================

  test('Pos_UI_01: Real-time output update (expected fail)', async ({ page }) => {
    const input = page.locator(inputSelector);
    const output = page.locator(outputSelector);

    await input.type('mama', { delay: 100 });

    // Intentionally wrong expectation
    await expect(output).toHaveText('මම');
  });

});
