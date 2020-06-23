"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalize;

var _normalizr = require("normalizr");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var attachment = new _normalizr.schema.Entity('attachments');
var award = new _normalizr.schema.Entity('awards');
var summary = new _normalizr.schema.Entity('summaries', undefined, {
  idAttribute: 'by'
});
var actor = new _normalizr.schema.Entity('actors', undefined, {
  idAttribute: 'handle',
  mergeStrategy: (entityA, entityB) => _objectSpread(_objectSpread({}, entityA), entityB)
});
var activity = new _normalizr.schema.Entity('activities', {
  actor,
  award,
  attachments: [attachment]
});
var report = new _normalizr.schema.Entity('reports', {
  hacker: actor,
  program: actor,
  award: {
    awarded_to: [award]
  },
  summaries: [summary],
  attachments: [attachment],
  activities: [activity]
});

function normalize(data) {
  var dataSchema = Array.isArray(data) ? [report] : report;
  return (0, _normalizr.normalize)(data, dataSchema);
}