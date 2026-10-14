/* Curated teacher-facing interpretations for "What Is This Standard Really Asking Students to Do?"
   ALL text in this file is app-written interpretation (provenance: suggested). It was drafted with AI assistance
   during development and reviewed against the official PE wording, NGSS foundation boxes, and the clarification /
   assessment-boundary paraphrases in the reference pack. Official wording is never stored here; it comes from
   data/generated/standards.js.

   Fields
     bigIdea       The Big Scientific Idea
     demonstrate   What Students Must Demonstrate
     within        What Falls Within This Expectation? (list)
     beyond        Commonly taught content that this PE alone does not require (list), to separate PE scope from a unit
     boundaries    Important Boundaries: what clarification and assessment boundary say about depth
     phrases       Clickable phrases in the official PE text -> { dim: 'SEP'|'DCI'|'CCC', ref, note }
                   (phrase must appear verbatim in the PE text; checked by the validator)
     threeD        One paragraph on how the three dimensions combine into a single performance
     evidence      "What Might Evidence of This Learning Look Like?" (2-3 illustrations, not assessments)
     reviewed      Date of last content review
*/
window.SE = window.SE || {}; SE.data = SE.data || {};

SE.data.interpretations = {

  /* ===================================== PHYSICS ===================================== */

  'HS-PS2-1': {
    bigIdea: 'The acceleration of a macroscopic object is caused by the net (unbalanced) force on it and is inversely related to its mass. Newton’s second law, a = F_net / m, is a quantitative, predictive relationship, not just a statement that “forces change motion.”',
    demonstrate: 'Students analyze data (tables or graphs of position or velocity over time, force and acceleration measurements) and use that analysis to support the claim that net force, mass, and acceleration are related mathematically. The performance is evidence-based reasoning from data, not recall or plug-and-chug use of F = ma.',
    within: [
      'Identifying the forces on an object and determining the net force in one dimension',
      'Using motion data to determine acceleration (for example, the slope of a velocity–time graph)',
      'Recognizing that acceleration is proportional to net force for a fixed mass and inversely proportional to mass for a fixed net force',
      'Explaining what the data show and how strongly they support the mathematical relationship',
      'Treating cause (net force) and effect (change in motion) explicitly'
    ],
    beyond: [
      'Two-dimensional projectile motion and vector resolution of motion',
      'Memorizing and drilling the four kinematic equations for their own sake',
      'Circular motion, friction coefficients, inclined-plane problem sets, and pulley systems as standalone topics',
      'Newton’s third law and momentum (addressed elsewhere: MS-PS2-1, HS-PS2-2)'
    ],
    boundaries: 'The NGSS clarification points to data such as position or velocity over time for objects under an unbalanced force (for example, a falling object or an object pulled by a constant force). The assessment boundary limits the expectation to one-dimensional motion of macroscopic objects at non-relativistic speeds. Kinematics is the language students use to describe the evidence; it is not the target. The target is a causal, mathematical relationship among net force, mass, and acceleration.',
    phrases: {
      'Analyze data': { dim: 'SEP', ref: 'SEP4', note: 'The practice at the heart of this PE. Students organize and interpret data (often graphs of velocity versus time, or acceleration versus force) to find the relationship and judge how well the data support it. At the high school level this includes comparing data sets and attending to uncertainty.' },
      'support the claim': { dim: 'SEP', ref: 'SEP4', note: 'Students are not asked to discover an unknown law or to recite it. They use their analysis as evidence for a stated claim, which makes the strength and limits of the evidence part of the work.' },
      'Newton’s second law of motion': { dim: 'DCI', ref: 'PS2.A', note: 'PS2.A Forces and Motion: Newton’s second law accurately predicts changes in the motion of macroscopic objects.' },
      'mathematical relationship': { dim: 'DCI', ref: 'PS2.A', note: 'The step beyond middle school. In MS-PS2-2 students provided evidence that change in motion depends on net force and mass. Here the relationship must be quantitative.' },
      'net force': { dim: 'CCC', ref: 'CCC2', note: 'Cause and Effect: the net force is the cause; the change in motion is the effect. Students can use the relationship to predict the effect of changing the cause.' },
      'macroscopic object': { dim: 'DCI', ref: 'PS2.A', note: 'Signals the scope: everyday-sized objects at ordinary speeds, where Newtonian mechanics applies without relativistic or quantum corrections.' }
    },
    threeD: 'Students use data analysis (SEP) to make sense of how net force and mass determine acceleration (DCI PS2.A), reasoning about the force as the cause of the change in motion (CCC Cause and Effect). A student who can state F = ma but cannot use data to support it has not yet shown this performance. Neither has a student who can graph data but does not connect the graph to the causal relationship.',
    evidence: [
      'Students analyze velocity–time data from a cart pulled by several different hanging masses, then argue whether the resulting acceleration-versus-force graph supports a proportional relationship, including what the intercept and scatter mean.',
      'Students predict how a loaded cart’s acceleration will change if mass doubles while net force is held constant, then compare that prediction with motion-sensor data and explain any discrepancy (for example, friction).',
      'Given video-analysis data of a falling coffee filter, students explain why the acceleration changes as it falls by identifying how the net force changes.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS2-2': {
    bigIdea: 'Momentum (mass × velocity) is a conserved quantity: when no net external force acts on a system, the total momentum of the system stays the same, even though objects within it exchange momentum.',
    demonstrate: 'Students use mathematical representations (equations, momentum bar charts, tables of before-and-after values) to support the claim that total momentum is conserved for a system with no net external force. They must also explain qualitatively what conservation means.',
    within: [
      'Defining the system and recognizing when the net external force is (approximately) zero',
      'Calculating momentum before and after an interaction for two objects in one dimension',
      'Using the sign of velocity to represent direction in one dimension',
      'Explaining the qualitative meaning of conservation: momentum gained by one object is lost by the other'
    ],
    beyond: [
      'Two-dimensional collisions and vector momentum problems',
      'Classifying collisions as elastic or inelastic with kinetic energy calculations (that energy accounting connects to HS-PS3-1)',
      'Impulse problems as an algebra exercise disconnected from the conservation claim',
      'Systems of more than two bodies'
    ],
    boundaries: 'The clarification emphasizes both the quantitative conservation of momentum and the qualitative meaning of the principle. The assessment boundary limits it to systems of two macroscopic bodies moving in one dimension.',
    phrases: {
      'Use mathematical representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: the mathematics is the evidence. Students use calculations or representations of momentum to support a claim, not just to get an answer.' },
      'total momentum of a system of objects is conserved': { dim: 'DCI', ref: 'PS2.A', note: 'PS2.A Forces and Motion: if a system interacts with objects outside itself, the total momentum of the system can change, but any such change is balanced by changes in the momentum of objects outside the system.' },
      'system of objects': { dim: 'CCC', ref: 'CCC4', note: 'Systems and System Models: conservation depends on where the system boundary is drawn. Choosing the system is part of the reasoning.' },
      'no net force on the system': { dim: 'CCC', ref: 'CCC4', note: 'The condition under which conservation holds. Students should be able to reason about whether real situations, such as carts with friction, approximately meet it.' }
    },
    threeD: 'Students use mathematical representations (SEP) to show that momentum is conserved (DCI PS2.A), and the claim only makes sense once a system is defined (CCC Systems and System Models). Correct momentum arithmetic without attention to the system boundary misses part of the performance.',
    evidence: [
      'Students record before-and-after velocities of two carts in collisions and explosions on a track, compute total momentum, and decide whether the small differences are within measurement uncertainty or signal an external force.',
      'Students draw momentum bar charts for a collision between a loaded and an unloaded cart and use them to predict the final velocity of the combined carts.',
      'Students explain why the momentum of a single cart changes in a collision but the momentum of the two-cart system does not.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS2-3': {
    bigIdea: 'The force on an object during a collision depends on how quickly its momentum changes. Spreading the same change in momentum over a longer time reduces the peak force, and engineers use this idea to protect objects and people.',
    demonstrate: 'Students apply scientific ideas (force, change in momentum, collision time) and engineering ideas (criteria, constraints, testing, optimization) to design, evaluate, and refine a device that reduces the force on an object during a collision.',
    within: [
      'Explaining why increasing collision time reduces force for the same change in momentum',
      'Defining criteria and constraints for a protective device',
      'Testing a prototype, evaluating its performance against criteria, and refining it',
      'Using qualitative reasoning and/or algebraic relationships (F = Δp/Δt) to justify design choices'
    ],
    beyond: [
      'Detailed impulse calculations unconnected to a design',
      'Material science of specific foams or airbag chemistry',
      'Full crash-reconstruction physics'
    ],
    boundaries: 'Evaluation could include testing how well a device protects an object and then modifying it; football helmets and parachutes are given as examples. The assessment boundary limits the work to qualitative evaluations and/or algebraic manipulations.',
    phrases: {
      'Apply scientific and engineering ideas to design, evaluate, and refine': { dim: 'SEP', ref: 'SEP6', note: 'Constructing Explanations and Designing Solutions: the design cycle is the performance. Students design, test, evaluate, and refine using physics ideas as justification.' },
      'minimizes the force on a macroscopic object during a collision': { dim: 'DCI', ref: 'PS2.A', note: 'PS2.A Forces and Motion, applied: the same momentum change over a longer time means a smaller average force. Secondary DCIs ETS1.A and ETS1.C bring in defining problems and optimizing solutions.' },
      'device': { dim: 'DCI', ref: 'ETS1.C', note: 'ETS1.C Optimizing the Design Solution (secondary): criteria may need to be broken down or prioritized, and testing informs refinement.' }
    },
    threeD: 'Students design and refine a solution (SEP) by reasoning about how force relates to change in momentum and collision time (DCI PS2.A with ETS1.A/ETS1.C), paying attention to what causes the force to be large or small (CCC Cause and Effect).',
    evidence: [
      'Students build an egg-protection or cart-bumper device, measure peak force or deceleration with a force sensor, and use the data to justify one specific refinement.',
      'Students compare two helmet liner designs using the idea of collision time and explain the trade-off between padding thickness and other constraints such as mass or cost.',
      'Students write a design rationale that uses F = Δp/Δt to explain why their final device performs better than their first version.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS2-4': {
    bigIdea: 'Gravitational and electrostatic forces act at a distance and follow similar inverse-square mathematical forms. Gravitational force depends on masses and electric force depends on charges, and both weaken with the square of the separation.',
    demonstrate: 'Students use the mathematical forms of Newton’s law of gravitation and Coulomb’s law to describe and predict forces between objects, reasoning about how force changes when mass, charge, or distance changes.',
    within: [
      'Using F = Gm₁m₂/r² and F = kq₁q₂/r² to calculate and compare forces',
      'Proportional reasoning: what happens to the force if distance doubles or a charge triples',
      'Comparing the relative strengths of gravitational and electric forces',
      'Conceptual descriptions of gravitational and electric fields'
    ],
    beyond: [
      'Systems of more than two objects or vector superposition of fields',
      'Electric potential, capacitance, and circuits',
      'Orbital mechanics calculations (addressed in HS-ESS1-4)'
    ],
    boundaries: 'The clarification emphasizes both quantitative and conceptual descriptions of gravitational and electric fields. The assessment boundary limits it to systems of two objects.',
    phrases: {
      'Use mathematical representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: the force laws are used to describe and predict, including proportional reasoning about how force scales with distance.' },
      'Newton’s law of gravitation and Coulomb’s law': { dim: 'DCI', ref: 'PS2.B', note: 'PS2.B Types of Interactions: Newton’s law of universal gravitation and Coulomb’s law provide the mathematical models to describe and predict the effects of gravitational and electrostatic forces between distant objects.' },
      'describe and predict': { dim: 'CCC', ref: 'CCC1', note: 'Patterns: the shared inverse-square pattern lets students predict forces and recognize a common mathematical structure across very different interactions.' }
    },
    threeD: 'Students use mathematical representations (SEP) of two force laws (DCI PS2.B) and notice the common mathematical pattern that lets them predict behavior across scales (CCC Patterns).',
    evidence: [
      'Students predict how the gravitational force between Earth and a satellite changes as the satellite’s orbital radius doubles, then check the prediction against published data.',
      'Students compare the electric and gravitational forces between two protons and explain why gravity dominates at planetary scales anyway.',
      'Students analyze force-versus-distance data from a charged-sphere simulation and decide whether it follows an inverse-square pattern.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS2-5': {
    bigIdea: 'Electricity and magnetism are linked: an electric current produces a magnetic field, and a changing magnetic field can produce (induce) an electric current. This is the basis of motors, generators, and transformers.',
    demonstrate: 'Students plan and conduct investigations that produce evidence for both directions of the relationship: current to field, and changing field to current.',
    within: [
      'Investigating the magnetic field around a current-carrying wire or coil',
      'Investigating induced current from a moving magnet or changing current in a nearby coil',
      'Identifying variables (current, number of turns, speed of motion) and their effects',
      'Using the evidence to connect to energy transfer in generators and motors'
    ],
    beyond: [
      'Right-hand rules and Lenz’s law as memorized procedures',
      'Faraday’s law calculations',
      'AC circuit analysis'
    ],
    boundaries: 'NGSS lists no clarification statement. The assessment boundary limits the expectation to designing and conducting investigations with provided materials and tools.',
    phrases: {
      'Plan and conduct an investigation': { dim: 'SEP', ref: 'SEP3', note: 'Planning and Carrying Out Investigations: students decide what to vary, what to observe, and how to make the evidence convincing. The PE is not satisfied by watching a demonstration.' },
      'an electric current can produce a magnetic field': { dim: 'DCI', ref: 'PS2.B', note: 'PS2.B Types of Interactions: magnets or electric currents cause magnetic fields; electric charges or changing magnetic fields cause electric fields.' },
      'a changing magnetic field can produce an electric current': { dim: 'CCC', ref: 'CCC2', note: 'Cause and Effect: the cause is the change in the field, not the field itself. A stationary magnet in a coil produces no current.' }
    },
    threeD: 'Students investigate (SEP) the two-way link between electricity and magnetism (DCI PS2.B, PS3.A) by identifying what causes what (CCC Cause and Effect).',
    evidence: [
      'Students design a test showing that a compass needle deflects only when current flows in a nearby wire, and that reversing the current reverses the deflection.',
      'Students move a magnet through coils with different numbers of turns at different speeds, record galvanometer readings, and summarize which factors increase the induced current.',
      'Students explain, from their own evidence, why a hand-crank generator becomes harder to turn when a bulb is connected.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS3-1': {
    bigIdea: 'Energy is conserved. The change in energy of one part of a system equals the energy transferred in or out of that part, so if you know the other changes and flows you can calculate the unknown one.',
    demonstrate: 'Students create a computational model (spreadsheet, simple program, or algebraic model) that calculates the energy change of one component from known changes in the other components and the energy flows across the system boundary, and they explain what the mathematical expressions mean.',
    within: [
      'Defining a system and its components, and identifying energy flows across the boundary',
      'Expressions for kinetic, gravitational potential, thermal, and simple electric or magnetic energy',
      'Building an energy-accounting model that sums to zero change in total energy for a closed system',
      'Explaining the meaning of each term in the model'
    ],
    beyond: [
      'Calculus-based work and power derivations',
      'Thermodynamic cycles and heat engines',
      'Systems with more than three components'
    ],
    boundaries: 'The clarification emphasizes explaining the meaning of the mathematical expressions used in the model. The assessment boundary limits the work to basic algebra and to systems of two or three components, with thermal, kinetic, and/or the energies in gravitational, magnetic, or electric fields.',
    phrases: {
      'Create a computational model': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: students build the model, which can be a spreadsheet, a short program, or an algebraic accounting, and use it to calculate.' },
      'change in the energy of one component in a system': { dim: 'DCI', ref: 'PS3.B', note: 'PS3.B Conservation of Energy and Energy Transfer: the total change of energy in any system is always equal to the total energy transferred into or out of the system.' },
      'energy flows in and out of the system': { dim: 'CCC', ref: 'CCC4', note: 'Systems and System Models: the boundary determines what counts as a flow and what counts as an internal change.' }
    },
    threeD: 'Students build a computational model (SEP) that applies energy conservation and energy definitions (DCI PS3.A, PS3.B) to a clearly defined system with components and boundary flows (CCC Systems and System Models).',
    evidence: [
      'Students build a spreadsheet that tracks kinetic, gravitational, and thermal energy for a cart rolling down a ramp, then use measured speeds to infer how much energy became thermal.',
      'Students model a falling object with air resistance and explain why the model’s total energy for the object alone is not constant.',
      'Students calculate the final temperature of mixed water samples with a model and explain why measured values differ.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS3-2': {
    bigIdea: 'At the macroscopic scale, all energy can be accounted for as energy of motion of particles or objects, energy of their relative positions, or a combination. “Forms” of energy such as thermal, chemical, or elastic are combinations of these two.',
    demonstrate: 'Students develop and use models (diagrams, drawings, descriptions, simulations) that show energy as motion-related and position-related, and use those models to explain phenomena.',
    within: [
      'Kinetic energy of objects and of particles (thermal energy)',
      'Potential energy as energy of relative position in a field (gravitational, elastic, electric)',
      'Modeling transformations, such as kinetic energy becoming thermal energy',
      'Recognizing energy stored in fields, such as between charged plates'
    ],
    beyond: [
      'Lists of “forms of energy” to memorize',
      'Calculating potential energy for complex fields',
      'Quantum descriptions of energy levels'
    ],
    boundaries: 'Examples include kinetic energy becoming thermal energy, energy stored by height, and energy stored between charged plates. Models may be diagrams, drawings, descriptions, or simulations. No assessment boundary is listed.',
    phrases: {
      'Develop and use models': { dim: 'SEP', ref: 'SEP2', note: 'Developing and Using Models: students both construct a model and use it to explain or predict, across scales from a roller coaster to particles.' },
      'energy associated with the motion of particles (objects)': { dim: 'DCI', ref: 'PS3.A', note: 'PS3.A Definitions of Energy: energy is a quantitative property of a system that depends on the motion and interactions of matter and radiation within that system.' },
      'energy associated with the relative position of particles (objects)': { dim: 'DCI', ref: 'PS3.A', note: 'Potential energy belongs to the arrangement of interacting objects, not to a single object.' },
      'macroscopic scale': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: tracking energy across scales, so that macroscopic observations are explained by particle motion and position.' }
    },
    threeD: 'Students model (SEP) energy as motion and relative position (DCI PS3.A) and track it across systems and scales (CCC Energy and Matter).',
    evidence: [
      'Students draw particle-level models of a bouncing ball before, at, and after impact, showing where kinetic energy goes when the ball doesn’t return to its original height.',
      'Students use a simulation of charged plates to explain why separating opposite charges stores energy.',
      'Students explain why “chemical energy” can be described as energy of particle positions.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS3-3': {
    bigIdea: 'Energy can be converted from one form to another, but every real conversion also transfers some energy to unintended forms (often thermal). Engineering an energy converter means working within constraints to make the desired conversion efficient and useful.',
    demonstrate: 'Students design, build, and refine a device that converts energy from one form to another within given constraints, and evaluate it qualitatively and quantitatively.',
    within: [
      'Identifying input and desired output energy for a device',
      'Measuring or estimating output for a given input (efficiency)',
      'Refining a design based on test results within constraints',
      'Explaining energy losses in terms of energy transfer'
    ],
    beyond: [
      'Detailed electrical engineering of generators',
      'Semiconductor physics of solar cells',
      'Formal cost-benefit analysis of energy systems (connects to HS-ESS3-2)'
    ],
    boundaries: 'Example devices include Rube Goldberg machines, wind turbines, solar cells, solar ovens, and generators. The assessment boundary limits quantitative evaluation to total output for a given input and requires devices to be built from provided materials.',
    phrases: {
      'Design, build, and refine a device': { dim: 'SEP', ref: 'SEP6', note: 'Constructing Explanations and Designing Solutions: an iterative design cycle grounded in energy ideas.' },
      'works within given constraints': { dim: 'DCI', ref: 'ETS1.A', note: 'ETS1.A Defining and Delimiting Engineering Problems (secondary): criteria and constraints shape what counts as a successful design.' },
      'convert one form of energy into another form of energy': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: tracking where energy goes, including into unintended thermal energy.' }
    },
    threeD: 'Students design and refine (SEP) an energy-converting device using ideas about energy and its transfer (DCI PS3.A, PS3.D, ETS1.A), tracking energy through the system (CCC Energy and Matter).',
    evidence: [
      'Students build a small wind turbine, measure electrical output for a fan at fixed speed, and justify one design change using energy-transfer reasoning.',
      'Students compare temperature gain in two solar oven designs and explain the difference with energy flows.',
      'Students document the efficiency of a hand-crank generator at different loads and explain what limits it.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS4-1': {
    bigIdea: 'For any wave, speed equals frequency times wavelength. The speed is set by the medium, so when a wave enters a new medium its speed and wavelength change while its frequency stays the same.',
    demonstrate: 'Students use mathematical representations to support a claim about relationships among frequency, wavelength, and speed in various media.',
    within: [
      'Using v = fλ for mechanical and electromagnetic waves',
      'Reasoning about which quantities change when a wave enters a new medium',
      'Comparing wave speeds in different media, such as sound in air and water or light in a vacuum and glass',
      'Using data, including seismic waves, as evidence'
    ],
    beyond: [
      'Snell’s law and refraction geometry',
      'Doppler effect calculations',
      'Wave interference patterns and standing-wave harmonics'
    ],
    boundaries: 'Examples of data include electromagnetic radiation in a vacuum and in glass, sound in air and water, and seismic waves through Earth. The assessment boundary limits the work to algebraic relationships, described qualitatively.',
    phrases: {
      'Use mathematical representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: the wave equation is evidence for a claim, with an emphasis on describing the relationships qualitatively.' },
      'frequency, wavelength, and speed of waves': { dim: 'DCI', ref: 'PS4.A', note: 'PS4.A Wave Properties: the wavelength and frequency of a wave are related to one another by the speed of travel of the wave, which depends on the type of wave and the medium.' },
      'traveling in various media': { dim: 'CCC', ref: 'CCC2', note: 'Cause and Effect: the medium is what causes the speed to change, and the speed change causes the wavelength change.' }
    },
    threeD: 'Students use mathematics (SEP) to relate wave properties (DCI PS4.A), reasoning about how the medium causes changes in speed and wavelength (CCC Cause and Effect).',
    evidence: [
      'Students compare the speed of sound measured in air with published values for water and steel, and use v = fλ to explain what happens to the wavelength of a 440 Hz tone in each.',
      'Students use P- and S-wave arrival times to argue how wave speed differs with depth in Earth.',
      'Students explain why the color of light does not change when it passes from air into water, even though its wavelength does.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-ESS1-4': {
    bigIdea: 'The same Newtonian gravitational laws that govern falling objects govern orbits. Kepler’s laws describe the patterns of orbital motion, and Newton’s law of gravitation explains and predicts them.',
    demonstrate: 'Students use mathematical or computational representations to predict the motion of planets, moons, and satellites.',
    within: [
      'Using Newton’s law of gravitation and Kepler’s laws to predict orbital periods or radii',
      'Computational models of orbits, such as spreadsheets that step through time',
      'Human-made satellites as well as natural bodies'
    ],
    beyond: [
      'Calculus-based derivations of orbits',
      'Systems of more than two bodies',
      'General relativity'
    ],
    boundaries: 'The clarification emphasizes Newtonian gravitational laws governing the orbits of planets, moons, and human-made satellites. The assessment boundary limits it to two-body systems and excludes calculus.',
    phrases: {
      'Use mathematical or computational representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: students predict motion from the laws, possibly with a step-by-step computational model.' },
      'predict the motion of orbiting objects': { dim: 'DCI', ref: 'ESS1.B', note: 'ESS1.B Earth and the Solar System: Kepler’s laws describe common features of the motions of orbiting objects; their elliptical paths around the sun result from gravitational forces.' },
      'solar system': { dim: 'CCC', ref: 'CCC3', note: 'Scale, Proportion, and Quantity: reasoning about enormous distances and periods, and how period scales with orbital radius.' }
    },
    threeD: 'Students use mathematical and computational thinking (SEP) to predict orbits (DCI ESS1.B, with PS2.B as the underlying force law), reasoning about how quantities scale (CCC Scale, Proportion, and Quantity).',
    evidence: [
      'Students use Kepler’s third law to predict the orbital period of a geostationary satellite and check it against 24 hours.',
      'Students build a spreadsheet that updates a satellite’s velocity and position each time step using gravitational force, and see an orbit emerge.',
      'Students use moon orbit data to estimate Jupiter’s mass.'
    ],
    reviewed: '2026-10-14'
  },

  /* ===================================== CHEMISTRY ===================================== */

  'HS-PS1-1': {
    bigIdea: 'The periodic table is a model: its arrangement reflects repeating patterns in the outermost electrons of atoms, and those patterns predict how elements behave relative to one another.',
    demonstrate: 'Students use the periodic table as a model to predict relative properties of main-group elements, such as reactivity, types and numbers of bonds formed, and reactions with oxygen, reasoning from outer-electron patterns.',
    within: [
      'Relating position in the table to the number of valence electrons',
      'Predicting relative reactivity of metals and nonmetals in a group or period',
      'Predicting the types and numbers of bonds an element tends to form',
      'Relative trends (not quantitative values) in properties such as ionization energy'
    ],
    beyond: [
      'Full electron configurations, orbital diagrams, and quantum numbers',
      'Memorizing the history of the periodic table',
      'Transition-metal chemistry',
      'Quantitative ionization-energy or electronegativity calculations'
    ],
    boundaries: 'Examples of properties include reactivity of metals, types of bonds formed, numbers of bonds formed, and reactions with oxygen. The assessment boundary limits the expectation to main-group elements and to relative trends rather than quantitative ionization energy values.',
    phrases: {
      'Use the periodic table as a model': { dim: 'SEP', ref: 'SEP2', note: 'Developing and Using Models: the table is treated as a predictive model with patterns and limits, not a chart to memorize.' },
      'predict the relative properties of elements': { dim: 'CCC', ref: 'CCC1', note: 'Patterns: patterns in the table predict properties, and students reason about why the patterns exist.' },
      'patterns of electrons in the outermost energy level of atoms': { dim: 'DCI', ref: 'PS1.A', note: 'PS1.A Structure and Properties of Matter: the periodic table orders elements by the number of protons and places those with similar chemical properties in columns; the repeating patterns reflect patterns of outer electron states.' }
    },
    threeD: 'Students use a model (SEP) of atomic structure and the periodic table (DCI PS1.A, with PS2.B secondary) to explain and predict through patterns (CCC Patterns).',
    evidence: [
      'Students predict which of lithium, sodium, and potassium reacts most vigorously with water and explain the prediction in terms of outer electrons, before watching video evidence.',
      'Students predict the formula of the compound formed between magnesium and chlorine using the table, then explain why.',
      'Students explain why noble gases rarely form compounds using the outer-electron model.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS1-2': {
    bigIdea: 'The outcome of a simple chemical reaction (what forms, and in what ratio) can be explained by the outer electron states of the atoms involved, periodic trends, and known patterns of chemical properties.',
    demonstrate: 'Students construct an explanation for the outcome of a simple reaction and revise it in light of new evidence, using electron states, periodic trends, and patterns.',
    within: [
      'Explaining products of reactions such as sodium with chlorine, or combustion of carbon and hydrogen compounds',
      'Using valence electrons and periodic trends to justify product formulas',
      'Revising an explanation when evidence contradicts a prediction'
    ],
    beyond: [
      'Classifying reactions into five named types as a memorization exercise',
      'Balancing complex redox reactions',
      'Reaction mechanisms'
    ],
    boundaries: 'Example reactions include sodium and chlorine, carbon and oxygen, and carbon and hydrogen. The assessment boundary limits the expectation to main-group elements and combustion reactions.',
    phrases: {
      'Construct and revise an explanation': { dim: 'SEP', ref: 'SEP6', note: 'Constructing Explanations and Designing Solutions: the word “revise” matters. Students’ explanations should change in response to evidence.' },
      'outcome of a simple chemical reaction': { dim: 'DCI', ref: 'PS1.B', note: 'PS1.B Chemical Reactions: the fact that atoms are conserved, together with knowledge of chemical properties of the elements involved, can be used to describe and predict chemical reactions.' },
      'trends in the periodic table': { dim: 'CCC', ref: 'CCC1', note: 'Patterns: periodic trends are the pattern evidence used in the explanation.' }
    },
    threeD: 'Students construct and revise explanations (SEP) of reaction outcomes using atomic structure and reaction ideas (DCI PS1.A, PS1.B) and periodic patterns (CCC Patterns).',
    evidence: [
      'Students predict the product of burning methane, compare the prediction with evidence (water condensation, limewater test), and revise their explanation.',
      'Students explain why sodium and chlorine combine 1:1 while magnesium and chlorine combine 1:2.',
      'Students write an explanation of a reaction, receive a surprising data point, and document how their explanation changed.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS1-3': {
    bigIdea: 'Bulk properties of substances (melting point, boiling point, vapor pressure, surface tension) are evidence of the strength of electrical attractions between their particles.',
    demonstrate: 'Students plan and conduct an investigation that gathers evidence on bulk properties and use it to infer the relative strength of forces between particles.',
    within: [
      'Measuring or comparing bulk properties of several substances',
      'Inferring relative attractive forces between particles from those properties',
      'Linking particle structure to observable behavior'
    ],
    beyond: [
      'Naming and classifying specific intermolecular forces (dipole-dipole, London, hydrogen bonding) as the goal',
      'Raoult’s law and vapor pressure calculations',
      'Phase diagrams in detail'
    ],
    boundaries: 'The clarification emphasizes understanding the strengths of forces between particles, not naming specific intermolecular forces. Evidence includes melting point, boiling point, vapor pressure, and surface tension. The assessment boundary excludes Raoult’s law calculations of vapor pressure.',
    phrases: {
      'Plan and conduct an investigation': { dim: 'SEP', ref: 'SEP3', note: 'Planning and Carrying Out Investigations: students design the comparison, choose substances and measurements, and judge whether the evidence is sufficient.' },
      'structure of substances at the bulk scale': { dim: 'DCI', ref: 'PS1.A', note: 'PS1.A Structure and Properties of Matter: the structure and interactions of matter at the bulk scale are determined by electrical forces within and between atoms.' },
      'infer the strength of electrical forces between particles': { dim: 'CCC', ref: 'CCC1', note: 'Patterns: patterns in bulk properties across substances point to differences at the particle scale. PS2.B Types of Interactions is secondary.' }
    },
    threeD: 'Students investigate (SEP) to infer particle-level forces (DCI PS1.A, PS2.B) from patterns in observable properties (CCC Patterns).',
    evidence: [
      'Students compare evaporation rates of water, ethanol, and acetone with temperature probes and rank the strength of attractions between particles.',
      'Students count how many drops of different liquids fit on a coin and connect the results to particle attraction.',
      'Students explain why salt has a much higher melting point than sugar using particle-scale reasoning.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS1-4': {
    bigIdea: 'Whether a reaction releases or absorbs energy depends on the difference between the energy needed to break bonds in the reactants and the energy released when bonds form in the products.',
    demonstrate: 'Students develop a model (molecular drawings, reaction diagrams, energy diagrams) that illustrates how changes in total bond energy determine whether a reaction system releases or absorbs energy, with energy conserved.',
    within: [
      'Bond breaking requires energy; bond forming releases energy',
      'Energy diagrams showing reactants, products, and net energy change',
      'Modeling energy conservation in a reaction system and its surroundings'
    ],
    beyond: [
      'Calculating enthalpy changes from tables of bond energies',
      'Hess’s law and calorimetry calculations',
      'Activation energy as a calculated value'
    ],
    boundaries: 'Models may include molecular-level drawings and diagrams of reactions, or graphs showing the relative energies of reactants and products, and should show that energy is conserved. The assessment boundary excludes calculating the total bond energy changes during a reaction from the bond energies of reactants and products.',
    phrases: {
      'Develop a model': { dim: 'SEP', ref: 'SEP2', note: 'Developing and Using Models: the model connects the molecular scale (bonds) to a measurable outcome (temperature change of surroundings).' },
      'release or absorption of energy from a chemical reaction system': { dim: 'DCI', ref: 'PS1.B', note: 'PS1.B Chemical Reactions: chemical processes are understood in terms of collisions and rearrangements of atoms into new molecules, with consequent changes in total binding energy matched by changes in kinetic energy.' },
      'changes in total bond energy': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: energy is tracked into and out of the reaction system. Changes of energy and matter in a system can be described as flows into, out of, and within that system.' }
    },
    threeD: 'Students model (SEP) bond energy changes in reactions (DCI PS1.A, PS1.B) while tracking energy across the system boundary (CCC Energy and Matter).',
    evidence: [
      'Students measure the temperature change when a hand warmer or a cold pack is activated, then draw an energy diagram explaining the result with bond breaking and forming.',
      'Students model combustion of methane at the particle level and explain why it releases energy even though bonds must break.',
      'Students critique the misconception that “breaking bonds releases energy.”'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS1-5': {
    bigIdea: 'Reactions happen when particles collide with enough energy and suitable orientation. Raising temperature or concentration increases the frequency and/or energy of collisions and so increases reaction rate.',
    demonstrate: 'Students apply collision-based reasoning and evidence to explain how changing temperature or concentration affects reaction rate.',
    within: [
      'Collision theory: frequency and energy of collisions',
      'Explaining temperature and concentration effects on rate',
      'Using rate data as evidence'
    ],
    beyond: [
      'Rate laws, rate constants, and reaction orders',
      'Catalysts, mechanisms, and surface area (not named in the PE)',
      'Arrhenius equation calculations'
    ],
    boundaries: 'The clarification emphasizes student reasoning about the number and energy of collisions between molecules. The assessment boundary limits the work to simple reactions with two reactants, evidence of temperature, concentration, and rate data, and qualitative relationships between rate and temperature.',
    phrases: {
      'Apply scientific principles and evidence to provide an explanation': { dim: 'SEP', ref: 'SEP6', note: 'Constructing Explanations: students explain, using collision principles and rate evidence.' },
      'rate at which a reaction occurs': { dim: 'DCI', ref: 'PS1.B', note: 'PS1.B Chemical Reactions: chemical processes, their rates, and whether or not energy is stored or released can be understood in terms of collisions of molecules and rearrangements of atoms.' },
      'changing the temperature or concentration': { dim: 'CCC', ref: 'CCC1', note: 'Patterns: patterns in rate data across conditions are the evidence. Different patterns may be observed at each of the scales at which a system is studied.' }
    },
    threeD: 'Students explain (SEP) rate changes using collisions of particles (DCI PS1.B) and patterns in rate data (CCC Patterns).',
    evidence: [
      'Students time the reaction of antacid tablets in water at several temperatures and explain the trend with a particle-collision model.',
      'Students explain why glow sticks glow brighter in hot water but last longer in the freezer.',
      'Students use a collision simulation to argue why doubling concentration increases rate.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS1-6': {
    bigIdea: 'In a reversible reaction at equilibrium, forward and reverse rates are equal. Changing conditions shifts the balance, and engineers can choose conditions that increase the amount of desired product.',
    demonstrate: 'Students refine the design of a chemical system by specifying a change in conditions that would increase product at equilibrium, and justify it with molecular-level reasoning.',
    within: [
      'Dynamic equilibrium as equal forward and reverse rates',
      'Le Chatelier’s principle applied to adding reactants or removing products',
      'Linking macroscopic changes to molecular behavior',
      'Framing it as a design refinement with criteria'
    ],
    beyond: [
      'Calculating equilibrium constants or concentrations',
      'ICE tables',
      'Changing several variables at once'
    ],
    boundaries: 'The clarification emphasizes applying Le Chatelier’s principle and refining designs of chemical reaction systems, including descriptions of the connection between changes made at the macroscopic level and what happens at the molecular level. The assessment boundary limits the work to specifying the change in only one variable at a time and excludes calculating equilibrium constants and concentrations.',
    phrases: {
      'Refine the design of a chemical system': { dim: 'SEP', ref: 'SEP6', note: 'Designing Solutions: equilibrium is approached as an engineering problem. ETS1.C Optimizing the Design Solution is secondary.' },
      'increased amounts of products at equilibrium': { dim: 'DCI', ref: 'PS1.B', note: 'PS1.B Chemical Reactions: in many situations a dynamic, condition-dependent balance between a reaction and its reverse determines the numbers of all types of molecules present.' },
      'specifying a change in conditions': { dim: 'CCC', ref: 'CCC7', note: 'Stability and Change: equilibrium is a stable state that can be disturbed and re-established.' }
    },
    threeD: 'Students refine a design (SEP) using ideas about reversible reactions (DCI PS1.B, ETS1.C), reasoning about how systems respond to change (CCC Stability and Change).',
    evidence: [
      'Students propose and justify one change to the conditions of ammonia production to increase yield, describing the molecular-level effect.',
      'Students observe the color shift in a cobalt chloride equilibrium when chloride is added and explain it at the particle level.',
      'Students explain why removing a product as it forms can drive a reaction toward completion.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS1-7': {
    bigIdea: 'Atoms are conserved in chemical reactions, so mass is conserved. The mole connects counting atoms to measuring mass, allowing quantitative predictions about reactants and products.',
    demonstrate: 'Students use mathematical representations, including proportional reasoning and the mole concept, to support the claim that atoms and therefore mass are conserved during a chemical reaction.',
    within: [
      'Balanced equations as statements of atom conservation',
      'Mole ratios and molar mass to connect particle counts to measurable mass',
      'Comparing measured masses before and after a reaction',
      'Using mathematics as evidence for conservation'
    ],
    beyond: [
      'Drilling complex multi-step stoichiometry problems as an end in itself',
      'Limiting reactant and percent-yield calculations for their own sake',
      'Complex chemical reactions'
    ],
    boundaries: 'The clarification emphasizes using mathematical ideas to communicate the proportional relationships between masses of atoms in reactants and products, and translating these relationships to the macroscopic scale using the mole. It also emphasizes students’ use of mathematical thinking rather than memorization and rote application of problem-solving techniques. The assessment boundary excludes complex chemical reactions.',
    phrases: {
      'Use mathematical representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: stoichiometry is the evidence for a claim, not an isolated skill.' },
      'atoms, and therefore mass, are conserved': { dim: 'DCI', ref: 'PS1.B', note: 'PS1.B Chemical Reactions: the fact that atoms are conserved, together with knowledge of the chemical properties of the elements involved, can be used to describe and predict chemical reactions.' },
      'during a chemical reaction': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: the total amount of matter is conserved within a closed system.' }
    },
    threeD: 'Students use mathematical reasoning (SEP) to support conservation of atoms in reactions (DCI PS1.B), tracking matter across the system (CCC Energy and Matter).',
    evidence: [
      'Students predict the mass of copper produced when a measured mass of iron reacts with copper(II) sulfate, then compare the prediction with their measured result.',
      'Students explain why a sealed bag of baking soda and vinegar keeps the same mass while an open beaker loses mass.',
      'Students use mole ratios to argue whether a given set of reactant and product masses could be correct.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-PS3-4': {
    bigIdea: 'When objects at different temperatures are combined in a closed system, thermal energy transfers until the temperatures become uniform. Energy spreads out and does not spontaneously concentrate (the second law of thermodynamics).',
    demonstrate: 'Students plan and conduct an investigation that provides evidence that thermal energy transfer in a closed system results in a more uniform energy distribution.',
    within: [
      'Mixing substances at different temperatures and measuring final temperatures',
      'Specific heat and mass as factors in the final temperature',
      'Explaining the direction of thermal energy transfer',
      'Evidence of energy spreading toward uniformity'
    ],
    beyond: [
      'Entropy calculations',
      'Heat engines and thermodynamic cycles',
      'Phase-change calorimetry problems as a standalone topic'
    ],
    boundaries: 'The clarification emphasizes analyzing data from student investigations and using mathematical thinking to describe the energy changes, for example by mixing liquids at different initial temperatures or adding objects at different temperatures to water. The assessment boundary limits investigations to materials and tools provided to students.',
    phrases: {
      'Plan and conduct an investigation': { dim: 'SEP', ref: 'SEP3', note: 'Planning and Carrying Out Investigations: students design a closed-system investigation and decide what to measure.' },
      'more uniform energy distribution among the components': { dim: 'DCI', ref: 'PS3.B', note: 'PS3.B Conservation of Energy and Energy Transfer: uncontrolled systems always evolve toward more stable states, that is, toward more uniform energy distribution.' },
      'closed system': { dim: 'CCC', ref: 'CCC4', note: 'Systems and System Models: a closed system is what makes the energy accounting possible.' },
      'second law of thermodynamics': { dim: 'DCI', ref: 'PS3.D', note: 'PS3.D Energy in Chemical Processes and Everyday Life: although energy cannot be destroyed, it can be converted to less useful forms.' }
    },
    threeD: 'Students investigate (SEP) thermal energy transfer (DCI PS3.B, PS3.D) in a defined, closed system (CCC Systems and System Models).',
    evidence: [
      'Students mix hot and cold water in a calorimeter, predict the final temperature, and explain the differences between predicted and measured values.',
      'Students drop heated metal samples into water and use the results to compare the metals’ abilities to store thermal energy.',
      'Students explain why ice in a drink melts but a cold drink never makes the ice colder.'
    ],
    reviewed: '2026-10-14'
  },

  /* ===================================== BIOLOGY ===================================== */

  'HS-LS1-1': {
    bigIdea: 'DNA sequences in genes code for the structure of proteins, and proteins carry out most of the work of cells. Specialized cells, organized into systems, carry out life’s essential functions because of the proteins they make.',
    demonstrate: 'Students construct an explanation based on evidence that connects DNA structure, protein structure, and the functions carried out by specialized cells.',
    within: [
      'Genes as regions of DNA that code for proteins',
      'Protein structure determining protein function',
      'Specialized cells performing functions through the proteins they make',
      'Evidence from examples such as sickle cell or enzyme mutations'
    ],
    beyond: [
      'Biochemical steps of transcription and translation',
      'Identifying specific cell types, tissue types, or whole body systems',
      'Specific protein structures and functions to memorize'
    ],
    boundaries: 'NGSS lists no clarification statement. The assessment boundary excludes identifying specific cell or tissue types, whole body systems, specific protein structures and functions, and the biochemistry of protein synthesis.',
    phrases: {
      'Construct an explanation based on evidence': { dim: 'SEP', ref: 'SEP6', note: 'Constructing Explanations: the explanation links three levels (DNA, protein, cell function) with evidence.' },
      'structure of DNA determines the structure of proteins': { dim: 'DCI', ref: 'LS1.A', note: 'LS1.A Structure and Function: all cells contain genetic information in the form of DNA; genes are regions in the DNA that contain the instructions that code for the formation of proteins.' },
      'carry out the essential functions of life': { dim: 'CCC', ref: 'CCC6', note: 'Structure and Function: the shape of a protein determines what it can do.' }
    },
    threeD: 'Students construct explanations (SEP) linking DNA, proteins, and cell function (DCI LS1.A) through structure–function reasoning (CCC Structure and Function).',
    evidence: [
      'Students explain, using sequence data, how a single base change in the hemoglobin gene leads to sickle-shaped red blood cells.',
      'Students explain why lactase persistence depends on a protein being made, using population and genetic evidence.',
      'Students model how a change in enzyme shape changes its function.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS1-5': {
    bigIdea: 'Photosynthesis transforms light energy into chemical energy stored in sugar molecules, as carbon dioxide and water are rearranged into sugars and oxygen.',
    demonstrate: 'Students use a model (diagram, chemical equation, conceptual model) to illustrate how matter and energy flow into and out of photosynthesis.',
    within: [
      'Inputs and outputs of photosynthesis as matter and energy',
      'Light energy becoming stored chemical energy in bonds',
      'Tracking atoms from carbon dioxide and water into sugar and oxygen'
    ],
    beyond: [
      'Light-dependent reactions and the Calvin cycle in detail',
      'Photosystem structures',
      'Memorizing chloroplast anatomy beyond what the model needs'
    ],
    boundaries: 'The clarification emphasizes illustrating inputs and outputs of matter and the transfer and transformation of energy in photosynthesis by plants and other photosynthesizing organisms, with diagrams, chemical equations, and conceptual models as examples. The assessment boundary excludes specific biochemical steps.',
    phrases: {
      'Use a model': { dim: 'SEP', ref: 'SEP2', note: 'Developing and Using Models: the model must show both matter and energy, not only the equation.' },
      'photosynthesis transforms light energy into stored chemical energy': { dim: 'DCI', ref: 'LS1.C', note: 'LS1.C Organization for Matter and Energy Flow in Organisms: the process of photosynthesis converts light energy to stored chemical energy by converting carbon dioxide plus water into sugars plus released oxygen.' },
      'stored chemical energy': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: tracking energy as it is transformed and matter as it is rearranged.' }
    },
    threeD: 'Students use a model (SEP) of photosynthesis (DCI LS1.C) to track matter and energy (CCC Energy and Matter).',
    evidence: [
      'Students use a model to explain where the mass of a growing tree comes from, tracking carbon atoms from the air.',
      'Students interpret data from a leaf-disk floating experiment under different light intensities and connect it to their model.',
      'Students explain why “plants get their energy from the soil” is incorrect.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS1-7': {
    bigIdea: 'Cellular respiration is a chemical process: bonds in food molecules and oxygen break, new bonds form in carbon dioxide and water, and the net result is a transfer of energy that cells use.',
    demonstrate: 'Students use a model to illustrate respiration as bond breaking and forming with a net transfer of energy, focusing on inputs and outputs.',
    within: [
      'Inputs and outputs of cellular respiration',
      'Bonds breaking and forming, with net energy released',
      'Matter conservation in respiration',
      'Energy transfer to processes in the cell'
    ],
    beyond: [
      'Glycolysis, the Krebs cycle, and the electron transport chain in detail',
      'ATP yield counts',
      'Mitochondrial membrane structures'
    ],
    boundaries: 'The clarification emphasizes the conceptual understanding of the inputs and outputs of cellular respiration. The assessment boundary excludes identifying the steps or specific processes involved.',
    phrases: {
      'Use a model': { dim: 'SEP', ref: 'SEP2', note: 'Developing and Using Models: a model that accounts for both matter and energy.' },
      'bonds of food molecules and oxygen molecules are broken': { dim: 'DCI', ref: 'LS1.C', note: 'LS1.C Organization for Matter and Energy Flow in Organisms: as matter and energy flow through different organizational levels of living systems, chemical elements are recombined in different ways to form different products.' },
      'net transfer of energy': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: energy cannot be created or destroyed. It moves between places and between objects and/or systems.' }
    },
    threeD: 'Students use a model (SEP) of respiration (DCI LS1.C) that tracks matter and energy (CCC Energy and Matter). It is the same bond-energy reasoning students use in chemistry for HS-PS1-4.',
    evidence: [
      'Students use a model to explain why a person loses mass when they exercise, tracking where the carbon atoms go.',
      'Students explain why breaking bonds in glucose and oxygen does not by itself release energy, using a bond-energy diagram.',
      'Students interpret CO₂ sensor data from germinating seeds and connect it to their respiration model.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS2-1': {
    bigIdea: 'The carrying capacity of an ecosystem (the population it can sustain) is set by interdependent factors such as resources, boundaries, climate, and competition, and it can be described and explored mathematically.',
    demonstrate: 'Students use mathematical and/or computational representations to support explanations of factors that affect carrying capacity at different scales.',
    within: [
      'Logistic-type population patterns and limiting factors',
      'Quantitative analysis of interdependent factors such as boundaries, resources, climate, and competition',
      'Using graphs, simulations, or spreadsheets as evidence'
    ],
    beyond: [
      'Deriving logistic growth equations',
      'Calculus-based population models',
      'Detailed predator–prey differential equations'
    ],
    boundaries: 'The clarification emphasizes quantitative analysis and comparison of the relationships among interdependent factors including boundaries, resources, climate, and competition. Examples of mathematical comparisons include graphs, charts, histograms, and population changes gathered from simulations or historical data sets. The assessment boundary excludes deriving mathematical equations to make comparisons.',
    phrases: {
      'Use mathematical and/or computational representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: graphs, simulations, and data sets support the explanation.' },
      'carrying capacity of ecosystems': { dim: 'DCI', ref: 'LS2.A', note: 'LS2.A Interdependent Relationships in Ecosystems: ecosystems have carrying capacities, which are limits to the numbers of organisms and populations they can support.' },
      'different scales': { dim: 'CCC', ref: 'CCC3', note: 'Scale, Proportion, and Quantity: the significance of a phenomenon depends on the scale, proportion, and quantity at which it occurs.' }
    },
    threeD: 'Students use mathematics and computation (SEP) to explain carrying capacity (DCI LS2.A) at different scales (CCC Scale, Proportion, and Quantity).',
    evidence: [
      'Students graph historical deer-population data and argue which limiting factors best explain the leveling off.',
      'Students run a population simulation with varied resources and compare the resulting carrying capacities.',
      'Students explain why carrying capacity can change when climate changes.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS2-4': {
    bigIdea: 'Matter cycles and energy flows through ecosystems. At each trophic level only a small fraction of energy is stored in new biomass, so biomass and energy decrease up a food web.',
    demonstrate: 'Students use mathematical representations to support claims about matter cycling and energy flow among organisms.',
    within: [
      'Energy pyramids and the approximately 10% pattern as an empirical generalization',
      'Calculations of energy or biomass across trophic levels',
      'Conservation of matter and energy across the ecosystem'
    ],
    beyond: [
      'Memorizing food-web vocabulary',
      'Detailed nutrient cycles as standalone topics',
      'Bioaccumulation calculations unless tied to the claim'
    ],
    boundaries: 'The clarification emphasizes using a mathematical model of stored energy in biomass to describe the transfer of energy from one trophic level to another, and that matter and energy are conserved as they move through an ecosystem. The assessment boundary is limited to proportional reasoning to describe the cycling of matter and flow of energy.',
    phrases: {
      'Use mathematical representations': { dim: 'SEP', ref: 'SEP5', note: 'Using Mathematics and Computational Thinking: proportional reasoning about energy and biomass.' },
      'cycling of matter and flow of energy': { dim: 'DCI', ref: 'LS2.B', note: 'LS2.B Cycles of Matter and Energy Transfer in Ecosystems: at each link upward in a food web, only a small fraction of the matter consumed at the lower level is transferred upward to produce growth and release energy in cellular respiration at the higher level.' },
      'among organisms in an ecosystem': { dim: 'CCC', ref: 'CCC5', note: 'Energy and Matter: energy flows through and matter cycles within the system.' }
    },
    threeD: 'Students use proportional reasoning (SEP) about trophic transfer (DCI LS2.B) while tracking matter and energy (CCC Energy and Matter).',
    evidence: [
      'Students calculate how much producer biomass supports a given mass of top predator and explain why there are so few top predators.',
      'Students explain where the “missing” 90% of energy goes at each level, connecting to cellular respiration.',
      'Students compare energy-pyramid data from two ecosystems and argue which supports more trophic levels.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS3-1': {
    bigIdea: 'DNA in chromosomes carries the instructions for traits. Each chromosome is a single DNA molecule with many genes, and offspring inherit chromosomes, and therefore genetic instructions, from parents.',
    demonstrate: 'Students ask questions that clarify how DNA and chromosomes code for traits passed from parents to offspring. The questioning practice is the performance.',
    within: [
      'Genes, chromosomes, and DNA as the physical basis of inheritance',
      'Not all DNA codes for proteins; some segments regulate',
      'Generating and refining testable or clarifying questions about inheritance'
    ],
    beyond: [
      'Phases of meiosis',
      'Biochemical mechanisms of specific steps',
      'Mendelian problem sets as an end in themselves'
    ],
    boundaries: 'NGSS lists no clarification statement. The assessment boundary excludes the phases of meiosis and the biochemical mechanism of specific steps in the process.',
    phrases: {
      'Ask questions to clarify relationships': { dim: 'SEP', ref: 'SEP1', note: 'Asking Questions and Defining Problems: an unusual primary practice for a genetics PE. The evidence of learning is the quality of students’ questions.' },
      'role of DNA and chromosomes in coding the instructions for characteristic traits': { dim: 'DCI', ref: 'LS3.A', note: 'LS3.A Inheritance of Traits: each chromosome consists of a single very long DNA molecule, and each gene on the chromosome is a particular segment of that DNA. LS1.A is secondary.' },
      'passed from parents to offspring': { dim: 'CCC', ref: 'CCC2', note: 'Cause and Effect: the causal chain from DNA to trait is what the questions should probe.' }
    },
    threeD: 'Students ask questions (SEP) about the molecular basis of inheritance (DCI LS3.A, LS1.A) that probe cause-and-effect relationships (CCC Cause and Effect).',
    evidence: [
      'Given a pedigree and a karyotype, students generate questions that distinguish what is known from what would need to be investigated.',
      'Students refine an initial question (“Why do I look like my mom?”) into questions that can be investigated with DNA or chromosome evidence.',
      'Students sort questions by whether they address DNA, chromosomes, or environment.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS3-2': {
    bigIdea: 'Inheritable genetic variation arises from new combinations of genes in meiosis, viable errors during DNA replication, and mutations caused by environmental factors.',
    demonstrate: 'Students make and defend a claim, based on evidence, about the sources of inheritable genetic variation.',
    within: [
      'Crossing over and independent assortment as sources of new combinations',
      'Replication errors and environmental mutagens',
      'Using data to support arguments about how variation occurs'
    ],
    beyond: [
      'Phases of meiosis as memorized steps',
      'DNA repair biochemistry',
      'Detailed mutagen chemistry'
    ],
    boundaries: 'The clarification emphasizes using data to support arguments for the way variation occurs. The assessment boundary excludes the phases of meiosis and the biochemical mechanism of specific steps in the process.',
    phrases: {
      'Make and defend a claim based on evidence': { dim: 'SEP', ref: 'SEP7', note: 'Engaging in Argument from Evidence: students defend a claim and respond to challenges.' },
      'inheritable genetic variations may result from new genetic combinations through meiosis': { dim: 'DCI', ref: 'LS3.B', note: 'LS3.B Variation of Traits: in sexual reproduction, chromosomes can sometimes swap sections during meiosis, creating new genetic combinations and thus more genetic variation.' },
      'mutations caused by environmental factors': { dim: 'CCC', ref: 'CCC2', note: 'Cause and Effect: environmental factors can cause mutations; not all variation is inherited.' }
    },
    threeD: 'Students argue from evidence (SEP) about sources of variation (DCI LS3.B) using cause-and-effect reasoning (CCC Cause and Effect).',
    evidence: [
      'Students use sibling DNA comparison data to defend the claim that meiosis produces unique combinations.',
      'Students evaluate UV exposure and mutation-rate data to argue about environmental causes of mutations.',
      'Students explain why identical twins can still differ genetically over time.'
    ],
    reviewed: '2026-10-14'
  },

  'HS-LS4-2': {
    bigIdea: 'Evolution by natural selection results primarily from four interacting factors: the potential for populations to grow, heritable variation, competition for limited resources, and differential survival and reproduction.',
    demonstrate: 'Students construct an explanation based on evidence that shows how each of the four factors contributes to evolution in a population.',
    within: [
      'The four factors and how they interact',
      'Using distribution graphs and proportional reasoning as evidence',
      'Examples such as antibiotic resistance, beak size, or coloration'
    ],
    beyond: [
      'Genetic drift, gene flow through migration, and co-evolution',
      'Hardy-Weinberg calculations',
      'Detailed history of Darwin and Wallace'
    ],
    boundaries: 'The clarification emphasizes using evidence to explain the influence each of the four factors has on the number of organisms, behaviors, morphology, or physiology, in terms of the ability to compete for limited resources and subsequent survival of individuals and adaptation of species. Examples of evidence include mathematical models such as simple distribution graphs and proportional reasoning. The assessment boundary excludes other mechanisms of evolution, such as genetic drift, gene flow through migration, and co-evolution.',
    phrases: {
      'Construct an explanation based on evidence': { dim: 'SEP', ref: 'SEP6', note: 'Constructing Explanations: each factor must be connected to evidence.' },
      'evolution primarily results from four factors': { dim: 'DCI', ref: 'LS4.B', note: 'LS4.B Natural Selection and LS4.C Adaptation: natural selection occurs only if there is both variation in the genetic information within a population and variation in the expression of that information that leads to differences in performance among individuals.' },
      'proliferation of those organisms that are better able to survive and reproduce': { dim: 'CCC', ref: 'CCC2', note: 'Cause and Effect: the four factors together cause changes in trait frequency; no single factor is sufficient.' }
    },
    threeD: 'Students construct explanations (SEP) of natural selection (DCI LS4.B, LS4.C) that connect causes to population-level effects (CCC Cause and Effect).',
    evidence: [
      'Students use Galápagos finch beak-depth data before and after a drought to explain the change in terms of all four factors.',
      'Students explain the rise of antibiotic-resistant bacteria in a hospital using each factor.',
      'Students critique an explanation that leaves out heritable variation.'
    ],
    reviewed: '2026-10-14'
  }
};
