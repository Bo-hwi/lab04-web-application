import { chromium } from '../.repairs/tooling/node_modules/playwright-core/index.mjs'
import { writeFileSync } from 'node:fs'

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
const results = []
for (const port of [4173, 4174]) {
  for (const width of [320, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 667 } })
    await page.goto(`http://127.0.0.1:${port}/`)
    await page.waitForURL('**/gallery')
    await page.locator('img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())))
    const gallery = await page.evaluate(() => ({ viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, imagesLoaded: [...document.images].every((img) => img.naturalWidth > 0) }))
    await page.getByRole('button', { name: 'View Mountain Landscape' }).click()
    const dialog = await page.locator('dialog').evaluate((dialog) => {
      const rect = dialog.getBoundingClientRect()
      const img = dialog.querySelector('img').getBoundingClientRect()
      return { left: rect.left, right: rect.right, clientWidth: dialog.clientWidth, scrollWidth: dialog.scrollWidth, imageLeft: img.left, imageRight: img.right }
    })
    await page.screenshot({ path: `evidence/gallery-${port}-${width}.png` })
    await page.keyboard.press('Escape')
    const focusRestored = await page.getByRole('button', { name: 'View Mountain Landscape' }).evaluate((button) => button === document.activeElement)
    if (gallery.scrollWidth > width || !gallery.imagesLoaded || dialog.left < 0 || dialog.right > width || dialog.scrollWidth > dialog.clientWidth || !focusRestored) throw new Error(JSON.stringify({ port, width, gallery, dialog, focusRestored }))
    results.push({ port, width, gallery, dialog, focusRestored })
    await page.close()
  }
}
writeFileSync('evidence/responsive.json', JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
await browser.close()
