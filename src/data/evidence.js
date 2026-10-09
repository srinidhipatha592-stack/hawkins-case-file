// Fictional evidence. Each `likelihoods[id]` is P(E | suspect is responsible):
// "how likely would we be to observe THIS evidence if THIS suspect did it?"
// They are NOT probabilities of guilt and need not sum to 1 across suspects.
// The `reasons` explain every likelihood so the analysis can justify the number.
export const EVIDENCE = [
  {
    id: 'cctv',
    type: 'CCTV FOOTAGE',
    short: 'Grainy gas-station camera footage near Old Quarry Road.',
    finding:
      'A gas-station camera 400 m from the scene captured a tall figure in a hooded jacket walking toward Old Quarry Road at 9:32 PM. Height is estimated at 6\'0" to 6\'2" with an athletic stride.',
    likelihoods: { steve: 0.8, mike: 0.25, dustin: 0.2, lucas: 0.3, eddie: 0.35 },
    reasons: {
      steve: 'Tall and athletic: a strong match for the figure.',
      mike: 'Average height, slim build: a weak match.',
      dustin: 'Noticeably shorter than the figure: a poor match.',
      lucas: 'Roughly the right height but a stockier build.',
      eddie: 'Tall enough, but his long hair and jacket would be visible.',
    },
  },
  {
    id: 'phone',
    type: 'PHONE LOCATION',
    short: 'Telephone-company records place a handset near the scene.',
    finding:
      'Records from the Hawkins mobile-carrier tower show a car-phone handset connected to the sector covering Old Quarry Road between 9:20 and 9:55 PM. The account is registered to a household that shares access with a garage business.',
    likelihoods: { steve: 0.4, mike: 0.3, dustin: 0.25, lucas: 0.35, eddie: 0.75 },
    reasons: {
      steve: 'Owns no car phone; could have borrowed one.',
      mike: 'No access to any such handset.',
      dustin: 'Repairs handsets but does not own one.',
      lucas: 'Delivery shop radio only; partial overlap.',
      eddie: 'Garage business account: the handset is plausibly his.',
    },
  },
  {
    id: 'footprint',
    type: 'FOOTPRINT ANALYSIS',
    short: 'Boot prints at the scene compared with suspect footwear.',
    finding:
      'Plaster casts show a size 11 boot with a deep lug sole, consistent with hiking or work boots. The stride suggests a person carrying weight or moving quickly.',
    likelihoods: { steve: 0.25, mike: 0.2, dustin: 0.3, lucas: 0.7, eddie: 0.6 },
    reasons: {
      steve: 'Wears smooth-soled sneakers.',
      mike: 'Wears small canvas shoes.',
      dustin: 'Size 9 sneakers: a poor fit.',
      lucas: 'Heavy hiking boots, size 11: strong match.',
      eddie: 'Wears work boots of a similar size: a good match.',
    },
  },
  {
    id: 'radio',
    type: 'RADIO SIGNAL',
    short: 'A strange transmission picked up on the town scanner.',
    finding:
      'At 9:41 PM the police scanner recorded a brief, repeating tone burst on an amateur frequency. Direction-finding places the source within a mile of Old Quarry Road, and the burst matches a home-built transmitter.',
    likelihoods: { steve: 0.2, mike: 0.6, dustin: 0.7, lucas: 0.25, eddie: 0.5 },
    reasons: {
      steve: 'No known radio equipment.',
      mike: 'Runs a homemade transmitter.',
      dustin: 'Builds and repairs radios: highest technical capability.',
      lucas: 'Only a basic shop CB radio.',
      eddie: 'Band uses wireless gear; modest chance of generating this.',
    },
  },
  {
    id: 'witness',
    type: 'WITNESS STATEMENT',
    short: 'A late-night dog walker reports someone near the scene.',
    finding:
      'A resident walking her dog at 9:45 PM saw a person with long dark hair, wearing a dark jacket with patches, near a parked vehicle on Old Quarry Road. She could not see the face.',
    likelihoods: { steve: 0.35, mike: 0.3, dustin: 0.25, lucas: 0.4, eddie: 0.8 },
    reasons: {
      steve: 'Short hair; the description fits poorly.',
      mike: 'Short hair, no patches.',
      dustin: 'Curly cap-covered hair; weak match.',
      lucas: 'Hat and jacket could be mistaken at night.',
      eddie: 'Long dark hair and patched jacket: a strong match.',
    },
  },
  {
    id: 'vehicle',
    type: 'VEHICLE RECORD',
    short: 'A plate-reader log records a dark van near the area.',
    finding:
      'A partial licence plate read at the Route 9 junction at 9:58 PM matches a dark panel van. Only two vans of this model are registered in Hawkins County.',
    likelihoods: { steve: 0.3, mike: 0.2, dustin: 0.15, lucas: 0.3, eddie: 0.85 },
    reasons: {
      steve: 'Drives a sedan; could have borrowed a van.',
      mike: 'No vehicle access.',
      dustin: 'No van; rides a bicycle.',
      lucas: 'Shop delivery van is a different model.',
      eddie: 'Owns a dark panel van of this model.',
    },
  },
  {
    id: 'final',
    type: 'FINAL CLUE',
    short: 'A forensic find that changes the whole picture.',
    finding:
      'Inside the back of the dark van, forensic officers found a torn page from Alex Morgan\'s notebook matching the one left beside the bicycle. A garage rag with the band\'s logo was wrapped around it.',
    likelihoods: { steve: 0.1, mike: 0.2, dustin: 0.15, lucas: 0.25, eddie: 0.9 },
    reasons: {
      steve: 'No connection to the van.',
      mike: 'No connection to the van.',
      dustin: 'No connection to the van.',
      lucas: 'A shop van could have been used, but unlikely.',
      eddie: 'The notebook page in his van is strongly consistent with his involvement.',
    },
  },
]
