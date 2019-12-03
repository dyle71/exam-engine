import { createOfflineExam } from '@digabi/exam-engine-rendering'
import { resolveExam } from '@digabi/mexamples'
import { Page } from 'puppeteer'
import tmp from 'tmp-promise'
import { initPuppeteer } from './puppeteerUtils'

describe('testOfflineGeneration.ts - Offline version generation', () => {
  const createPage = initPuppeteer()
  let page: Page
  let examHtmlFile: string
  let attachmentsHtmlFile: string

  beforeAll(async () => {
    const tmpdir = await tmp.dir().then(r => r.path)
    ;[examHtmlFile, attachmentsHtmlFile] = await createOfflineExam(resolveExam('SC/SC.xml'), tmpdir)
    page = await createPage()
  })

  it('renders exam page without errors', async () => {
    await assertRendersWithoutErrors(examHtmlFile)
  })

  it('renders attachment page without errors', async () => {
    await assertRendersWithoutErrors(attachmentsHtmlFile)
  })

  async function assertRendersWithoutErrors(filename: string) {
    const requestErrors: string[] = []
    const pageErrors: Error[] = []

    page.on('requestfailed', req => {
      const errorText = req.failure()!.errorText
      if (errorText !== 'net::ERR_ABORTED') {
        requestErrors.push(req.url())
      }
    })
    page.on('pageerror', err => pageErrors.push(err))

    await page.goto('file://' + filename, { waitUntil: 'networkidle0' })
    expect(requestErrors).toEqual([])
    expect(pageErrors).toEqual([])
  }
})
