// Fictional suspects. All five start with an equal prior of 1/5 (20%),
// which is computed in lib/bayes.js (equalPriors), not stored here.
export const SUSPECTS = [
  {
    id: 'steve',
    name: 'Steve',
    age: 26,
    role: 'Video-store clerk, former varsity athlete',
    profile:
      'Tall, athletic build. Argued publicly with Alex Morgan about a loan two weeks before the disappearance. Drives a brown sedan.',
    color: '#22d3ee',
  },
  {
    id: 'mike',
    name: 'Mike',
    age: 21,
    role: 'AV club organiser, basement radio hobbyist',
    profile:
      'Quiet and methodical. Former study partner of Alex Morgan. Runs a homemade transmitter from his family basement.',
    color: '#a78bfa',
  },
  {
    id: 'dustin',
    name: 'Dustin',
    age: 20,
    role: 'Electronics repair apprentice',
    profile:
      'Talkative and technical. Repairs radios and pagers at the Hawkins Electronics counter. Last person to see Alex at the arcade.',
    color: '#fbbf24',
  },
  {
    id: 'lucas',
    name: 'Lucas',
    age: 22,
    role: 'Outdoor-supply shop assistant',
    profile:
      'Knows the Hawkins woods better than anyone. Wears heavy hiking boots. Was on a delivery run the evening of the disappearance.',
    color: '#34d399',
  },
  {
    id: 'eddie',
    name: 'Eddie',
    age: 27,
    role: 'Garage band leader, part-time mechanic',
    profile:
      'Long dark hair, black denim jacket with band patches. Owns a dark panel van. Has a minor record for trespassing.',
    color: '#f43f5e',
  },
]

export const CASE = {
  number: 'CASE #1986-011',
  missingPerson: 'Alex Morgan',
  status: 'ACTIVE',
  lastSeen: 'Old Quarry Road, Hawkins — 9:40 PM, Friday 14 November 1986',
  description:
    'Alex Morgan, 23, a records clerk at the Hawkins municipal office, failed to return home after a late shift. Alex\'s bicycle was found abandoned beside Old Quarry Road with the chain intact and a torn notebook page nearby. Five people in Alex\'s circle have been identified as persons of interest. You have seven pieces of evidence to examine, one at a time. All characters and events are entirely fictional.',
}
