import moment from 'moment'
import { pick, omit, snakeCase } from 'lodash'

export const formatDate = (date, unix = false) => {
  const momentDate = date ? moment(date, true) : null

  if (momentDate && momentDate.isValid()) {
    const utcDate = momentDate.utc()

    if (unix) {
      return utcDate.valueOf()
    }

    return utcDate.format('YYYY-MM-DDTHH:mm:ss.SSS\\Z')
  }

  return null
}

const getAvatar = (pictures = null) => {
  if (!pictures) {
    return null
  }

  const url =
    typeof pictures === 'object' ? pictures.medium || pictures.small : pictures

  if (
    url.includes('rails/active_storage') ||
    url.includes('assets/avatars/default-') ||
    url.length > 500
  ) {
    return null
  }

  return url
}

const format = (data, stringify = false) => {
  if (!data) {
    return null
  }

  const {
    id,
    reporter,
    team: {
      handle,
      offers_bounties,
      default_currency,
      profile_picture_urls: program_pictures,
      only_cleared_hackers: only_verified_hackers = false,
      award_miles = false,
      profile,
      ...team
    },
    vote_count,
    bounty_amount,
    weakness = null,
    disclosed_at,
    severity = null,
    severity_rating,
    title,
    activities,
    created_at,
    bug_reporter_agreed_on_going_public_at: h_agreed_at,
    team_agreed_on_going_public_at: p_agreed_at,
    attachments = [],
    original_report_id = null,
    original_report_url = null,
    structured_scope: asset,
    vulnerability_information,
    state,
    substate,
    summaries,
    visibility,
    cve_ids,
  } = typeof data === 'string' ? JSON.parse(data) : data

  const author_type =
    severity && severity.author_type ? severity.author_type : null
  const { cleared: verified, profile_picture_urls: hacker_pictures } =
    reporter || {}
  const username = reporter ? reporter.username : handle

  const awarded_to = []
  let isIBB = false

  const hacker_picture_url = getAvatar(hacker_pictures)
  const program_picture_url = getAvatar(program_pictures)

  const programJson = {
    id: team.id,
    handle,
    offers_bounties,
    profile_picture_url: program_picture_url,
    award_miles,
    only_verified_hackers,
    profile,
  }

  const json = {
    id,
    title,
    state: state.toLowerCase(),
    substate,
    platform: 'hackerone',
    hacker: reporter
      ? {
          verified,
          handle: username,
          profile_picture_url: hacker_picture_url,
        }
      : null,
    program: programJson,
    original_report_id,
    original_report_url,
    vulnerable_asset: asset
      ? {
          type: asset.asset_type.toLowerCase(),
          identifier: asset.asset_identifier,
          max_severity: asset.max_severity,
        }
      : null,
    weakness,
    severity: severity
      ? {
          set_by_team: author_type && author_type.toLowerCase() === 'team',
          ...omit(severity, 'author_type'),
        }
      : null,
    award: null,
    vote_count,
    cve_ids: cve_ids,
    visibility,
    hacker_agreed_on_going_public_at: formatDate(h_agreed_at, true),
    platform_agreed_on_going_public_at: formatDate(p_agreed_at),
    created_at: formatDate(created_at, true),
    disclosed_at: formatDate(disclosed_at, true),
    // first_synced_at: moment().valueOf(),
    // last_synced_at: moment().valueOf(),
    vulnerability_information: vulnerability_information || null,
    summaries: summaries
      .filter(({ id, content }) => id && content)
      .map(({ id, content, category }) => ({
        id,
        by: category == 'team' ? 'program' : 'hacker',
        content,
      })),
    // .reduce((result, summary) => {
    //   return {
    //     ...result,
    //     [summary.by]: summary.content,
    //   }
    // }, {}),
    attachments: attachments.map(
      ({ file_name: filename, expiring_url: url, ...att }) => ({
        ...att,
        filename,
        url,
      }),
    ),
    timeline: activities.map(item => {
      const {
        created_at,
        updated_at,
        id,
        type,
        message,
        actor: actr,
        bounty_amount,
        bounty_currency: currency,
        bonus_amount,
        automated_response,
        collaborator,
        additional_data,
        first_to_agree,
        team_handle,
        email,
        attachments,
        reporter,
        cve_ids,
      } = item
      const { profile_picture_urls, ...actor } = actr || {}
      const action = snakeCase(type.split('::')[1])

      const activity = {
        id,
        type: snakeCase(action),
        message: message || null,
        attachments,
        automated_response,
        updated_at: formatDate(updated_at, true),
        created_at: formatDate(created_at, true),
        actor: actor
          ? {
              handle: actor.username || team_handle,
            }
          : null,
        // item: actor,
        // raw: item,
      }

      if (actor.cleared) {
        activity.actor.verified = true
      }

      const actorAvatar = getAvatar(profile_picture_urls)

      if (actorAvatar) {
        activity.actor.profile_picture_url = actorAvatar
      }

      if (actor.hackerone_triager) {
        activity.actor.platform_triager = true
      }

      if (actor.hackerone_employee) {
        activity.actor.platform_employee = true
      }

      const addData = data => {
        activity.additional_data = {
          ...(activity.additional_data || null),
          ...data,
        }
      }

      if (actor && actor.ibb) {
        activity.actor.ibb = true
        isIBB = true
      }

      if (reporter) {
        // activity.hacker = reporter
      }

      if (!automated_response) {
        delete activity.automated_response
      }

      if (!Array.isArray(attachments)) {
        delete activity.attachments
      }

      if (!message) {
        delete activity.message
      }

      if (automated_response) {
        activity.automated_response = true
      }

      if (additional_data) {
        const extraFields = Object.keys(additional_data).filter(
          field => /^(old|new|added|removed)_/.test(field) === false,
        )

        if (extraFields.length > 0) {
          addData(pick(additional_data, extraFields))
        }
      }

      if (email) {
        addData({ invited_hacker: email })
      }

      if (action && action.includes('agreed_on_going_public')) {
        addData({ first_to_agree: first_to_agree || false })
      }

      if (cve_ids) {
        addData({ cve_ids })
      }

      const changes = getActionChanges(item)

      if (changes) {
        activity.changes = changes
      }

      if (bounty_amount || bonus_amount) {
        const bounty = Number(bounty_amount || 0)
        const bonus = Number(bonus_amount || 0)

        activity.award = {
          bounty_amount: bounty,
          bonus_amount: bonus,
          total_amount: bounty + bonus,
          currency,
          awarded_to: collaborator ? collaborator.username : null,
        }

        awarded_to.push(activity.award)
      }

      return activity
    }),
  }

  if (awarded_to.length > 0) {
    const getSum = (list, key) => {
      return list.reduce((sum, item) => {
        if (item[key] >= 0) {
          sum += item[key]
        }

        return sum
      }, 0)
    }
    const countBounties = awards => {
      let bounties = awards.reduce((bounties, bounty) => {
        const hacker = bounty.awarded_to

        if (!bounties[hacker]) {
          bounties[hacker] = {}
        }

        for (const [param, value] of Object.entries(bounty)) {
          if (!(param && param.includes('_amount'))) {
            bounties[hacker][param] = value

            continue
          }

          if (!bounties[hacker][param]) {
            bounties[hacker][param] = 0
          }

          bounties[hacker][param] += value
        }

        return bounties
      }, {})

      bounties = Object.values(bounties)

      return {
        bounty_amount: getSum(bounties, 'bounty_amount'),
        bonus_amount: getSum(bounties, 'bonus_amount'),
        total_amount: getSum(bounties, 'total_amount'),
        currency: default_currency,
        awarded_to: bounties,
      }
    }

    json.award = countBounties(awarded_to)
  }

  if (isIBB) {
    json.program.ibb = true
  }

  return stringify ? JSON.stringify(json) : json
}

const getActionChanges = ({ additional_data, ...action }) => {
  const data = { ...additional_data, ...action }
  const fields = Object.keys(data).filter(field =>
    /^(old|new|added|removed)_/.test(field),
  )
  const changes = {}

  fields.forEach(field => {
    const [actn, key] = field.split('_')
    const actionType = actn.replace('added', 'new').replace('removed', 'old')

    changes[key] = {
      ...(changes[key] || null),
      [actionType]: data[field],
    }
  })

  for (const param in changes) {
    if (param == 'weaknesses') {
      const {
        old: [old = null],
        new: [newValue = null],
      } = changes[param]

      changes.weakness = {
        old,
        new: newValue,
      }

      delete changes[param]
    }
  }

  return Object.keys(changes).length > 0 ? changes : null
}

export default format
