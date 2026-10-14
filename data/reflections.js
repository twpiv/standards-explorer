/* "Something to Think About": rhetorical prompts (provenance: suggested). Never answered, scored, or tracked.
   Selection order in the engine: PE-specific prompt for the current view -> PE-specific 'standard' prompt ->
   generic prompt for the current view. One prompt is shown at a time; teachers can ask for another, dismiss, or save.
   Views: standard, prior, related, threeD, phenomena
*/
window.SE = window.SE || {}; SE.data = SE.data || {};

SE.data.reflections = {
  generic: {
    standard: [
      'If a student mastered every topic in your current unit on this idea, would they be able to do what this performance expectation describes?',
      'Which word in this performance expectation would most change your instruction if you took it seriously?'
    ],
    prior: [
      'What would you want to find out about students’ prior understanding before beginning instruction?',
      'Are you introducing this idea, or helping students develop a more sophisticated understanding of it?'
    ],
    related: [
      'Could students investigate these ideas together rather than encountering them months apart?',
      'What scientific understanding would students carry from one investigation into the next?'
    ],
    threeD: [
      'Does knowing the scientific information demonstrate everything this performance expectation requires?',
      'What could students produce or explain that would make their understanding visible?'
    ],
    phenomena: [
      'Would students need this standard’s idea to explain the phenomenon, or could they explain it without it?',
      'What question would your students ask first if they saw this phenomenon without any introduction?'
    ]
  },

  byStandard: {
    'HS-PS2-1': {
      standard: [ 'Which parts of your traditional kinematics unit actually develop evidence toward this performance expectation?' ],
      prior: [ 'If middle school students have already investigated how net force and mass affect motion, what should be different about their high school experience?' ],
      related: [ 'If momentum and collision design were investigated alongside Newton’s second law, would students see force as a cause rather than a formula?' ],
      threeD: [ 'Could a student solve every F = ma problem correctly and still be unable to show this performance?' ],
      phenomena: [ 'Which of these phenomena would require students to analyze data, rather than just apply an equation?' ]
    },
    'HS-PS2-2': {
      standard: [ 'When students calculate momentum before and after a collision, how do they decide what counts as “the system”?' ]
    },
    'HS-PS2-3': {
      standard: [ 'In a typical egg-drop project, how much of students’ design reasoning uses physics, and how much is trial and error?' ]
    },
    'HS-PS3-1': {
      standard: [ 'The clarification emphasizes explaining what the mathematical expressions mean. How often do students explain a term in an energy equation rather than just calculate it?' ]
    },
    'HS-PS3-2': {
      standard: [ 'If every form of energy is motion, position, or both, what happens to the list of “forms of energy” you might have taught?' ]
    },
    'HS-PS1-1': {
      standard: [ 'If students used the periodic table only to look things up, would they ever treat it as a model that can be wrong or limited?' ]
    },
    'HS-PS1-3': {
      standard: [ 'The clarification steers away from naming specific intermolecular forces. What would students do instead with that instructional time?' ]
    },
    'HS-PS1-7': {
      standard: [ 'If middle school students already modeled why mass is conserved, what does the mathematics add at high school?' ],
      prior: [ 'Grade 5 students were expected to show weight is conserved when substances mix. Would your students recognize stoichiometry as the same idea?' ]
    },
    'HS-PS1-4': {
      related: [ 'If biology asks students to describe respiration as bonds breaking and forming, could chemistry and biology use the same model?' ]
    },
    'HS-LS1-5': {
      prior: [ 'Students were expected to argue in grade 5 that plants get their materials mainly from air and water. How many of your students still believe the mass comes from soil?' ]
    },
    'HS-LS1-7': {
      related: [ 'Would students recognize the bond-energy model from chemistry if they met it in biology first, or the other way around?' ]
    },
    'HS-LS3-1': {
      threeD: [ 'The practice here is asking questions. What would a strong question about DNA and chromosomes look like from your students?' ]
    },
    'HS-LS4-2': {
      prior: [ 'Third graders were expected to explain how variation can provide survival and reproductive advantages. What is genuinely new for your high school students?' ]
    },
    'HS-LS2-1': {
      standard: [ 'Where do students get to use mathematics or computation to explain an ecosystem, rather than to label one?' ]
    }
  }
};
