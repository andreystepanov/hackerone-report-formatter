// import moment from 'moment'
import format, { normalize, formatDate } from './'
import pick from 'lodash/pick'
import sample from '../report.sample.json'
import sampleWithAttachments from '../report-with-attachments.sample.json'

const date = '2020-06-11T19:35:58.827Z'
const metadataKeys = [
  'id',
  'title',
  'state',
  'substate',
  'hacker.handle',
  'hacker.verified',
  'hacker.twitter_handle',
  'hacker.picture_url',
  'program.handle',
  'program.name',
  'program.twitter_handle',
  'program.picture_url',
  'disclosed_at',
  'created_at',
  'vote_count',
  'platform',
  'visibility',
  'cve_ids',
  'weakness.id',
  'severity.rating',
  'severity.score',
  'award.bounty_amount',
  'award.bonus_amount',
  'award.awarded_to',
]

describe('formatDate', () => {
  test('defined', () => {
    expect(formatDate).toBeDefined()
  })

  test('returns null', () => {
    expect(formatDate('invalid date')).toBeNull()
  })

  test('returns valid date (unix)', () => {
    expect(formatDate(date, true)).toMatchSnapshot()
  })

  test('returns valid date (string)', () => {
    expect(formatDate(date)).toEqual(date)
  })
})

describe('normalize', () => {
  test('defined', () => {
    expect(normalize).toBeDefined()
  })

  test('returns normalized list of reports', () => {
    const report = format(sample, { shortLinks: true })
    const reports = [report, { ...report, id: report.id + 1 }].map(rep =>
      pick(rep, metadataKeys),
    )
    const data = normalize(reports)

    // console.log(JSON.stringify(data, undefined, 3))
    expect(data).toMatchSnapshot()
  })

  test('returns normalized report', () => {
    const report = format(sampleWithAttachments, {
      shortLinks: true,
      noAttachmentUrls: true,
    })
    const data = normalize(report)

    // console.log(JSON.stringify(data.entities.attachments, undefined, 3))
    expect(data).toMatchSnapshot()
  })
})

describe('format', () => {
  test('returns null', () => {
    const report = format(null)
    expect(report).toBeNull()
  })

  test('throws an exception', () => {
    try {
      format({})
    } catch (e) {
      expect(e).toMatchSnapshot()
    }
  })

  test('runs JSON.parse on data', () => {
    const report = format(JSON.stringify(sample))
    expect(report).toMatchSnapshot()
  })

  test('return formatted object', () => {
    const report = format(sample)
    expect(report).toMatchSnapshot()
  })

  test('return formatted JSON', () => {
    const report = format(sample, { string: true })
    expect(report).toMatchSnapshot()
  })

  test('return normalized object', () => {
    const report = format(sample, { normalize: true })
    expect(report).toMatchSnapshot()
  })

  test('ignores long avatar links', () => {
    const report = format({
      ...sample,
      reporter: {
        ...sample.reporter,
        profile_picture_urls: {
          medium: 'https://hackerone.com/rails/active_storage/123',
        },
      },
    })

    // console.log(report.hacker)
    expect(report).toMatchSnapshot()
  })
})
