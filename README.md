# hackerone-report-formatter

Formats HackerOne report into more simple and readable form

## Usage

```javascript
import format from 'hackerone-report-formatter'

// JSON received from https://hackerone.com/reports/{id}.json endpoint
const raw = {...}

try {
  const report = format(raw)
  return report
} catch (e) {
  console.log('Error occured')
}
```

### Converts this

```json
{
  "id": 807448,
  "url": "https://hackerone.com/reports/807448",
  "title": "Customer private program can disclose email any users through invited via username",
  "state": "Closed",
  "substate": "resolved",
  "severity_rating": "high",
  "readable_substate": "Resolved",
  "created_at": "2020-02-28T23:15:43.015Z",
  "is_member_of_team?": null,
  "reporter": {
    "disabled": false,
    "username": "haxta4ok00",
    "url": "/haxta4ok00",
    "profile_picture_urls": {
      "small": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/3afcb5c896247e7ee8ada31b1c1eb8657e22241f911093acfe4ec7e97a3a959a"
    },
    "is_me?": false,
    "cleared": false,
    "hackerone_triager": false,
    "hacker_mediation": false
  },
  "team": {
    "id": 13,
    "url": "https://hackerone.com/security",
    "handle": "security",
    "profile_picture_urls": {
      "small": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/3afcb5c896247e7ee8ada31b1c1eb8657e22241f911093acfe4ec7e97a3a959a",
      "medium": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
    },
    "permissions": [],
    "submission_state": "open",
    "default_currency": "usd",
    "awards_miles": false,
    "offers_bounties": true,
    "state": "public_mode",
    "only_cleared_hackers": false,
    "profile": {
      "name": "HackerOne",
      "twitter_handle": "Hacker0x01",
      "website": "https://hackerone.com",
      "about": "Vulnerability disclosure should be safe, transparent, and rewarding."
    }
  },
  "has_bounty?": true,
  "in_validation?": false,
  "rejected_anc_report_that_can_be_sent_back_to_anc_triagers?": false,
  "can_view_team": true,
  "is_external_bug": false,
  "is_published": false,
  "is_participant": false,
  "stage": 4,
  "public": true,
  "visibility": "full",
  "cve_ids": [],
  "singular_disclosure_disabled": false,
  "disclosed_at": "2020-05-15T17:24:34.443Z",
  "bug_reporter_agreed_on_going_public_at": "2020-05-15T17:24:34.389Z",
  "team_member_agreed_on_going_public_at": "2020-05-15T17:06:32.332Z",
  "comments_closed?": false,
  "facebook_team?": false,
  "team_private?": false,
  "vulnerability_information": "## Summary:\nHey team,This bug could have been used by my calculations a long time ago\n## Steps To Reproduce:\n1)Go to https://hackerone.com/hackerone_h1p_bbp3/launch\n2)Take invite via username\n3)Input username , send invite\n3.1)When an invite is created, we get a token\n4)Now Go use GraphQL query\n\nhttps://hackerone.com/graphql?\n\n`{\"query\": \"query {team(handle:\\\\\"hackerone_h1p_bbp3\\\\\"){_id,handle,soft_launch_invitations{total_count,nodes{... on InvitationsSoftLaunch{token}}}}}\"}`\n\nAnswer:\n\n`{\"data\":{\"team\":{\"_id\":\"47388\",\"handle\":\"hackerone_h1p_bbp3\",\"soft_launch_invitations\":{\"total_count\":5,\"nodes\":[{\"token\":\"████████\"},{\"token\":\"███\"},{\"token\":\"████\"},{\"token\":\"██████\"},{\"token\":\"████████\"}]}}}}`\n████\n\n\n5)Now check .json - █████████\n\n`{\"token\":\"████████\",\"type\":\"Invitations::SoftLaunch\",\"auth_option\":\"has-no-access\",\"email\":\"████@managed.hackerone.com\",\"status\":\"valid\",\"expires_at\":\"2020-03-06T21:33:31.689Z\",\"recipient\":{\"username\":\"zebra\",\"profile_picture\":\"███\",\"url\":\"https://hackerone.com/zebra\"},\"open_soft_launch_invitations_count\":0}`\n\n\n`\"email\":\"██████████@managed.hackerone.com\"`\n██████\n6)You need to do this immediately before the user accepts or rejects our request for an invite\n\nThanks, @haxta4ok00\n\n## Impact\n\nDisclosed email",
  "vulnerability_information_html": "<h2 id=\"summary\">Summary:</h2>\n\n<p>Hey team,This bug could have been used by my calculations a long time ago</p>\n\n<h2 id=\"steps-to-reproduce\">Steps To Reproduce:</h2>\n\n<p>1)Go to <a title=\"https://hackerone.com/hackerone_h1p_bbp3/launch\" href=\"https://hackerone.com/hackerone_h1p_bbp3/launch\">https://hackerone.com/hackerone_h1p_bbp3/launch</a><br>\n2)Take invite via username<br>\n3)Input username , send invite<br>\n3.1)When an invite is created, we get a token<br>\n4)Now Go use GraphQL query</p>\n\n<p><a title=\"https://hackerone.com/graphql\" href=\"https://hackerone.com/graphql\">https://hackerone.com/graphql</a>?</p>\n\n<p><code>{&quot;query&quot;: &quot;query {team(handle:\\\\&quot;hackerone_h1p_bbp3\\\\&quot;){_id,handle,soft_launch_invitations{total_count,nodes{... on InvitationsSoftLaunch{token}}}}}&quot;}</code></p>\n\n<p>Answer:</p>\n\n<p><code>{&quot;data&quot;:{&quot;team&quot;:{&quot;_id&quot;:&quot;47388&quot;,&quot;handle&quot;:&quot;hackerone_h1p_bbp3&quot;,&quot;soft_launch_invitations&quot;:{&quot;total_count&quot;:5,&quot;nodes&quot;:[{&quot;token&quot;:&quot;████████&quot;},{&quot;token&quot;:&quot;███&quot;},{&quot;token&quot;:&quot;████&quot;},{&quot;token&quot;:&quot;██████&quot;},{&quot;token&quot;:&quot;████████&quot;}]}}}}</code><br>\n████</p>\n\n<p>5)Now check .json - █████████</p>\n\n<p><code>{&quot;token&quot;:&quot;████████&quot;,&quot;type&quot;:&quot;Invitations::SoftLaunch&quot;,&quot;auth_option&quot;:&quot;has-no-access&quot;,&quot;email&quot;:&quot;████@managed.hackerone.com&quot;,&quot;status&quot;:&quot;valid&quot;,&quot;expires_at&quot;:&quot;2020-03-06T21:33:31.689Z&quot;,&quot;recipient&quot;:{&quot;username&quot;:&quot;zebra&quot;,&quot;profile_picture&quot;:&quot;███&quot;,&quot;url&quot;:&quot;https://hackerone.com/zebra&quot;},&quot;open_soft_launch_invitations_count&quot;:0}</code></p>\n\n<p><code>&quot;email&quot;:&quot;██████████@managed.hackerone.com&quot;</code><br>\n██████<br>\n6)You need to do this immediately before the user accepts or rejects our request for an invite</p>\n\n<p>Thanks, <a href=\"/haxta4ok00\">@haxta4ok00</a></p>\n\n<h2 id=\"impact\">Impact</h2>\n\n<p>Disclosed email</p>\n",
  "bounty_amount": "7500.0",
  "formatted_bounty": "$7,500",
  "weakness": {
    "id": 18,
    "name": "Information Disclosure"
  },
  "original_report_id": null,
  "original_report_url": null,
  "attachments": [],
  "allow_singular_disclosure_at": "2020-06-14T17:06:32.449Z",
  "allow_singular_disclosure_after": -158331.442780239,
  "singular_disclosure_allowed": true,
  "vote_count": 503,
  "voters": [
    "0xt4144t",
    "ikyjbquwkhe",
    "luisk2",
    "pist4chios",
    "hunter",
    "mashoud1122",
    "jarvis7",
    "base_64",
    "bitsscrambler",
    "ts4r",
    "and 493 more..."
  ],
  "severity": {
    "rating": "high",
    "score": 7.5,
    "author_type": "Team",
    "metrics": {
      "attack_vector": "network",
      "attack_complexity": "low",
      "privileges_required": "none",
      "user_interaction": "none",
      "scope": "unchanged",
      "confidentiality": "high",
      "integrity": "none",
      "availability": "none"
    }
  },
  "structured_scope": {
    "databaseId": 3,
    "asset_type": "URL",
    "asset_identifier": "https://hackerone.com",
    "max_severity": "critical"
  },
  "abilities": {
    "assignable_team_members": [],
    "assignable_team_member_groups": []
  },
  "pentest_id": 32,
  "can_edit_custom_fields_attributes": false,
  "activities": [
    {
      "id": 7180136,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserJoined",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-02-28T23:15:43.175Z",
      "updated_at": "2020-02-28T23:15:43.175Z",
      "actor": {
        "username": "nahamsec",
        "cleared": true,
        "url": "/nahamsec",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/002/413/ab3559068530ebd67a8224a9da7821be178dda07_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7180137,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserJoined",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-02-28T23:15:43.202Z",
      "updated_at": "2020-02-28T23:15:43.202Z",
      "actor": {
        "username": "fisher",
        "cleared": true,
        "url": "/fisher",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/CB9zcyPs2KHYbTTPjQZGuo6x/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7209298,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BugTriaged",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-03T18:28:07.057Z",
      "updated_at": "2020-03-03T18:28:07.057Z",
      "actor": {
        "username": "8thwonder",
        "cleared": false,
        "url": "/8thwonder",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7209403,
      "is_internal": false,
      "editable": false,
      "type": "Activities::Comment",
      "message": "@haxta4ok00 Please add a proposed CVSS score to this report.",
      "markdown_message": "<p><a href=\"/haxta4ok00\">@haxta4ok00</a> Please add a proposed CVSS score to this report.</p>\n",
      "automated_response": false,
      "created_at": "2020-03-03T18:34:09.208Z",
      "updated_at": "2020-03-03T18:34:09.208Z",
      "actor": {
        "username": "8thwonder",
        "cleared": false,
        "url": "/8thwonder",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7209438,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BugNeedsMoreInfo",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-03T18:37:50.349Z",
      "updated_at": "2020-03-03T18:37:50.349Z",
      "actor": {
        "username": "8thwonder",
        "cleared": false,
        "url": "/8thwonder",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7209545,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportSeverityUpdated",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-03T18:49:39.303Z",
      "updated_at": "2020-03-03T18:49:39.303Z",
      "additional_data": {
        "old_severity": null,
        "new_severity": "Medium (6.5)"
      },
      "actor": {
        "username": "haxta4ok00",
        "cleared": false,
        "url": "/haxta4ok00",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7212622,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BugTriaged",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-04T00:36:52.367Z",
      "updated_at": "2020-03-04T00:36:52.367Z",
      "actor": {
        "username": "8thwonder",
        "cleared": false,
        "url": "/8thwonder",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7312278,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportVulnerabilityTypesUpdated",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-13T16:53:40.846Z",
      "updated_at": "2020-03-13T16:53:40.846Z",
      "additional_data": {
        "added_weaknesses": [
          {
            "id": 18,
            "name": "Information Disclosure"
          }
        ],
        "removed_weaknesses": []
      },
      "actor": {
        "username": "jobert",
        "cleared": true,
        "url": "/jobert",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7461084,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BugResolved",
      "message": "We have pushed out a fix, time to retest!",
      "markdown_message": "<p>We have pushed out a fix, time to retest!</p>\n",
      "automated_response": false,
      "created_at": "2020-03-27T17:10:45.922Z",
      "updated_at": "2020-03-27T17:10:45.922Z",
      "actor": {
        "username": "bencode",
        "cleared": false,
        "url": "/bencode",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/013/117/ddaa1da4e004e1234c6857c42f9bfa8df85b5ccf_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "reporter": {
        "username": "haxta4ok00",
        "url": "/haxta4ok00"
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7461124,
      "is_internal": false,
      "editable": false,
      "type": "Activities::UserCompletedRetest",
      "message": "Hey @bencode, looks like a fix , now answer:\n\n`{\"data\":{\"team\":{\"_id\":\"47388\",\"handle\":\"hackerone_h1p_bbp3\",\"soft_launch_invitations\":{\"total_count\":17,\"nodes\":[{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":\"█████\"},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null}]}}}}`\n\n",
      "markdown_message": "<p>Hey <a href=\"/bencode\">@bencode</a>, looks like a fix , now answer:</p>\n\n<p><code>{&quot;data&quot;:{&quot;team&quot;:{&quot;_id&quot;:&quot;47388&quot;,&quot;handle&quot;:&quot;hackerone_h1p_bbp3&quot;,&quot;soft_launch_invitations&quot;:{&quot;total_count&quot;:17,&quot;nodes&quot;:[{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:&quot;█████&quot;},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null},{&quot;token&quot;:null}]}}}}</code></p>\n",
      "automated_response": false,
      "created_at": "2020-03-27T17:15:48.249Z",
      "updated_at": "2020-05-15T17:05:58.618Z",
      "actor": {
        "username": "haxta4ok00",
        "cleared": false,
        "url": "/haxta4ok00",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7534588,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportSeverityUpdated",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-04-03T22:08:25.659Z",
      "updated_at": "2020-04-03T22:08:25.659Z",
      "additional_data": {
        "old_severity": "Medium (6.5)",
        "new_severity": "High (7.5)"
      },
      "actor": {
        "username": "jobert",
        "cleared": true,
        "url": "/jobert",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7902200,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReassignedToTeam",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T18:28:48.531Z",
      "updated_at": "2020-05-05T18:28:48.531Z",
      "additional_data": {
        "old_team": "HackerOne H1P",
        "new_team": "HackerOne"
      },
      "actor": {
        "username": "jobert",
        "cleared": true,
        "url": "/jobert",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7902977,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserRemoved",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T19:29:02.773Z",
      "updated_at": "2020-05-05T19:29:02.773Z",
      "actor": {
        "username": "jobert",
        "cleared": true,
        "url": "/jobert",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "removed_user": {
        "url": "/nahamsec",
        "username": "nahamsec"
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7902978,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserRemoved",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T19:29:05.050Z",
      "updated_at": "2020-05-05T19:29:05.050Z",
      "actor": {
        "username": "jobert",
        "cleared": true,
        "url": "/jobert",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "removed_user": {
        "url": "/fisher",
        "username": "fisher"
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7902986,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportCollaboratorInvited",
      "message": null,
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T19:30:25.630Z",
      "updated_at": "2020-05-05T19:30:25.630Z",
      "actor": {
        "username": "haxta4ok00",
        "cleared": false,
        "url": "/haxta4ok00",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "email": "fisher",
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7902988,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportCollaboratorInvited",
      "message": null,
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T19:30:43.083Z",
      "updated_at": "2020-05-05T19:30:43.083Z",
      "actor": {
        "username": "haxta4ok00",
        "cleared": false,
        "url": "/haxta4ok00",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "email": "nahamsec",
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7903020,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportCollaboratorJoined",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T19:33:33.489Z",
      "updated_at": "2020-05-05T19:33:33.489Z",
      "actor": {
        "username": "nahamsec",
        "cleared": true,
        "url": "/nahamsec",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/002/413/ab3559068530ebd67a8224a9da7821be178dda07_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7903021,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportCollaboratorJoined",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-05T19:33:33.738Z",
      "updated_at": "2020-05-05T19:33:33.738Z",
      "actor": {
        "username": "fisher",
        "cleared": true,
        "url": "/fisher",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/CB9zcyPs2KHYbTTPjQZGuo6x/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7903034,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BountyAwarded",
      "message": "This report was part of a HackerOne Pentest that was conducted early March 2020. Although hackers are typically not awarded for individual reports, we're making an exception for this particular security vulnerability due to its severity. Thanks again for finding this great security vulnerability, @nahamsec, @fisher, and @haxta4ok00 - great find!",
      "markdown_message": "<p>This report was part of a HackerOne Pentest that was conducted early March 2020. Although hackers are typically not awarded for individual reports, we&#39;re making an exception for this particular security vulnerability due to its severity. Thanks again for finding this great security vulnerability, <a href=\"/nahamsec\">@nahamsec</a>, <a href=\"/fisher\">@fisher</a>, and <a href=\"/haxta4ok00\">@haxta4ok00</a> - great find!</p>\n",
      "automated_response": false,
      "created_at": "2020-05-05T19:34:43.622Z",
      "updated_at": "2020-05-05T19:34:43.622Z",
      "actor": {
        "url": "/security",
        "ibb": false,
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "profile": {
          "name": "HackerOne"
        }
      },
      "bounty_amount": "2500.0",
      "bounty_currency": "usd",
      "bonus_amount": "0.0",
      "genius_execution_id": null,
      "team_handle": "security",
      "collaborator": {
        "username": "fisher",
        "url": "/fisher"
      }
    },
    {
      "id": 7903035,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BountyAwarded",
      "message": "👍",
      "markdown_message": "<p>👍</p>\n",
      "automated_response": false,
      "created_at": "2020-05-05T19:34:43.981Z",
      "updated_at": "2020-05-05T19:35:22.081Z",
      "actor": {
        "url": "/security",
        "ibb": false,
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "profile": {
          "name": "HackerOne"
        }
      },
      "bounty_amount": "2500.0",
      "bounty_currency": "usd",
      "bonus_amount": "0.0",
      "genius_execution_id": null,
      "team_handle": "security",
      "collaborator": {
        "username": "nahamsec",
        "url": "/nahamsec"
      }
    },
    {
      "id": 7903036,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BountyAwarded",
      "message": "👍",
      "markdown_message": "<p>👍</p>\n",
      "automated_response": false,
      "created_at": "2020-05-05T19:34:44.258Z",
      "updated_at": "2020-05-05T19:35:25.528Z",
      "actor": {
        "url": "/security",
        "ibb": false,
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "profile": {
          "name": "HackerOne"
        }
      },
      "bounty_amount": "2500.0",
      "bounty_currency": "usd",
      "bonus_amount": "0.0",
      "genius_execution_id": null,
      "team_handle": "security",
      "collaborator": {
        "username": "haxta4ok00",
        "url": "/haxta4ok00"
      }
    },
    {
      "id": 8013687,
      "is_internal": false,
      "editable": false,
      "type": "Activities::AgreedOnGoingPublic",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-15T17:06:32.353Z",
      "updated_at": "2020-05-15T17:06:32.353Z",
      "first_to_agree": true,
      "actor": {
        "username": "jobert",
        "cleared": true,
        "url": "/jobert",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": true
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 8013850,
      "is_internal": false,
      "editable": false,
      "type": "Activities::AgreedOnGoingPublic",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-15T17:24:34.413Z",
      "updated_at": "2020-05-15T17:24:34.413Z",
      "actor": {
        "username": "haxta4ok00",
        "cleared": false,
        "url": "/haxta4ok00",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 8013851,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportBecamePublic",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-05-15T17:24:34.476Z",
      "updated_at": "2020-05-15T17:24:34.476Z",
      "actor": {
        "username": "haxta4ok00",
        "cleared": false,
        "url": "/haxta4ok00",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    }
  ],
  "activity_page_count": 1,
  "activity_page_number": 1,
  "summaries": [
    {
      "category": "team",
      "can_view?": true,
      "can_create?": false
    },
    {
      "category": "researcher",
      "can_view?": true,
      "can_create?": false
    }
  ]
}
```

### Into this

```json
{
  "id": 807448,
  "title": "Customer private program can disclose email any users through invited via username",
  "state": "closed",
  "substate": "resolved",
  "platform": "hackerone",
  "hacker": {
    "verified": false,
    "handle": "haxta4ok00",
    "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/3afcb5c896247e7ee8ada31b1c1eb8657e22241f911093acfe4ec7e97a3a959a"
  },
  "program": {
    "id": 13,
    "handle": "security",
    "offers_bounties": true,
    "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
    "award_miles": false,
    "only_verified_hackers": false,
    "profile": {
      "name": "HackerOne",
      "twitter_handle": "Hacker0x01",
      "website": "https://hackerone.com",
      "about": "Vulnerability disclosure should be safe, transparent, and rewarding."
    }
  },
  "original_report_id": null,
  "original_report_url": null,
  "vulnerable_asset": {
    "type": "url",
    "identifier": "https://hackerone.com",
    "max_severity": "critical"
  },
  "weakness": {
    "id": 18,
    "name": "Information Disclosure"
  },
  "severity": {
    "set_by_team": true,
    "rating": "high",
    "score": 7.5,
    "metrics": {
      "attack_vector": "network",
      "attack_complexity": "low",
      "privileges_required": "none",
      "user_interaction": "none",
      "scope": "unchanged",
      "confidentiality": "high",
      "integrity": "none",
      "availability": "none"
    }
  },
  "award": {
    "bounty_amount": 7500,
    "bonus_amount": 0,
    "total_amount": 7500,
    "currency": "usd",
    "awarded_to": [
      {
        "bounty_amount": 2500,
        "bonus_amount": 0,
        "total_amount": 2500,
        "currency": "usd",
        "awarded_to": "fisher"
      },
      {
        "bounty_amount": 2500,
        "bonus_amount": 0,
        "total_amount": 2500,
        "currency": "usd",
        "awarded_to": "nahamsec"
      },
      {
        "bounty_amount": 2500,
        "bonus_amount": 0,
        "total_amount": 2500,
        "currency": "usd",
        "awarded_to": "haxta4ok00"
      }
    ]
  },
  "vote_count": 503,
  "cve_ids": [],
  "visibility": "full",
  "hacker_agreed_on_going_public_at": 1589563474389,
  "platform_agreed_on_going_public_at": null,
  "created_at": 1582931743015,
  "disclosed_at": 1589563474443,
  "vulnerability_information": "## Summary:\nHey team,This bug could have been used by my calculations a long time ago\n## Steps To Reproduce:\n1)Go to https://hackerone.com/hackerone_h1p_bbp3/launch\n2)Take invite via username\n3)Input username , send invite\n3.1)When an invite is created, we get a token\n4)Now Go use GraphQL query\n\nhttps://hackerone.com/graphql?\n\n`{\"query\": \"query {team(handle:\\\\\"hackerone_h1p_bbp3\\\\\"){_id,handle,soft_launch_invitations{total_count,nodes{... on InvitationsSoftLaunch{token}}}}}\"}`\n\nAnswer:\n\n`{\"data\":{\"team\":{\"_id\":\"47388\",\"handle\":\"hackerone_h1p_bbp3\",\"soft_launch_invitations\":{\"total_count\":5,\"nodes\":[{\"token\":\"████████\"},{\"token\":\"███\"},{\"token\":\"████\"},{\"token\":\"██████\"},{\"token\":\"████████\"}]}}}}`\n████\n\n\n5)Now check .json - █████████\n\n`{\"token\":\"████████\",\"type\":\"Invitations::SoftLaunch\",\"auth_option\":\"has-no-access\",\"email\":\"████@managed.hackerone.com\",\"status\":\"valid\",\"expires_at\":\"2020-03-06T21:33:31.689Z\",\"recipient\":{\"username\":\"zebra\",\"profile_picture\":\"███\",\"url\":\"https://hackerone.com/zebra\"},\"open_soft_launch_invitations_count\":0}`\n\n\n`\"email\":\"██████████@managed.hackerone.com\"`\n██████\n6)You need to do this immediately before the user accepts or rejects our request for an invite\n\nThanks, @haxta4ok00\n\n## Impact\n\nDisclosed email",
  "summaries": [],
  "attachments": [],
  "timeline": [
    {
      "id": 7180136,
      "type": "external_user_joined",
      "updated_at": 1582931743175,
      "created_at": 1582931743175,
      "actor": {
        "handle": "nahamsec",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/002/413/ab3559068530ebd67a8224a9da7821be178dda07_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7180137,
      "type": "external_user_joined",
      "updated_at": 1582931743202,
      "created_at": 1582931743202,
      "actor": {
        "handle": "fisher",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/CB9zcyPs2KHYbTTPjQZGuo6x/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      }
    },
    {
      "id": 7209298,
      "type": "bug_triaged",
      "updated_at": 1583260087057,
      "created_at": 1583260087057,
      "actor": {
        "handle": "8thwonder",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7209403,
      "type": "comment",
      "message": "@haxta4ok00 Please add a proposed CVSS score to this report.",
      "updated_at": 1583260449208,
      "created_at": 1583260449208,
      "actor": {
        "handle": "8thwonder",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7209438,
      "type": "bug_needs_more_info",
      "updated_at": 1583260670349,
      "created_at": 1583260670349,
      "actor": {
        "handle": "8thwonder",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7209545,
      "type": "report_severity_updated",
      "updated_at": 1583261379303,
      "created_at": 1583261379303,
      "actor": {
        "handle": "haxta4ok00",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "changes": {
        "severity": {
          "old": null,
          "new": "Medium (6.5)"
        }
      }
    },
    {
      "id": 7212622,
      "type": "bug_triaged",
      "updated_at": 1583282212367,
      "created_at": 1583282212367,
      "actor": {
        "handle": "8thwonder",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/344/762/d9cf3f41d13e1324833555e5ee46ad5c73db84a5_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7312278,
      "type": "report_vulnerability_types_updated",
      "updated_at": 1584118420846,
      "created_at": 1584118420846,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "changes": {
        "weakness": {
          "old": null,
          "new": {
            "id": 18,
            "name": "Information Disclosure"
          }
        }
      }
    },
    {
      "id": 7461084,
      "type": "bug_resolved",
      "message": "We have pushed out a fix, time to retest!",
      "updated_at": 1585329045922,
      "created_at": 1585329045922,
      "actor": {
        "handle": "bencode",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/013/117/ddaa1da4e004e1234c6857c42f9bfa8df85b5ccf_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7461124,
      "type": "user_completed_retest",
      "message": "Hey @bencode, looks like a fix , now answer:\n\n`{\"data\":{\"team\":{\"_id\":\"47388\",\"handle\":\"hackerone_h1p_bbp3\",\"soft_launch_invitations\":{\"total_count\":17,\"nodes\":[{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":\"█████\"},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null},{\"token\":null}]}}}}`\n\n",
      "updated_at": 1589562358618,
      "created_at": 1585329348249,
      "actor": {
        "handle": "haxta4ok00",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      }
    },
    {
      "id": 7534588,
      "type": "report_severity_updated",
      "updated_at": 1585951705659,
      "created_at": 1585951705659,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "changes": {
        "severity": {
          "old": "Medium (6.5)",
          "new": "High (7.5)"
        }
      }
    },
    {
      "id": 7902200,
      "type": "reassigned_to_team",
      "updated_at": 1588703328531,
      "created_at": 1588703328531,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "changes": {
        "team": {
          "old": "HackerOne H1P",
          "new": "HackerOne"
        }
      }
    },
    {
      "id": 7902977,
      "type": "external_user_removed",
      "updated_at": 1588706942773,
      "created_at": 1588706942773,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "changes": {
        "user": {
          "old": {
            "url": "/nahamsec",
            "username": "nahamsec"
          }
        }
      }
    },
    {
      "id": 7902978,
      "type": "external_user_removed",
      "updated_at": 1588706945050,
      "created_at": 1588706945050,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "changes": {
        "user": {
          "old": {
            "url": "/fisher",
            "username": "fisher"
          }
        }
      }
    },
    {
      "id": 7902986,
      "type": "report_collaborator_invited",
      "updated_at": 1588707025630,
      "created_at": 1588707025630,
      "actor": {
        "handle": "haxta4ok00",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "additional_data": {
        "invited_hacker": "fisher"
      }
    },
    {
      "id": 7902988,
      "type": "report_collaborator_invited",
      "updated_at": 1588707043083,
      "created_at": 1588707043083,
      "actor": {
        "handle": "haxta4ok00",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "additional_data": {
        "invited_hacker": "nahamsec"
      }
    },
    {
      "id": 7903020,
      "type": "report_collaborator_joined",
      "updated_at": 1588707213489,
      "created_at": 1588707213489,
      "actor": {
        "handle": "nahamsec",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/002/413/ab3559068530ebd67a8224a9da7821be178dda07_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 7903021,
      "type": "report_collaborator_joined",
      "updated_at": 1588707213738,
      "created_at": 1588707213738,
      "actor": {
        "handle": "fisher",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/CB9zcyPs2KHYbTTPjQZGuo6x/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      }
    },
    {
      "id": 7903034,
      "type": "bounty_awarded",
      "message": "This report was part of a HackerOne Pentest that was conducted early March 2020. Although hackers are typically not awarded for individual reports, we're making an exception for this particular security vulnerability due to its severity. Thanks again for finding this great security vulnerability, @nahamsec, @fisher, and @haxta4ok00 - great find!",
      "updated_at": 1588707283622,
      "created_at": 1588707283622,
      "actor": {
        "handle": "security",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "award": {
        "bounty_amount": 2500,
        "bonus_amount": 0,
        "total_amount": 2500,
        "currency": "usd",
        "awarded_to": "fisher"
      }
    },
    {
      "id": 7903035,
      "type": "bounty_awarded",
      "message": "👍",
      "updated_at": 1588707322081,
      "created_at": 1588707283981,
      "actor": {
        "handle": "security",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "award": {
        "bounty_amount": 2500,
        "bonus_amount": 0,
        "total_amount": 2500,
        "currency": "usd",
        "awarded_to": "nahamsec"
      }
    },
    {
      "id": 7903036,
      "type": "bounty_awarded",
      "message": "👍",
      "updated_at": 1588707325528,
      "created_at": 1588707284258,
      "actor": {
        "handle": "security",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "award": {
        "bounty_amount": 2500,
        "bonus_amount": 0,
        "total_amount": 2500,
        "currency": "usd",
        "awarded_to": "haxta4ok00"
      }
    },
    {
      "id": 8013687,
      "type": "agreed_on_going_public",
      "updated_at": 1589562392353,
      "created_at": 1589562392353,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "additional_data": {
        "first_to_agree": true
      }
    },
    {
      "id": 8013850,
      "type": "agreed_on_going_public",
      "updated_at": 1589563474413,
      "created_at": 1589563474413,
      "actor": {
        "handle": "haxta4ok00",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "additional_data": {
        "first_to_agree": false
      }
    },
    {
      "id": 8013851,
      "type": "report_became_public",
      "updated_at": 1589563474476,
      "created_at": 1589563474476,
      "actor": {
        "handle": "haxta4ok00",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/049/175/8449afdd3403f4de00b34719ee09823bad1c0a06_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      }
    }
  ]
}
```
