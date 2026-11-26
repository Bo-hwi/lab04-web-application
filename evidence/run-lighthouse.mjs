import lighthouse from '../.repairs/tooling/node_modules/lighthouse/core/index.js'
import desktopConfig from '../.repairs/tooling/node_modules/lighthouse/core/config/desktop-config.js'
import { chromium } from '../.repairs/tooling/node_modules/playwright-core/index.mjs'
import { writeFileSync } from 'node:fs'

const [branch = 'hw3', url = 'http://127.0.0.1:4173/gallery', mode = 'mobile'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true, args: ['--remote-debugging-port=9321'] })
try {
  const result = await lighthouse(url, { port: 9321, output: ['html', 'json'], onlyCategories: ['performance', 'accessibility'], logLevel: 'error' }, mode === 'desktop' ? desktopConfig : undefined)
  for (const [index, extension] of ['html', 'json'].entries()) writeFileSync(`evidence/lighthouse-${branch}-${mode}-rerun.report.${extension}`, result.report[index])
  console.log(JSON.stringify({ formFactor: result.lhr.configSettings.formFactor, performance: result.lhr.categories.performance.score, accessibility: result.lhr.categories.accessibility.score }))
} finally {
  await browser.close()
}
