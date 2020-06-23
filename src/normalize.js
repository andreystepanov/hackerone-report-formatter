import { schema, normalize as norm } from 'normalizr'

const attachment = new schema.Entity('attachments')
const award = new schema.Entity('awards')
const summary = new schema.Entity('summaries', undefined, {
  idAttribute: 'by',
})
const actor = new schema.Entity('actors', undefined, {
  idAttribute: 'handle',
  mergeStrategy: (entityA, entityB) => ({
    ...entityA,
    ...entityB,
  }),
})
const activity = new schema.Entity('activities', {
  actor,
  award,
  attachments: [attachment],
})

const report = new schema.Entity('reports', {
  hacker: actor,
  program: actor,
  award: {
    awarded_to: [award],
  },
  summaries: [summary],
  attachments: [attachment],
  activities: [activity],
})

export default function normalize(data) {
  const dataSchema = Array.isArray(data) ? [report] : report
  return norm(data, dataSchema)
}
