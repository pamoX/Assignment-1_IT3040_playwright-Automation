const { test, expect } = require('@playwright/test');

test.describe('ITPM Assignment 1 - Singlish to Sinhala Automation', () => {

  const inputSelector = 'textarea[placeholder="Input Your Singlish Text Here."]';
  const outputSelector = 'div.flex-grow.bg-slate-50';

  // ===================================================================
  // 1. POSITIVE FUNCTIONAL TESTS (24)
  // ===================================================================

  const positiveTests = [ 
  { id: 'Pos_Fun_0001', input: 'mama iskole inne.', expected: 'මම ඉස්කොලෙ ඉන්නේ' },
  { id: 'Pos_Fun_0002', input: 'mama dhaen vaeda karanavaa.', expected: 'මම දැන් වැඩ කරනවා.' },
  { id: 'Pos_Fun_0003', input: 'mama iiyee Colombo giyaa.', expected: 'මම ඊයේ Colombo ගියා.' },
  { id: 'Pos_Fun_0004', input: 'mama iskole en naee.haebaeyi panthi enavaa.', expected: 'මම ඉස්කොලෙ එන් නෑ.හැබැයි පන්ති එනවා.' },
  { id: 'Pos_Fun_0005', input: 'oya gedhara gihin liyumak evanakan mQq balan innava', expected: 'ඔයා ගෙදර ගිහින් ලියුමක් එවනකන් මං බලන් ඉන්නවා' },
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
  { id: 'Pos_Fun_0017', input: 'mama liDHAta yanavaa.\noyath enavadha naanna yanna.', expected: 'මම ලිඳට යනවා.\nඔයත් එනවද නාන්න යන්න.' },
  { id: 'Pos_Fun_0018', input: 'kiri liter 1k ganna\n', expected: 'කිරි liter 1 ක් ගන්න\n' },
  { id: 'Pos_Fun_0019', input: 'google eken heta enakota photo tika download karagena enna puluvandha?', expected: 'google එකෙන් හෙට එනකොට photo ටික download කරගෙන එන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0020', input: 'salli dhiilaa aragena varen.', expected: 'සල්ලි දීලා අරගෙන වරෙන්.' },
  { id: 'Pos_Fun_0021', input: 'oyata ATM ekata gihn salli aragena enna puluvadha?', expected: 'ඔයට ATM එකට ගිහ්න් සල්ලි අරගෙන එන්න පුලුවද?' },
  { id: 'Pos_Fun_0022', input: 'oyaata heta call ekak dhenna puluvandha?', expected: 'ඔයාට හෙට call එකක් දෙන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0023', input: 'parisaraya yanu apee jivithayee anivaarya aQQgayaki.minisaa svaBhaavaDharmaya samaGA badhDha vii sitiyadha, varthamaanayee sidhuvana vinaashayan barapathaLaya.vana vinaashaya, gQQgaa dhuuShaNaya saha plaastik Bhaavithaya nisaa pRUThiviyee samathulithathaavaya biDHA vaetii aetha. apa anaagatha parapura udhesaa pirisidhu vaathaya saha jalaya sahitha parisarayak ithiri kalayuthuya. kudaa hoo paeLayak situviima saha parisara hithakaamii purudhu aethi kara gaeniima apa saemagee uththariithara vagakiimaki.', expected: 'පරිසරය යනු අපේ ජිවිතයේ අනිවාර්ය අංගයකි.මිනිසා ස්වභාවධර්මය සමඟ බද්ධ වී සිටියද, වර්තමානයේ සිදුවන විනාශයන් බරපතළය.වන විනාශය, ගංගා දූෂණය සහ ප්ලාස්ටික් භාවිතය නිසා පෘථිවියේ සමතුලිතතාවය බිඳ වැටී ඇත. අප අනාගත පරපුර උදෙසා පිරිසිදු වාතය සහ ජලය සහිත පරිසරයක් ඉතිරි කලයුතුය. කුඩා හෝ පැළයක් සිටුවීම සහ පරිසර හිතකාමී පුරුදු ඇති කර ගැනීම අප සැමගේ උත්තරීතර වගකීමකි.' },
  { id: 'Pos_Fun_0024', input: 'poth kiyaviima minis manasa pooShaNaya karana hoDHAma purudhdhaki. pothpath magin apata nodhannaa lookayan gaena dhaenuma labaa gaeniimatath, chinthanaya puLul kiriimatath haekiyaava laebee. navakathaa, kaavYA saha vidhYaathmaka poth kiyaviimen BhaaShaa NYAaNaya dha varDhanaya vee. kaaryAbahula jivithaya thuLa pothak kiyaviimata kaalaya ven kiriima, maanasika sahanaya salasana atharama, budhDhimath samaajayak godanaegiimata dha vishaala rukulak labaa dheyi.', expected: 'පොත් කියවීම මිනිස් මනස පෝෂණය කරන හොඳම පුරුද්දකි. පොත්පත් මගින් අපට නොදන්නා ලෝකයන් ගැන දැනුම ලබා ගැනීමටත්, චින්තනය පුළුල් කිරීමටත් හැකියාව ලැබේ. නවකතා, කාව්‍ය සහ විද්‍යාත්මක පොත් කියවීමෙන් භාෂා ඤාණය ද වර්ධනය වේ. කාර්යබහුල ජිවිතය තුළ පොතක් කියවීමට කාලය වෙන් කිරීම, මානසික සහනය සලසන අතරම, බුද්ධිමත් සමාජයක් ගොඩනැගීමට ද විශාල රුකුලක් ලබා දෙයි.' },
  ];

  test.beforeEach(async ({ page }) => {
    // Increase test timeout
    test.setTimeout(60000);

    await page.goto('https://www.swifttranslator.com/', {
      waitUntil: 'domcontentloaded',
    });

    // Wait for input/output to be visible
    await page.waitForSelector(inputSelector, { state: 'visible', timeout: 10000 });
    await page.waitForSelector(outputSelector, { state: 'visible', timeout: 10000 });
  });

  positiveTests.forEach(data => {
    test(data.id, async ({ page }) => {
      const singlishInput = page.locator(inputSelector);
      const sinhalaOutput = page.locator(outputSelector);

      // Clear any previous input
      await singlishInput.fill('');

      // Type input safely (char by char)
      await singlishInput.type(data.input, { delay: 20 });

      // Wait for live conversion
      await page.waitForTimeout(500);

      // Assert the output contains expected Sinhala text
      await expect(sinhalaOutput).toContainText(data.expected, { timeout: 5000 });
    });
  });
});


  // ===========================================================================
  // 2. NEGATIVE FUNCTIONAL TESTS (EXPECTED FAILURES)
  // ===========================================================================

  const negativeTests = [
    { id: "Neg_Fun_0001", input: "thaaththaakadeetagiyaa", expected: "තාත්තාකඩේටගියා" },
    { id: "Neg_Fun_0002", input: "mama @ ragapaanna # yanavaa", expected: "මම @ රගපාන්න # යනවා" },
    { id: "Neg_Fun_0003", input: "adoo machan supiri eka full ela", expected: "අඩෝ මචන් සුපිරි එක full එල" },
    { id: "Neg_Fun_0004", input: "aBA gediyak kadalaa dhennadha?", expected: "aBA ගෙඩියක් කඩලා දෙන්නද?" },
    { id: "Neg_Fun_0005", input: "maNYANYAokkaa kanna haemooma enna..", expected: "මඤඤඔක්කා කන්න හැමෝම  එන්න.." },
    { id: "Neg_Fun_0006", input: "machaQQ                 mama            heta        enavaa.", expected: "මචං                 මම            හෙට        එනවා." },
    { id: "Neg_Fun_0007", input: "MacBook eka aragena enna.", expected: "මcඹෝක් එක අරගෙන එන්න." },
    { id: "Neg_Fun_0008", input: "Press ctrl + C , iitapassee paste karanna.", expected: "Press cට්‍රල් + C , ඊටපස්සේ paste කරන්න." },
    { id: "Neg_Fun_0009", input: "https://courseweb.sliit.lk/my/", expected: "හ්ට්ට්ප්ස්://cඔඋර්සෙwඑබ්.ස්ලීට්.ල්ක්/my/" },
    { id: "Neg_Fun_0010", input: "ohugee waasanaawata ohuma payin gaehuwaa.", expected: "ඔහුගේ wආසනාwඅට ඔහුම පයින් ගැහුwආ." },
 ];

  for (const data of negativeTests) {
    test(data.id, async ({ page }) => {
      test.fail();

      const { singlishInput, sinhalaOutput } = getInputs(page);

      await singlishInput.fill('');
      await singlishInput.type(data.input, { delay: 20 });
      await expect(sinhalaOutput).toHaveText(data.expected, { timeout: 5000 });
    });
  }
  // ===================================================================
// 3. POSITIVE UI TEST
// ===================================================================

test('Pos_UI_0001', async ({ page }) => {
  const singlishInput = page.locator(inputSelector);
  const sinhalaOutput = page.locator(outputSelector);

  // Type some input first
  await singlishInput.fill('');
  await singlishInput.type('heta maQQ oyaalagee gedhara enavaa', { delay: 20 });

  // Wait briefly for live conversion
  await page.waitForTimeout(500);

  // Verify output is not empty initially
  await expect(sinhalaOutput).not.toHaveText('', { timeout: 5000 });

  // Clear the input field
  await singlishInput.fill('');

  // Verify Sinhala output is cleared immediately
  await expect(sinhalaOutput).toHaveText('', { timeout: 5000 });
});
