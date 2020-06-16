# hackerone-report-formatter

Formats HackerOne report into more simple and readable form

#### Converts this

````json
{
  "id": 781150,
  "url": "https://hackerone.com/reports/781150",
  "title": "HackerOne Pentesters can access any structured scope object through GraphQL node interface",
  "state": "Closed",
  "substate": "resolved",
  "severity_rating": "high",
  "readable_substate": "Resolved",
  "created_at": "2020-01-22T21:48:03.755Z",
  "is_member_of_team?": null,
  "reporter": {
    "disabled": false,
    "username": "jobert",
    "url": "/jobert",
    "profile_picture_urls": {
      "small": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/3afcb5c896247e7ee8ada31b1c1eb8657e22241f911093acfe4ec7e97a3a959a"
    },
    "is_me?": false,
    "cleared": true,
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
  "has_bounty?": false,
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
  "disclosed_at": "2020-03-11T22:38:35.968Z",
  "bug_reporter_agreed_on_going_public_at": "2020-03-11T22:38:35.881Z",
  "team_member_agreed_on_going_public_at": "2020-03-11T22:37:41.926Z",
  "comments_closed?": false,
  "facebook_team?": false,
  "team_private?": false,
  "vulnerability_information": "A missing authorization check in the `StructuredScope` protector class (`app/protectors/protected_structured_scope.rb:42`) enables any HackerOne Pentester to access structured scope objects of programs they aren't invited to or aren't running a penetration test through HackerOne. \n\n```ruby\nclass ProtectedStructuredScope\n  # ...\n\n  property(:CAN_INVITE_HACKERS) do\n    StructuredScope.unscoped\n      .joins(:team)\n      .merge(Team.that_can_invite_hackers)\n  end\n\n  group(\n    # ...\n    (has_role(H1_PENTESTER) & has_feature(CAN_INVITE_HACKERS)),\n  ) do\n    allow :id\n    allow :asset_identifier\n    allow :asset_type\n    allow :eligible_for_bounty\n    allow :eligible_for_submission\n    allow :instruction\n    allow :rendered_instruction\n    allow :availability_requirement\n    allow :confidentiality_requirement\n    allow :integrity_requirement\n    allow :max_severity\n    allow :archived_at\n    allow :updated_at\n    # ...\nend\n```\n\nThe `H1_PENTESTER` role is defined as:\n\n```ruby\n  scope :user_is_hackerone_pentester, ->(user) do\n    verified.where(\n      User.where(id: user).where.not(id: nil).where(User.arel_table[:h1_pentester].eq(true)).select(1).arel.exists,\n    )\n  end\n```\n\nThe authorization logic should contain a check that determines whether the user has access to the structured scope through the `Pentest` object.\n\nTo reproduce, the following GraphQL query can be used:\n\n```\nquery {\n  node(id: \"Z2lkOi8vaGFja2Vyb25lL1N0cnVjdHVyZWRTY29wZS8x\") {\n    ... on StructuredScope {\n      _id\n      asset_identifier\n      asset_type\n    }\n  }\n}\n```\n\nReplace the node ID with any structured scope that belongs to a private program and it'll expose the attributes included in the protector.\n\n## Impact\n\nHackerOne Pentesters, although having more access than normal users, can obtain information from private programs that they don't have access to and aren't doing a penetration test through HackerOne.",
  "vulnerability_information_html": "<p>A missing authorization check in the <code>StructuredScope</code> protector class (<code>app/protectors/protected_structured_scope.rb:42</code>) enables any HackerOne Pentester to access structured scope objects of programs they aren&#39;t invited to or aren&#39;t running a penetration test through HackerOne. </p>\n<div class=\"highlight\"><pre class=\"highlight ruby\"><code><span class=\"k\">class</span> <span class=\"nc\">ProtectedStructuredScope</span>\n  <span class=\"c1\"># ...</span>\n\n  <span class=\"n\">property</span><span class=\"p\">(</span><span class=\"ss\">:CAN_INVITE_HACKERS</span><span class=\"p\">)</span> <span class=\"k\">do</span>\n    <span class=\"no\">StructuredScope</span><span class=\"p\">.</span><span class=\"nf\">unscoped</span>\n      <span class=\"p\">.</span><span class=\"nf\">joins</span><span class=\"p\">(</span><span class=\"ss\">:team</span><span class=\"p\">)</span>\n      <span class=\"p\">.</span><span class=\"nf\">merge</span><span class=\"p\">(</span><span class=\"no\">Team</span><span class=\"p\">.</span><span class=\"nf\">that_can_invite_hackers</span><span class=\"p\">)</span>\n  <span class=\"k\">end</span>\n\n  <span class=\"n\">group</span><span class=\"p\">(</span>\n    <span class=\"c1\"># ...</span>\n    <span class=\"p\">(</span><span class=\"n\">has_role</span><span class=\"p\">(</span><span class=\"no\">H1_PENTESTER</span><span class=\"p\">)</span> <span class=\"o\">&amp;</span> <span class=\"n\">has_feature</span><span class=\"p\">(</span><span class=\"no\">CAN_INVITE_HACKERS</span><span class=\"p\">)),</span>\n  <span class=\"p\">)</span> <span class=\"k\">do</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:id</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:asset_identifier</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:asset_type</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:eligible_for_bounty</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:eligible_for_submission</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:instruction</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:rendered_instruction</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:availability_requirement</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:confidentiality_requirement</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:integrity_requirement</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:max_severity</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:archived_at</span>\n    <span class=\"n\">allow</span> <span class=\"ss\">:updated_at</span>\n    <span class=\"c1\"># ...</span>\n<span class=\"k\">end</span>\n</code></pre></div>\n<p>The <code>H1_PENTESTER</code> role is defined as:</p>\n<div class=\"highlight\"><pre class=\"highlight ruby\"><code>  <span class=\"n\">scope</span> <span class=\"ss\">:user_is_hackerone_pentester</span><span class=\"p\">,</span> <span class=\"o\">-&gt;</span><span class=\"p\">(</span><span class=\"n\">user</span><span class=\"p\">)</span> <span class=\"k\">do</span>\n    <span class=\"n\">verified</span><span class=\"p\">.</span><span class=\"nf\">where</span><span class=\"p\">(</span>\n      <span class=\"no\">User</span><span class=\"p\">.</span><span class=\"nf\">where</span><span class=\"p\">(</span><span class=\"ss\">id: </span><span class=\"n\">user</span><span class=\"p\">).</span><span class=\"nf\">where</span><span class=\"p\">.</span><span class=\"nf\">not</span><span class=\"p\">(</span><span class=\"ss\">id: </span><span class=\"kp\">nil</span><span class=\"p\">).</span><span class=\"nf\">where</span><span class=\"p\">(</span><span class=\"no\">User</span><span class=\"p\">.</span><span class=\"nf\">arel_table</span><span class=\"p\">[</span><span class=\"ss\">:h1_pentester</span><span class=\"p\">].</span><span class=\"nf\">eq</span><span class=\"p\">(</span><span class=\"kp\">true</span><span class=\"p\">)).</span><span class=\"nf\">select</span><span class=\"p\">(</span><span class=\"mi\">1</span><span class=\"p\">).</span><span class=\"nf\">arel</span><span class=\"p\">.</span><span class=\"nf\">exists</span><span class=\"p\">,</span>\n    <span class=\"p\">)</span>\n  <span class=\"k\">end</span>\n</code></pre></div>\n<p>The authorization logic should contain a check that determines whether the user has access to the structured scope through the <code>Pentest</code> object.</p>\n\n<p>To reproduce, the following GraphQL query can be used:</p>\n<div class=\"highlight\"><pre class=\"highlight plaintext\"><code>query {\n  node(id: &quot;Z2lkOi8vaGFja2Vyb25lL1N0cnVjdHVyZWRTY29wZS8x&quot;) {\n    ... on StructuredScope {\n      _id\n      asset_identifier\n      asset_type\n    }\n  }\n}\n</code></pre></div>\n<p>Replace the node ID with any structured scope that belongs to a private program and it&#39;ll expose the attributes included in the protector.</p>\n\n<h2 id=\"impact\">Impact</h2>\n\n<p>HackerOne Pentesters, although having more access than normal users, can obtain information from private programs that they don&#39;t have access to and aren&#39;t doing a penetration test through HackerOne.</p>\n",
  "weakness": {
    "id": 26,
    "name": "Improper Access Control - Generic"
  },
  "original_report_id": null,
  "original_report_url": null,
  "attachments": [],
  "allow_singular_disclosure_at": "2020-04-10T22:37:41.989Z",
  "allow_singular_disclosure_after": -5753391.732719946,
  "singular_disclosure_allowed": true,
  "vote_count": 28,
  "voters": [
    "jobert",
    "a_d_a_m",
    "mashoud1122",
    "base_64",
    "sameerphad72",
    "zeroxyele",
    "haxta4ok00",
    "ms1241721_",
    "udit_thakkur",
    "badcracker",
    "and 18 more..."
  ],
  "severity": {
    "rating": "high",
    "score": 8.3,
    "author_type": "User",
    "metrics": {
      "attack_vector": "network",
      "attack_complexity": "low",
      "privileges_required": "low",
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
  "pentest_id": null,
  "can_edit_custom_fields_attributes": false,
  "activities": [
    {
      "id": 6845671,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BugTriaged",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-22T21:48:56.611Z",
      "updated_at": "2020-01-22T21:48:56.611Z",
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
      "id": 6846118,
      "is_internal": false,
      "editable": false,
      "type": "Activities::NotEligibleForBounty",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-22T23:02:44.235Z",
      "updated_at": "2020-01-22T23:02:44.235Z",
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
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6852623,
      "is_internal": false,
      "editable": false,
      "type": "Activities::BugResolved",
      "message": "A fix was released on January 22nd 2020 at 5:20p PST.",
      "markdown_message": "<p>A fix was released on January 22nd 2020 at 5:20p PST.</p>\n",
      "automated_response": false,
      "created_at": "2020-01-23T18:11:04.971Z",
      "updated_at": "2020-01-23T18:11:04.971Z",
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
      "reporter": {
        "username": "jobert",
        "url": "/jobert"
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6867058,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserInvited",
      "message": null,
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-25T05:01:23.924Z",
      "updated_at": "2020-01-25T05:01:23.924Z",
      "additional_data": {
        "report_retest_user_id": 2804
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
      "email": "popeax",
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6867059,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserInvited",
      "message": null,
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-25T05:01:24.450Z",
      "updated_at": "2020-01-25T05:01:24.450Z",
      "additional_data": {
        "report_retest_user_id": 2805
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
      "email": "kazan71p",
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6867060,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserInvited",
      "message": null,
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-25T05:01:24.989Z",
      "updated_at": "2020-01-25T05:01:24.989Z",
      "additional_data": {
        "report_retest_user_id": 2806
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
      "email": "japz",
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6867181,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserJoined",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-25T05:57:14.829Z",
      "updated_at": "2020-01-25T05:57:14.829Z",
      "additional_data": {
        "report_retest_user_id": 2805
      },
      "actor": {
        "username": "kazan71p",
        "cleared": true,
        "url": "/kazan71p",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/000/096/515/f5115b4063836f00a8d58de708ab6cd1ad61f53e_original.jpeg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": false
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6873078,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserInvited",
      "message": null,
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-26T05:45:07.306Z",
      "updated_at": "2020-01-26T05:45:07.306Z",
      "additional_data": {
        "report_retest_user_id": 2809
      },
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
      "email": "yashrs",
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6873106,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ExternalUserJoined",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-01-26T05:54:42.179Z",
      "updated_at": "2020-01-26T05:54:42.179Z",
      "additional_data": {
        "report_retest_user_id": 2809
      },
      "actor": {
        "username": "yashrs",
        "cleared": true,
        "url": "/yashrs",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/S9WnJuUrpWvxZ6iM38qL2HE4/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": null
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 6876692,
      "is_internal": false,
      "editable": false,
      "type": "Activities::Comment",
      "message": "Hi @jobert @security, \n\n> Replace the node ID with any structured scope that belongs to a private program\n\nCould you please provide a StructuredScope which is private for me to retest it? Thanks!",
      "markdown_message": "<p>Hi <a href=\"/jobert\">@jobert</a> <a href=\"/security\">@security</a>, </p>\n\n<blockquote>\n<p>Replace the node ID with any structured scope that belongs to a private program</p>\n</blockquote>\n\n<p>Could you please provide a StructuredScope which is private for me to retest it? Thanks!</p>\n",
      "automated_response": false,
      "created_at": "2020-01-27T02:53:44.625Z",
      "updated_at": "2020-01-27T02:53:44.625Z",
      "actor": {
        "username": "yashrs",
        "cleared": true,
        "url": "/yashrs",
        "profile_picture_urls": {
          "medium": "https://profile-photos.hackerone-user-content.com/variants/S9WnJuUrpWvxZ6iM38qL2HE4/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
        },
        "hackerone_triager": false,
        "hackerone_employee": null
      },
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7294028,
      "is_internal": false,
      "editable": false,
      "type": "Activities::AgreedOnGoingPublic",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-11T22:37:41.943Z",
      "updated_at": "2020-03-11T22:37:41.943Z",
      "first_to_agree": true,
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
      "genius_execution_id": null,
      "team_handle": "security"
    },
    {
      "id": 7294039,
      "is_internal": false,
      "editable": false,
      "type": "Activities::AgreedOnGoingPublic",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-11T22:38:35.902Z",
      "updated_at": "2020-03-11T22:38:35.902Z",
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
      "id": 7294040,
      "is_internal": false,
      "editable": false,
      "type": "Activities::ReportBecamePublic",
      "message": "",
      "markdown_message": "",
      "automated_response": false,
      "created_at": "2020-03-11T22:38:35.990Z",
      "updated_at": "2020-03-11T22:38:35.990Z",
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
````

#### Into this

````json
{
  "id": 781150,
  "title": "HackerOne Pentesters can access any structured scope object through GraphQL node interface",
  "state": "closed",
  "substate": "resolved",
  "platform": "hackerone",
  "hacker": {
    "verified": true,
    "handle": "jobert",
    "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/3afcb5c896247e7ee8ada31b1c1eb8657e22241f911093acfe4ec7e97a3a959a"
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
    "id": 26,
    "name": "Improper Access Control - Generic"
  },
  "severity": {
    "set_by_team": false,
    "rating": "high",
    "score": 8.3,
    "metrics": {
      "attack_vector": "network",
      "attack_complexity": "low",
      "privileges_required": "low",
      "user_interaction": "none",
      "scope": "unchanged",
      "confidentiality": "high",
      "integrity": "none",
      "availability": "none"
    }
  },
  "award": null,
  "vote_count": 28,
  "cve_ids": [],
  "visibility": "full",
  "hacker_agreed_on_going_public_at": 1583966315881,
  "platform_agreed_on_going_public_at": null,
  "created_at": 1579729683755,
  "disclosed_at": 1583966315968,
  "vulnerability_information": "A missing authorization check in the `StructuredScope` protector class (`app/protectors/protected_structured_scope.rb:42`) enables any HackerOne Pentester to access structured scope objects of programs they aren't invited to or aren't running a penetration test through HackerOne. \n\n```ruby\nclass ProtectedStructuredScope\n  # ...\n\n  property(:CAN_INVITE_HACKERS) do\n    StructuredScope.unscoped\n      .joins(:team)\n      .merge(Team.that_can_invite_hackers)\n  end\n\n  group(\n    # ...\n    (has_role(H1_PENTESTER) & has_feature(CAN_INVITE_HACKERS)),\n  ) do\n    allow :id\n    allow :asset_identifier\n    allow :asset_type\n    allow :eligible_for_bounty\n    allow :eligible_for_submission\n    allow :instruction\n    allow :rendered_instruction\n    allow :availability_requirement\n    allow :confidentiality_requirement\n    allow :integrity_requirement\n    allow :max_severity\n    allow :archived_at\n    allow :updated_at\n    # ...\nend\n```\n\nThe `H1_PENTESTER` role is defined as:\n\n```ruby\n  scope :user_is_hackerone_pentester, ->(user) do\n    verified.where(\n      User.where(id: user).where.not(id: nil).where(User.arel_table[:h1_pentester].eq(true)).select(1).arel.exists,\n    )\n  end\n```\n\nThe authorization logic should contain a check that determines whether the user has access to the structured scope through the `Pentest` object.\n\nTo reproduce, the following GraphQL query can be used:\n\n```\nquery {\n  node(id: \"Z2lkOi8vaGFja2Vyb25lL1N0cnVjdHVyZWRTY29wZS8x\") {\n    ... on StructuredScope {\n      _id\n      asset_identifier\n      asset_type\n    }\n  }\n}\n```\n\nReplace the node ID with any structured scope that belongs to a private program and it'll expose the attributes included in the protector.\n\n## Impact\n\nHackerOne Pentesters, although having more access than normal users, can obtain information from private programs that they don't have access to and aren't doing a penetration test through HackerOne.",
  "summaries": [],
  "attachments": [],
  "timeline": [
    {
      "id": 6845671,
      "type": "bug_triaged",
      "updated_at": 1579729736611,
      "created_at": 1579729736611,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 6846118,
      "type": "not_eligible_for_bounty",
      "updated_at": 1579734164235,
      "created_at": 1579734164235,
      "actor": {
        "handle": "security",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      }
    },
    {
      "id": 6852623,
      "type": "bug_resolved",
      "message": "A fix was released on January 22nd 2020 at 5:20p PST.",
      "updated_at": 1579803064971,
      "created_at": 1579803064971,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    },
    {
      "id": 6867058,
      "type": "external_user_invited",
      "updated_at": 1579928483924,
      "created_at": 1579928483924,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "additional_data": {
        "report_retest_user_id": 2804,
        "invited_hacker": "popeax"
      }
    },
    {
      "id": 6867059,
      "type": "external_user_invited",
      "updated_at": 1579928484450,
      "created_at": 1579928484450,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "additional_data": {
        "report_retest_user_id": 2805,
        "invited_hacker": "kazan71p"
      }
    },
    {
      "id": 6867060,
      "type": "external_user_invited",
      "updated_at": 1579928484989,
      "created_at": 1579928484989,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "additional_data": {
        "report_retest_user_id": 2806,
        "invited_hacker": "japz"
      }
    },
    {
      "id": 6867181,
      "type": "external_user_joined",
      "updated_at": 1579931834829,
      "created_at": 1579931834829,
      "actor": {
        "handle": "kazan71p",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/096/515/f5115b4063836f00a8d58de708ab6cd1ad61f53e_original.jpeg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "additional_data": {
        "report_retest_user_id": 2805
      }
    },
    {
      "id": 6873078,
      "type": "external_user_invited",
      "updated_at": 1580017507306,
      "created_at": 1580017507306,
      "actor": {
        "handle": "security",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/000/013/fa942b9b1cbf4faf37482bf68458e1195aab9c02_original.png/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "additional_data": {
        "report_retest_user_id": 2809,
        "invited_hacker": "yashrs"
      }
    },
    {
      "id": 6873106,
      "type": "external_user_joined",
      "updated_at": 1580018082179,
      "created_at": 1580018082179,
      "actor": {
        "handle": "yashrs",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/S9WnJuUrpWvxZ6iM38qL2HE4/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      },
      "additional_data": {
        "report_retest_user_id": 2809
      }
    },
    {
      "id": 6876692,
      "type": "comment",
      "message": "Hi @jobert @security, \n\n> Replace the node ID with any structured scope that belongs to a private program\n\nCould you please provide a StructuredScope which is private for me to retest it? Thanks!",
      "updated_at": 1580093624625,
      "created_at": 1580093624625,
      "actor": {
        "handle": "yashrs",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/S9WnJuUrpWvxZ6iM38qL2HE4/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5"
      }
    },
    {
      "id": 7294028,
      "type": "agreed_on_going_public",
      "updated_at": 1583966261943,
      "created_at": 1583966261943,
      "actor": {
        "handle": "bencode",
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/000/013/117/ddaa1da4e004e1234c6857c42f9bfa8df85b5ccf_original.jpg/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "additional_data": {
        "first_to_agree": true
      }
    },
    {
      "id": 7294039,
      "type": "agreed_on_going_public",
      "updated_at": 1583966315902,
      "created_at": 1583966315902,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      },
      "additional_data": {
        "first_to_agree": false
      }
    },
    {
      "id": 7294040,
      "type": "report_became_public",
      "updated_at": 1583966315990,
      "created_at": 1583966315990,
      "actor": {
        "handle": "jobert",
        "verified": true,
        "profile_picture_url": "https://profile-photos.hackerone-user-content.com/variants/ht4b9SmcYNqmpbyCFXd7cxHB/eb31823a4cc9f6b6bb4db930ffdf512533928a68a4255fb50a83180281a60da5",
        "platform_employee": true
      }
    }
  ]
}
````
