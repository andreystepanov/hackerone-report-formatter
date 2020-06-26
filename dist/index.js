"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.formatDate = exports.normalize = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _normalize = _interopRequireDefault(require("./normalize"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var normalize = _normalize.default;
exports.normalize = normalize;

var formatDate = function formatDate(date) {
  var unix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var momentDate = date ? (0, _moment.default)(date, true) : null;

  if (momentDate && momentDate.isValid()) {
    var utcDate = momentDate.utc();

    if (unix) {
      return utcDate.valueOf();
    }

    return utcDate.format('YYYY-MM-DDTHH:mm:ss.SSS\\Z');
  }

  return null;
};

exports.formatDate = formatDate;

var getAvatar = function getAvatar() {
  var pictures = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var shortLinks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!pictures) {
    return null;
  }

  var url = typeof pictures === 'object' ? pictures.medium || pictures.small : pictures;

  if (url.includes('rails/active_storage') || url.includes('assets/avatars/default-') || url.length > 500) {
    return null;
  }

  return shortLinks ? url.split('variants')[1] : url;
};

var format = function format(data) {
  var {
    noAttachmentUrls = false,
    shortLinks = false,
    string = false,
    normalize = false
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!data) {
    return null;
  }

  var _ref = typeof data === 'string' ? JSON.parse(data) : data,
      {
    id,
    reporter,
    team: {
      handle,
      offers_bounties,
      default_currency,
      profile_picture_urls: program_pictures,
      only_cleared_hackers: only_verified_hackers = false,
      award_miles = false,
      profile
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
    cve_ids
  } = _ref,
      team = _objectWithoutProperties(_ref.team, ["handle", "offers_bounties", "default_currency", "profile_picture_urls", "only_cleared_hackers", "award_miles", "profile"]);

  var author_type = severity && severity.author_type ? severity.author_type : null;
  var {
    cleared: verified,
    profile_picture_urls: hacker_pictures
  } = reporter || {};
  var username = reporter ? reporter.username : handle;
  var awarded_to = [];
  var isIBB = false;
  var hacker_picture_url = getAvatar(hacker_pictures, shortLinks);
  var program_picture_url = getAvatar(program_pictures, shortLinks);

  var programJson = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
    id: team.id,
    handle,
    picture_url: program_picture_url
  }, offers_bounties && {
    offers_bounties
  }), award_miles && {
    award_miles
  }), only_verified_hackers && {
    only_verified_hackers
  }), profile);

  var json = {
    id,
    title,
    state: state.toLowerCase(),
    substate,
    platform: 'hackerone',
    hacker: reporter ? {
      verified,
      handle: username,
      picture_url: hacker_picture_url
    } : null,
    program: programJson,
    original_report_id,
    original_report_url,
    vulnerable_asset: asset ? {
      type: asset.asset_type.toLowerCase(),
      identifier: asset.asset_identifier,
      max_severity: asset.max_severity
    } : null,
    weakness,
    severity: severity ? _objectSpread({
      set_by_team: author_type && author_type.toLowerCase() === 'team'
    }, (0, _lodash.omit)(severity, 'author_type')) : null,
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
    summaries: summaries.filter((_ref2) => {
      var {
        id,
        content
      } = _ref2;
      return id && content;
    }).map((_ref3) => {
      var {
        id,
        content,
        category
      } = _ref3;
      return {
        id,
        by: category == 'team' ? 'program' : 'hacker',
        content
      };
    }),
    // .reduce((result, summary) => {
    //   return {
    //     ...result,
    //     [summary.by]: summary.content,
    //   }
    // }, {}),
    attachments: attachments.map((_ref4) => {
      var {
        file_name: filename,
        expiring_url: url
      } = _ref4,
          att = _objectWithoutProperties(_ref4, ["file_name", "expiring_url"]);

      return _objectSpread(_objectSpread({}, att), {}, {
        filename
      }, noAttachmentUrls === false && {
        url
      });
    }),
    activities: activities.map(item => {
      var {
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
        cve_ids
      } = item;

      var _ref5 = actr || {},
          {
        profile_picture_urls
      } = _ref5,
          actor = _objectWithoutProperties(_ref5, ["profile_picture_urls"]);

      var action = (0, _lodash.snakeCase)(type.split('::')[1]);
      var activity = {
        id,
        type: (0, _lodash.snakeCase)(action),
        message: message || null,
        attachments: attachments && attachments.map((_ref6) => {
          var {
            url
          } = _ref6,
              file = _objectWithoutProperties(_ref6, ["url"]);

          return _objectSpread(_objectSpread({}, file), noAttachmentUrls === false && {
            url
          });
        }),
        automated_response,
        updated_at: updated_at !== created_at ? formatDate(updated_at, true) : null,
        created_at: formatDate(created_at, true),
        actor: actor ? {
          handle: actor.username || team_handle
        } : null // item: actor,
        // raw: item,

      };

      if (!activity.updated_at) {
        delete activity.updated_at;
      }

      if (actor.cleared) {
        activity.actor.verified = true;
      }

      var actorAvatar = getAvatar(profile_picture_urls, shortLinks);

      if (actorAvatar) {
        activity.actor.picture_url = actorAvatar;
      }

      if (actor.hackerone_triager) {
        activity.actor.platform_triager = true;
      }

      if (actor.hackerone_employee) {
        activity.actor.platform_employee = true;
      }

      var addData = data => {
        activity.additional_data = _objectSpread(_objectSpread({}, activity.additional_data || null), data);
      };

      if (actor && actor.ibb) {
        activity.actor.ibb = true;
        isIBB = true;
      }

      if (reporter) {// activity.hacker = reporter
      }

      if (!automated_response) {
        delete activity.automated_response;
      }

      if (!Array.isArray(attachments)) {
        delete activity.attachments;
      }

      if (!message) {
        delete activity.message;
      }

      if (automated_response) {
        activity.automated_response = true;
      }

      if (additional_data) {
        var extraFields = Object.keys(additional_data).filter(field => /^(old|new|added|removed)_/.test(field) === false);

        if (extraFields.length > 0) {
          addData((0, _lodash.pick)(additional_data, extraFields));
        }
      }

      if (email) {
        addData({
          invited_hacker: email
        });
      }

      if (action && action.includes('agreed_on_going_public')) {
        addData({
          first_to_agree: first_to_agree || false
        });
      }

      if (cve_ids) {
        addData({
          cve_ids
        });
      }

      var changes = getActionChanges(item);

      if (changes) {
        activity.changes = changes;
      }

      if (bounty_amount || bonus_amount) {
        var bounty = Number(bounty_amount || 0);
        var bonus = Number(bonus_amount || 0);
        activity.award = {
          id,
          bounty_amount: bounty,
          bonus_amount: bonus,
          total_amount: bounty + bonus,
          // currency,
          awarded_to: collaborator ? collaborator.username : null
        };
        awarded_to.push(activity.award);
      }

      return activity;
    })
  };

  if (awarded_to.length > 0) {
    var getSum = (list, key) => {
      return list.reduce((sum, item) => {
        if (item[key] >= 0) {
          sum += item[key];
        }

        return sum;
      }, 0);
    };

    var countBounties = awards => {
      var bounties = awards.reduce((bounties, bounty) => {
        var hacker = bounty.awarded_to;

        if (!bounties[hacker]) {
          bounties[hacker] = {};
        }

        for (var [param, value] of Object.entries(bounty)) {
          if (!(param && param.includes('_amount'))) {
            bounties[hacker][param] = value;
            continue;
          }

          if (!bounties[hacker][param]) {
            bounties[hacker][param] = 0;
          }

          bounties[hacker][param] += value;
        }

        return bounties;
      }, {});
      bounties = Object.values(bounties);
      return {
        bounty_amount: getSum(bounties, 'bounty_amount'),
        bonus_amount: getSum(bounties, 'bonus_amount'),
        total_amount: getSum(bounties, 'total_amount'),
        // currency: default_currency,
        awarded_to: bounties
      };
    };

    json.award = countBounties(awarded_to);
  }

  if (isIBB) {
    json.program.ibb = true;
  }

  if (normalize) {
    json = (0, _normalize.default)(json);
  }

  return string ? JSON.stringify(json) : json;
};

var getActionChanges = (_ref7) => {
  var {
    additional_data
  } = _ref7,
      action = _objectWithoutProperties(_ref7, ["additional_data"]);

  var data = _objectSpread(_objectSpread({}, additional_data), action);

  var fields = Object.keys(data).filter(field => /^(old|new|added|removed)_/.test(field));
  var changes = {};
  fields.forEach(field => {
    var [actn, key] = field.split('_');
    var actionType = actn.replace('added', 'new').replace('removed', 'old');
    changes[key] = _objectSpread(_objectSpread({}, changes[key] || null), {}, {
      [actionType]: data[field]
    });
  });

  for (var param in changes) {
    if (param == 'weaknesses') {
      var {
        old: [old = null],
        new: [newValue = null]
      } = changes[param];
      changes.weakness = {
        old,
        new: newValue
      };
      delete changes[param];
    }
  }

  return Object.keys(changes).length > 0 ? changes : null;
};

var _default = format;
exports.default = _default;