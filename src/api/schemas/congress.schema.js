// GraphQL
const propublicaSchema = `
  type Subject {
    name: String,
  }

  type Action {
    datetime: String,
    description: String,
  }

  type Bill {
    number: String,
    bill_uri: String,
    title: String,
    summary: String,
    sponsor: String,
    introduced_date: String,
    cosponsors: Int,
    actions: [Action],
    subjects: [Subject],
  }

  type Member {
    id: String,
    thomas_id: String,
    api_uri: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    party: String,
    twitter_account: String,
    facebook_account: String,
    facebook_id: String,
    url: String,
    rss_url: String,
    domain: String,
    dw_nominate: String,
    ideal_point: String,
    seniority: String,
    next_election: String,
    total_votes: String,
    missed_votes: String,
    total_present: String,
    state: String,
    missed_votes_pct: String,
    votes_with_party_pct: String,
  }

  type MemberBill {
    congress: String,
    number: String
    bill: String,
    url_number: String,
    title: String,
    sponsor: String,
    sponsor_id: String,
    introduced_date: String,
    number_of_cosponsors: String,
    committees: String,
    latest_major_action_date: String,
    latest_major_action: String,
    house_passage_vote: String,
    senate_passage_vote: String,
    subjects: [Subject],
  }

  # the schema allows the following query:
  type RootQuery {
    bill(billId: String): Bill,
    bills(chamber: String, type: String): [ Bill ],
    billsByKeywords(keywords: [ String ]): [ Bill ],
    member(chamber: String, first_name: String, last_name: String): Member,
    members(chamber: String): [ Member ],
    memberBills(memberId: String, type: String): [ Bill ],
    memberBillsByName(chamber: String, first_name: String, last_name: String, type: String): [ Bill ],
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: RootQuery
  }
`
export default propublicaSchema;
