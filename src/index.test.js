// import moment from 'moment'
import format, { formatDate } from './'
import sample from '../report.sample.json'

const date = '2020-06-11T19:35:58.827Z'

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

describe.only('format', () => {
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

  test('return formatted object', () => {
    const report = format(sample)
    expect(report).toMatchSnapshot()
  })

  test('return formatted JSON', () => {
    const report = format(sample, true)
    expect(report).toMatchSnapshot()
  })
})
