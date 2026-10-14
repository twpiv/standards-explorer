/* Curated prior-learning progressions: "Where Have Students Encountered This Before?"

   For each curated HS PE:
     steps            Earlier PEs worth showing, with an app-written note on each one's role.
                      The ENGINE decides provenance, not this file: a step is "documented" only when the earlier PE
                      appears in the compiled NJDOE progression table under one of the HS PE's DCI components
                      (primary or secondary). Otherwise it is shown as a "suggested" connection. The validator
                      reports any step whose `expect` value disagrees with what the engine computes.
     ideaDevelops     How the scientific idea becomes more sophisticated (app-written; uses "students were expected to").
     practiceDevelops How the practice is revisited or extended (app-written, informed by NGSS Appendix F).
     newAtHS          What becomes more sophisticated at high school.
     gaps             Honest notes where the progression is not a neat chain.

   Wording rule: earlier PEs describe intended learning, not proof of mastery.
*/
window.SE = window.SE || {}; SE.data = SE.data || {};

SE.data.priorLearning = {

  'HS-PS2-1': {
    steps: [
      { code: 'K-PS2-1', expect: 'documented', label: 'Pushes and pulls change motion', role: 'Students were expected to plan and conduct a simple investigation comparing how different strengths or directions of pushes and pulls change an object’s motion. This is the first, qualitative cause-and-effect experience with force and motion.' },
      { code: 'K-PS2-2', expect: 'documented', label: 'Did the design change the motion?', role: 'Students analyzed data to decide whether a design (such as a ramp or barrier) changed an object’s speed or direction as intended. It is an early instance of using data about motion as evidence.' },
      { code: '3-PS2-1', expect: 'documented', label: 'Balanced and unbalanced forces', role: 'Students were expected to investigate the effects of balanced and unbalanced forces. They met the idea that only an unbalanced (net) force changes motion, which is the conceptual root of “net force.”' },
      { code: '3-PS2-2', expect: 'documented', label: 'Patterns predict future motion', role: 'Students measured motion to show that a pattern can predict future motion (for example, a pendulum or a ball rolling down a ramp). This is the earliest step toward describing motion with data.' },
      { code: 'MS-PS2-2', expect: 'documented', label: 'Motion depends on net force and mass', role: 'Students were expected to plan an investigation providing evidence that the change in an object’s motion depends on the sum of the forces and the object’s mass. The relationship is already identified, but qualitatively, and with an emphasis on planning the investigation.' },
      { code: 'MS-PS2-1', expect: 'documented', label: 'Newton’s third law in collisions', role: 'Students applied Newton’s third law to design a solution for colliding objects. It is not a prerequisite for HS-PS2-1, but it means students may already reason about force pairs when you analyze interactions.' },
      { code: 'MS-PS3-1', expect: 'suggested', label: 'Graphing motion-related data', role: 'Students were expected to construct and interpret graphs relating kinetic energy to mass and to speed. This is not the same idea, but the same skill of interpreting graphs of mass and speed relationships is needed to analyze force and motion data.' },
      { code: '5-PS2-1', expect: 'suggested', label: 'Gravity pulls down', role: 'Students argued that Earth’s gravitational force on objects is directed down. Falling objects are one of the data contexts named in the HS-PS2-1 clarification.' }
    ],
    ideaDevelops: 'In kindergarten, students were expected to investigate how pushes and pulls of different strengths and directions change motion. In grade 3, they distinguished balanced from unbalanced forces and used patterns to predict motion. In middle school, they were expected to provide evidence that a change in motion depends on both the net force and the mass. High school does not introduce this relationship. It asks students to support it as a quantitative, mathematical law using data.',
    practiceDevelops: 'The practice shifts across the bands. Kindergartners investigated and analyzed simple data, third graders planned investigations and measured motion, and middle schoolers planned an investigation with multiple variables (force and mass). At high school the emphasis moves from designing the investigation to analyzing data rigorously: comparing data sets, judging fit and uncertainty, and using the analysis to support a mathematical claim.',
    newAtHS: 'The mathematical form (a = F_net/m) and the use of data analysis to support it; one-dimensional quantitative reasoning about net force; attention to how strongly data support a claim.',
    gaps: 'NJSLS-S has no grade 4 or grade 5 PE on force and motion other than 5-PS2-1 (gravity). Students may have gone two or more years without formal force-and-motion instruction before middle school.'
  },

  'HS-PS2-2': {
    steps: [
      { code: 'K-PS2-1', expect: 'documented', label: 'Pushes and pulls', role: 'Students were expected to compare how pushes and pulls of different strengths change motion, including collisions of objects such as balls.' },
      { code: '3-PS2-1', expect: 'documented', label: 'Balanced and unbalanced forces', role: 'Students investigated how unbalanced forces change motion. This is the groundwork for the idea that, without a net external force, a system’s motion does not change.' },
      { code: '4-PS3-3', expect: 'suggested', label: 'Energy changes in collisions', role: 'Students asked questions and predicted the energy changes when objects collide. Collisions are already a familiar context, framed in terms of energy rather than momentum.' },
      { code: 'MS-PS2-1', expect: 'documented', label: 'Third law in colliding objects', role: 'Students were expected to apply Newton’s third law to design a solution for two colliding objects. Equal and opposite forces during a collision are the physical reason momentum is conserved.' },
      { code: 'MS-PS2-2', expect: 'documented', label: 'Net force and mass', role: 'Students provided evidence that the change in motion depends on the net force and mass, which is needed to reason about why a heavier object’s velocity changes less in a collision.' }
    ],
    ideaDevelops: 'Students were expected to experience collisions qualitatively in elementary school, first as pushes and pulls and later in terms of energy (grade 4). In middle school, Newton’s third law framed collisions as equal and opposite force pairs. High school introduces momentum as a conserved quantity of a system and asks students to show this mathematically.',
    practiceDevelops: 'Students were expected to ask questions and predict outcomes about collisions (grade 4) and to apply ideas to design (middle school). The high school PE shifts to using mathematical representations as evidence for a conservation claim.',
    newAtHS: 'Momentum as a quantity; conservation for a defined system; quantitative before-and-after reasoning.',
    gaps: 'Momentum as a named quantity does not appear in any K–8 PE.'
  },

  'HS-PS2-3': {
    steps: [
      { code: 'K-PS2-2', expect: 'documented', label: 'Testing a design that changes motion', role: 'Students analyzed data to determine if a design solution changed the speed or direction of an object. This is an early experience of evaluating a design with evidence.' },
      { code: 'K-2-ETS1-3', expect: 'documented', label: 'Comparing two designs', role: 'Students analyzed test data from two objects designed to solve the same problem. This is the engineering practice that HS-PS2-3 extends.' },
      { code: '3-5-ETS1-3', expect: 'documented', label: 'Fair tests and failure points', role: 'Students planned fair tests that controlled variables and considered failure points to improve a prototype. This is close to what high school collision-device testing requires.' },
      { code: 'MS-PS2-1', expect: 'documented', label: 'Design for colliding objects', role: 'Students were expected to apply Newton’s third law to design a solution to a problem involving two colliding objects. This is the closest middle school relative and already a design task.' },
      { code: 'MS-ETS1-4', expect: 'documented', label: 'Iterative testing and modification', role: 'Students developed models to generate data for iterative testing and modification toward an optimal design.' }
    ],
    ideaDevelops: 'Students were expected to evaluate simple designs that change motion as early as kindergarten, and to design solutions for colliding objects with Newton’s third law in middle school. High school adds the relationship between collision time and force, and asks for a full design–evaluate–refine cycle justified by physics.',
    practiceDevelops: 'The engineering design practices in K–2, 3–5, and middle school ETS1 PEs move from comparing two designs, to fair tests with failure points, to iterative optimization. HS-PS2-3 assumes students can run that cycle and asks them to justify their design choices with physics ideas.',
    newAtHS: 'Explicit reasoning about force and collision time (impulse); optimization against prioritized criteria.',
    gaps: null
  },

  'HS-PS2-4': {
    steps: [
      { code: '3-PS2-3', expect: 'documented', label: 'Forces without contact', role: 'Students asked questions about cause-and-effect relationships of electric or magnetic interactions between objects not in contact.' },
      { code: '5-PS2-1', expect: 'documented', label: 'Gravity pulls down', role: 'Students argued that Earth’s gravitational force on objects is directed down, toward Earth’s center.' },
      { code: 'MS-PS2-3', expect: 'documented', label: 'Factors in electric and magnetic force strength', role: 'Students asked questions about data to determine factors that affect electric and magnetic force strength, such as charge and distance.' },
      { code: 'MS-PS2-4', expect: 'documented', label: 'Gravity depends on mass', role: 'Students were expected to argue that gravitational interactions are attractive and depend on the masses of interacting objects.' },
      { code: 'MS-PS2-5', expect: 'documented', label: 'Fields', role: 'Students investigated evidence that fields exist between objects exerting forces without contact.' }
    ],
    ideaDevelops: 'Students were expected to move from noticing non-contact forces (grade 3) and gravity’s direction (grade 5), to identifying qualitative factors (mass, charge, distance) and the existence of fields in middle school. High school makes these relationships mathematical with inverse-square laws.',
    practiceDevelops: 'Asking questions about non-contact interactions (grade 3 and middle school) and constructing arguments (middle school) lead to using mathematical representations to predict (high school).',
    newAtHS: 'Inverse-square mathematical forms; quantitative prediction; comparing gravitational and electrostatic forces.',
    gaps: null
  },

  'HS-PS2-5': {
    steps: [
      { code: '3-PS2-3', expect: 'documented', label: 'Electric and magnetic interactions', role: 'Students asked questions to determine cause-and-effect relationships of electric or magnetic interactions.' },
      { code: '3-PS2-4', expect: 'documented', label: 'Design with magnets', role: 'Students defined a simple design problem solvable with magnets.' },
      { code: '4-PS3-2', expect: 'documented', label: 'Energy transferred by electric currents', role: 'Students made observations showing energy can be transferred by electric currents.' },
      { code: '4-PS3-4', expect: 'suggested', label: 'Energy-converting device', role: 'Students designed and refined a device that converts energy from one form to another, which may have included simple motors or generators.' },
      { code: 'MS-PS2-3', expect: 'documented', label: 'Factors affecting electromagnetic forces', role: 'Students were expected to ask questions about data on factors affecting electric and magnetic force strength. The clarification examples include electromagnets and motors.' },
      { code: 'MS-PS2-5', expect: 'documented', label: 'Fields between objects', role: 'Students investigated evidence that fields exist between objects exerting forces at a distance.' }
    ],
    ideaDevelops: 'Students were expected to explore magnetic and electric interactions (grade 3), energy carried by currents (grade 4), and factors affecting electromagnetic force strength and fields (middle school). High school connects the two directions: current makes field, and changing field makes current.',
    practiceDevelops: 'Students moved from asking questions (grade 3 and middle school) and conducting investigations of fields (middle school) to planning and conducting their own investigation at high school.',
    newAtHS: 'Electromagnetic induction; the two-way relationship between electricity and magnetism.',
    gaps: null
  },

  'HS-PS3-1': {
    steps: [
      { code: 'K-PS3-1', expect: 'documented', label: 'Sunlight warms surfaces', role: 'Students made observations to determine the effect of sunlight on Earth’s surface. This is an early experience with energy transfer from a source.' },
      { code: '4-PS3-1', expect: 'documented', label: 'Speed and energy', role: 'Students used evidence to relate an object’s speed to its energy.' },
      { code: '4-PS3-2', expect: 'documented', label: 'Energy moves from place to place', role: 'Students observed energy transferred by sound, light, heat, and electric currents.' },
      { code: '4-PS3-3', expect: 'documented', label: 'Energy in collisions', role: 'Students asked questions and predicted energy changes when objects collide.' },
      { code: 'MS-PS3-1', expect: 'documented', label: 'Kinetic energy, mass, and speed', role: 'Students constructed and interpreted graphs relating kinetic energy to mass and to speed.' },
      { code: 'MS-PS3-2', expect: 'documented', label: 'Potential energy and arrangement', role: 'Students modeled how changing the arrangement of objects interacting at a distance changes stored potential energy.' },
      { code: 'MS-PS3-5', expect: 'documented', label: 'Energy transfer when kinetic energy changes', role: 'Students argued that when an object’s kinetic energy changes, energy is transferred to or from it. This is the qualitative core of energy accounting.' }
    ],
    ideaDevelops: 'Students were expected to experience energy transfer qualitatively (grades K and 4), then in middle school to relate kinetic energy to mass and speed, model potential energy, and argue that changes in kinetic energy mean energy is transferred. High school asks for a computational model that does the full energy accounting for a system.',
    practiceDevelops: 'Students moved from observations and questions (elementary) to graphical analysis, models, and argument (middle school). High school asks for computational thinking: building a model that calculates.',
    newAtHS: 'Quantitative energy accounting across components and boundaries; computational models.',
    gaps: null
  },

  'HS-PS3-2': {
    steps: [
      { code: '4-PS3-1', expect: 'documented', label: 'Speed and energy', role: 'Students related the speed of an object to its energy.' },
      { code: '5-PS1-1', expect: 'suggested', label: 'Matter is made of particles', role: 'Students developed a model that matter is made of particles too small to be seen. HS-PS3-2 depends on this particle model.' },
      { code: 'MS-PS1-4', expect: 'documented', label: 'Particle motion and temperature', role: 'Students were expected to model how particle motion, temperature, and state change when thermal energy is added or removed.' },
      { code: 'MS-PS3-1', expect: 'documented', label: 'Kinetic energy relationships', role: 'Students graphed kinetic energy against mass and speed.' },
      { code: 'MS-PS3-2', expect: 'documented', label: 'Potential energy of arrangements', role: 'Students modeled how different arrangements of interacting objects store different amounts of potential energy.' }
    ],
    ideaDevelops: 'Students were expected to connect speed and energy in grade 4, the particle nature of matter in grade 5, and in middle school both particle motion as temperature and potential energy of arrangements. High school unifies these: all macroscopic energy is motion energy, position energy, or both, at both object and particle scales.',
    practiceDevelops: 'Modeling progresses from representing particles (grade 5) and modeling particle motion and potential energy (middle school) to developing and using models that apply across scales (high school).',
    newAtHS: 'One unified model of energy across scales; energy stored in fields.',
    gaps: null
  },

  'HS-PS3-3': {
    steps: [
      { code: 'K-PS3-2', expect: 'suggested', label: 'Design to reduce warming', role: 'Students used tools and materials to design and build a structure that reduces the warming effect of sunlight.' },
      { code: '4-PS3-4', expect: 'documented', label: 'Device that converts energy', role: 'Students applied scientific ideas to design, test, and refine a device that converts energy from one form to another. This is a remarkably close elementary precursor.' },
      { code: 'MS-PS3-3', expect: 'documented', label: 'Device to manage thermal energy transfer', role: 'Students designed, constructed, and tested a device that minimizes or maximizes thermal energy transfer.' },
      { code: 'MS-PS1-6', expect: 'suggested', label: 'Device using chemical energy', role: 'Students undertook a design project to construct, test, and modify a device that releases or absorbs thermal energy by chemical processes.' },
      { code: 'MS-ETS1-4', expect: 'suggested', label: 'Iterative optimization', role: 'Students developed models to generate data for iterative testing toward an optimal design.' }
    ],
    ideaDevelops: 'Students were expected to design an energy-converting device as early as grade 4 and thermal or chemical energy devices in middle school. High school adds explicit constraints and quantitative evaluation of output for a given input.',
    practiceDevelops: 'Engineering design repeats at every band. The high school difference is working within given constraints and evaluating quantitatively.',
    newAtHS: 'Quantitative efficiency reasoning; explicit constraints.',
    gaps: null
  },

  'HS-PS4-1': {
    steps: [
      { code: '1-PS4-1', expect: 'documented', label: 'Vibrations make sound', role: 'Students investigated how vibrating materials make sound and sound makes materials vibrate.' },
      { code: '4-PS4-1', expect: 'documented', label: 'Waves: amplitude and wavelength', role: 'Students developed a model of waves describing patterns of amplitude and wavelength, and that waves can make objects move.' },
      { code: 'MS-PS4-1', expect: 'documented', label: 'Mathematical model of waves', role: 'Students used mathematical representations to describe a simple wave model, including how amplitude relates to energy.' },
      { code: 'MS-PS4-2', expect: 'documented', label: 'Reflection, absorption, transmission', role: 'Students modeled how waves are reflected, absorbed, or transmitted through materials, which is where the medium first matters.' }
    ],
    ideaDevelops: 'Students were expected to connect vibration and sound (grade 1), describe wave patterns with amplitude and wavelength (grade 4), and use simple mathematical models of waves (middle school). High school adds the frequency–wavelength–speed relationship and the role of the medium.',
    practiceDevelops: 'Students investigated (grade 1), modeled (grade 4), and used mathematical representations (middle school). High school continues with mathematical representations, used here to support a claim.',
    newAtHS: 'v = fλ; speed depends on medium; frequency unchanged across media.',
    gaps: null
  },

  'HS-ESS1-4': {
    steps: [
      { code: '1-ESS1-1', expect: 'suggested', label: 'Patterns of sun, moon, and stars', role: 'Students used observations to describe predictable patterns of objects in the sky.' },
      { code: '5-PS2-1', expect: 'suggested', label: 'Gravity pulls down', role: 'Students argued that Earth’s gravitational force is directed down.' },
      { code: '5-ESS1-2', expect: 'documented', label: 'Daily and seasonal sky patterns', role: 'Students graphed patterns of shadows, day and night, and seasonal star appearance.' },
      { code: 'MS-ESS1-2', expect: 'documented', label: 'Gravity and motion in the solar system', role: 'Students were expected to develop a model of the role of gravity in the motions within galaxies and the solar system.' },
      { code: 'MS-ESS1-3', expect: 'documented', label: 'Scale of the solar system', role: 'Students analyzed data to determine scale properties of solar-system objects.' },
      { code: 'MS-PS2-4', expect: 'suggested', label: 'Gravity depends on mass', role: 'Students argued that gravitational interactions are attractive and depend on masses.' }
    ],
    ideaDevelops: 'Students were expected to notice predictable sky patterns (grades 1 and 5), then in middle school to model gravity as the force governing solar system motion and to analyze scale. High school asks for quantitative predictions of orbits.',
    practiceDevelops: 'Students moved from observing and graphing patterns to modeling (middle school), then to mathematical and computational prediction (high school).',
    newAtHS: 'Kepler’s laws and Newtonian gravitation used quantitatively; computational orbit models.',
    gaps: null
  },

  'HS-PS1-1': {
    steps: [
      { code: '2-PS1-1', expect: 'documented', label: 'Classifying materials by properties', role: 'Students investigated and classified materials by observable properties. This is the beginning of the idea that properties form patterns.' },
      { code: '5-PS1-1', expect: 'documented', label: 'Particles too small to see', role: 'Students developed a model that matter is made of particles too small to be seen.' },
      { code: '5-PS1-3', expect: 'documented', label: 'Identifying materials by properties', role: 'Students made measurements to identify materials based on their properties.' },
      { code: 'MS-PS1-1', expect: 'documented', label: 'Atomic composition of molecules', role: 'Students were expected to develop models of the atomic composition of simple molecules and extended structures.' }
    ],
    ideaDevelops: 'Students were expected to classify materials by observable properties (grade 2), model matter as particles and identify materials by properties (grade 5), and model atomic composition of molecules (middle school). High school goes inside the atom: patterns in outer electrons explain the patterns in properties.',
    practiceDevelops: 'Modeling progresses from particle models (grade 5) and atomic-composition models (middle school) to using the periodic table itself as a predictive model.',
    newAtHS: 'Atomic substructure; outer electrons; the periodic table as a model.',
    gaps: 'Subatomic particles and electron arrangements do not appear in any K–8 PE; this is genuinely new content at high school.'
  },

  'HS-PS1-2': {
    steps: [
      { code: '2-PS1-4', expect: 'documented', label: 'Some changes can’t be reversed', role: 'Students argued that some changes from heating or cooling can be reversed and some cannot.' },
      { code: '5-PS1-4', expect: 'documented', label: 'Does mixing make a new substance?', role: 'Students investigated whether mixing substances results in new substances.' },
      { code: 'MS-PS1-1', expect: 'documented', label: 'Atomic composition', role: 'Students modeled the atomic composition of simple molecules.' },
      { code: 'MS-PS1-2', expect: 'documented', label: 'Evidence of a chemical reaction', role: 'Students analyzed property data before and after substances interact to determine whether a chemical reaction occurred.' },
      { code: 'MS-PS1-5', expect: 'documented', label: 'Atoms rearrange, mass conserved', role: 'Students modeled how atoms are conserved in chemical reactions.' }
    ],
    ideaDevelops: 'Students were expected to recognize irreversible changes (grade 2), new substances from mixing (grade 5), and in middle school to identify reactions from property changes and model atom rearrangement. High school asks why particular products form, using electron states and periodic patterns.',
    practiceDevelops: 'Students argued (grade 2), investigated (grade 5), analyzed data and modeled (middle school). High school asks students to construct and revise explanations.',
    newAtHS: 'Explaining reaction outcomes from electron structure; revising explanations.',
    gaps: null
  },

  'HS-PS1-3': {
    steps: [
      { code: '2-PS1-1', expect: 'documented', label: 'Classifying by properties', role: 'Students classified materials by observable properties.' },
      { code: '2-PS1-2', expect: 'documented', label: 'Properties suited to a purpose', role: 'Students analyzed test data to decide which materials have properties best suited for a purpose.' },
      { code: '5-PS1-3', expect: 'documented', label: 'Identify materials by properties', role: 'Students measured properties to identify materials.' },
      { code: 'MS-PS1-4', expect: 'documented', label: 'Particle motion and state changes', role: 'Students modeled changes in particle motion, temperature, and state when thermal energy is added or removed.' },
      { code: 'MS-PS2-3', expect: 'documented', label: 'Factors affecting electric forces', role: 'Students asked questions about data on factors affecting the strength of electric forces, the same kind of force that holds particles together.' }
    ],
    ideaDevelops: 'Students were expected to classify and test materials by properties (grades 2 and 5), model particle motion during state changes, and study electric force strength (middle school). High school connects these: bulk properties are evidence of the strength of electrical attractions between particles.',
    practiceDevelops: 'Investigations progress from classifying (grade 2) to measuring (grade 5) to planning a comparative investigation that supports an inference about something unobservable (high school).',
    newAtHS: 'Inferring particle-level forces from bulk-scale evidence.',
    gaps: null
  },

  'HS-PS1-4': {
    steps: [
      { code: '5-PS1-4', expect: 'documented', label: 'New substances from mixing', role: 'Students investigated whether mixing substances forms new substances.' },
      { code: 'MS-PS1-2', expect: 'documented', label: 'Evidence of chemical reactions', role: 'Students analyzed data to identify chemical reactions, often including temperature change.' },
      { code: 'MS-PS1-6', expect: 'documented', label: 'Device that releases or absorbs thermal energy', role: 'Students undertook a design project using chemical processes that release or absorb thermal energy, which is the direct experiential precursor to HS-PS1-4.' },
      { code: 'MS-PS3-2', expect: 'suggested', label: 'Potential energy and arrangement', role: 'Students modeled how changing arrangements of interacting objects store different amounts of potential energy. Bond energy is the same idea at the atomic scale.' },
      { code: 'MS-LS1-7', expect: 'suggested', label: 'Food rearranged to release energy', role: 'Students modeled how food is rearranged through chemical reactions that release energy in organisms.' }
    ],
    ideaDevelops: 'Students were expected to experience reactions that get hot or cold (middle school), model potential energy of arrangements, and model food molecules rearranging to release energy. High school explains these with total bond energy.',
    practiceDevelops: 'Students designed devices and developed models in middle school; high school asks for a model that explains energy changes at the molecular scale.',
    newAtHS: 'Bond energy as the explanation for exothermic and endothermic reactions.',
    gaps: 'MS-PS3-2 (potential energy of arrangements) is conceptually one of the closest links to bond energy, but it is listed under PS3 components rather than PS1, so it appears here as a suggested connection.'
  },

  'HS-PS1-5': {
    steps: [
      { code: '5-PS1-4', expect: 'documented', label: 'New substances from mixing', role: 'Students investigated whether mixing two or more substances forms new substances.' },
      { code: 'MS-PS1-2', expect: 'documented', label: 'Evidence of reactions', role: 'Students analyzed data to determine whether a reaction occurred.' },
      { code: 'MS-PS1-4', expect: 'suggested', label: 'Temperature and particle motion', role: 'Students modeled how adding thermal energy increases particle motion, which is the root of the temperature effect on collision energy.' },
      { code: 'MS-PS1-5', expect: 'documented', label: 'Atoms rearrange', role: 'Students modeled atom rearrangement in chemical reactions.' }
    ],
    ideaDevelops: 'Students were expected to identify reactions and model atom rearrangement and particle motion (middle school). High school explains reaction rate in terms of the number and energy of collisions.',
    practiceDevelops: 'Data analysis and modeling in middle school lead to applying principles and evidence to construct explanations.',
    newAtHS: 'Collision theory; rate as a function of temperature and concentration.',
    gaps: null
  },

  'HS-PS1-6': {
    steps: [
      { code: '2-PS1-4', expect: 'documented', label: 'Reversible and irreversible changes', role: 'Students argued that some changes caused by heating or cooling can be reversed and some cannot. This is the first encounter with reversibility.' },
      { code: 'MS-PS1-2', expect: 'documented', label: 'Evidence of reactions', role: 'Students analyzed property data to determine whether a reaction occurred.' },
      { code: 'MS-PS1-6', expect: 'documented', label: 'Design with chemical processes', role: 'Students designed, tested, and modified a device using chemical processes, an early experience of optimizing a chemical system.' },
      { code: 'MS-ETS1-4', expect: 'documented', label: 'Iterative optimization', role: 'Students used models to generate data for iterative testing toward an optimal design.' }
    ],
    ideaDevelops: 'Students were expected to recognize reversible changes (grade 2), identify reactions (middle school), and design chemical-process devices (middle school). High school introduces dynamic equilibrium and how to shift it.',
    practiceDevelops: 'Engineering design (middle school) becomes refining the design of a chemical system with molecular-level justification.',
    newAtHS: 'Dynamic equilibrium; Le Chatelier’s principle.',
    gaps: null
  },

  'HS-PS1-7': {
    steps: [
      { code: '2-PS1-3', expect: 'suggested', label: 'Pieces rearranged into new objects', role: 'Students explained how an object made of a small set of pieces can be taken apart and made into a new object. This is a striking early analogy for atoms rearranging.' },
      { code: '5-PS1-2', expect: 'documented', label: 'Weight conserved in any change', role: 'Students measured and graphed quantities to show total weight is conserved when heating, cooling, or mixing substances.' },
      { code: '5-PS1-4', expect: 'documented', label: 'Does mixing make new substances?', role: 'Students investigated whether mixing forms new substances.' },
      { code: 'MS-PS1-5', expect: 'documented', label: 'Atoms conserved so mass conserved', role: 'Students were expected to develop and use a model describing how the total number of atoms does not change in a reaction and so mass is conserved. This is the same claim as HS-PS1-7, made with a model instead of mathematics.' }
    ],
    ideaDevelops: 'Students were expected to show that weight is conserved (grade 5) and model why (atoms are conserved) in middle school. High school does not introduce conservation of mass. It asks students to support the claim mathematically, using the mole to connect atoms to measurable mass.',
    practiceDevelops: 'Students measured and graphed (grade 5), modeled (middle school), and at high school use mathematical representations as evidence.',
    newAtHS: 'The mole; proportional reasoning connecting particle and macroscopic scales.',
    gaps: null
  },

  'HS-PS3-4': {
    steps: [
      { code: 'K-PS3-1', expect: 'documented', label: 'Sunlight warms surfaces', role: 'Students observed the warming effect of sunlight on Earth’s surface.' },
      { code: '4-PS3-2', expect: 'documented', label: 'Energy transferred by heat', role: 'Students made observations showing energy is transferred from place to place by heat, among other ways.' },
      { code: 'MS-PS1-4', expect: 'suggested', label: 'Particle motion and temperature', role: 'Students modeled how particle motion and temperature change when thermal energy is added or removed.' },
      { code: 'MS-PS3-3', expect: 'documented', label: 'Minimizing or maximizing thermal transfer', role: 'Students designed and tested a device to minimize or maximize thermal energy transfer.' },
      { code: 'MS-PS3-4', expect: 'documented', label: 'Energy, mass, matter, and temperature', role: 'Students were expected to plan an investigation relating energy transferred, type of matter, mass, and temperature change. This is a close precursor to high school calorimetry.' }
    ],
    ideaDevelops: 'Students were expected to observe warming (K), energy transfer by heat (grade 4), and in middle school to investigate how energy transferred relates to mass, type of matter, and temperature change. High school adds the direction of transfer: toward a more uniform distribution, the second law.',
    practiceDevelops: 'Middle school students already planned investigations of thermal energy transfer. High school asks them to plan and conduct investigations that provide evidence for a general principle.',
    newAtHS: 'The second law of thermodynamics: energy spreads toward uniformity.',
    gaps: null
  },

  'HS-LS1-1': {
    steps: [
      { code: '1-LS1-1', expect: 'documented', label: 'External parts and survival', role: 'Students designed solutions by mimicking how organisms use external parts to survive.' },
      { code: '1-LS3-1', expect: 'suggested', label: 'Like but not exactly like parents', role: 'Students constructed an account that young plants and animals are like, but not exactly like, their parents.' },
      { code: '4-LS1-1', expect: 'documented', label: 'Internal and external structures', role: 'Students argued that structures function to support survival, growth, behavior, and reproduction.' },
      { code: 'MS-LS1-1', expect: 'documented', label: 'Living things are made of cells', role: 'Students investigated evidence that living things are made of cells.' },
      { code: 'MS-LS1-2', expect: 'documented', label: 'Cell parts and function', role: 'Students modeled the function of a cell and how its parts contribute.' },
      { code: 'MS-LS1-3', expect: 'documented', label: 'Body as a system of subsystems', role: 'Students argued that the body is a system of interacting subsystems made of cells.' },
      { code: 'MS-LS3-1', expect: 'suggested', label: 'Mutations affect proteins', role: 'Students were expected to model why mutations in genes may affect proteins and result in harmful, beneficial, or neutral effects. This is the closest middle school link between DNA and protein.' }
    ],
    ideaDevelops: 'Students were expected to connect structure and function from external parts (grade 1) to internal structures (grade 4), then cells and body systems (middle school), and to model how gene mutations affect proteins (middle school). High school links DNA structure to protein structure to specialized cell function.',
    practiceDevelops: 'Students designed, argued, investigated, and modeled. At high school they construct explanations based on evidence.',
    newAtHS: 'The molecular chain from DNA to protein to function.',
    gaps: null
  },

  'HS-LS1-5': {
    steps: [
      { code: 'K-LS1-1', expect: 'documented', label: 'What plants and animals need', role: 'Students used observations to describe patterns of what plants and animals need to survive.' },
      { code: '2-LS2-1', expect: 'suggested', label: 'Plants need sunlight and water', role: 'Students investigated whether plants need sunlight and water to grow.' },
      { code: '5-LS1-1', expect: 'documented', label: 'Plants get materials from air and water', role: 'Students were expected to argue that plants get the materials for growth chiefly from air and water. This directly challenges the “mass comes from soil” idea.' },
      { code: '5-PS3-1', expect: 'documented', label: 'Food energy was once sunlight', role: 'Students modeled how energy in animals’ food was once energy from the sun.' },
      { code: 'MS-LS1-6', expect: 'documented', label: 'Photosynthesis cycles matter and energy', role: 'Students constructed an explanation of photosynthesis’s role in cycling matter and energy into and out of organisms.' }
    ],
    ideaDevelops: 'Students were expected to recognize plant needs (K and grade 2), argue that plant matter comes mainly from air and water and that food energy was once sunlight (grade 5), and explain photosynthesis’s role in cycling matter and energy (middle school). High school models the transformation of light energy into chemical energy.',
    practiceDevelops: 'Students observed, investigated, argued, and explained. At high school the emphasis is on using a model that accounts for both matter and energy.',
    newAtHS: 'Energy transformation into chemical bonds; matter and energy accounted for together in one model.',
    gaps: null
  },

  'HS-LS1-7': {
    steps: [
      { code: '5-PS3-1', expect: 'documented', label: 'Food energy came from the sun', role: 'Students modeled that energy in food used for body repair, growth, motion, and warmth was once energy from the sun.' },
      { code: 'MS-LS1-7', expect: 'documented', label: 'Food rearranged to release energy', role: 'Students were expected to model how food is rearranged through chemical reactions forming new molecules that support growth and/or release energy. This is the direct precursor.' },
      { code: 'MS-PS1-5', expect: 'suggested', label: 'Atoms conserved', role: 'Students modeled atom conservation in chemical reactions.' },
      { code: 'MS-LS2-3', expect: 'suggested', label: 'Cycling of matter and energy in ecosystems', role: 'Students modeled cycling of matter and flow of energy among living and nonliving parts of ecosystems.' }
    ],
    ideaDevelops: 'Students were expected to link food energy to sunlight (grade 5) and model food molecules being rearranged to release energy (middle school). High school specifies the mechanism: bonds break and form with a net transfer of energy.',
    practiceDevelops: 'Modeling continues from grade 5 through high school, with high school models expected to account for bonds and energy explicitly.',
    newAtHS: 'Bond-level energy reasoning, shared with HS-PS1-4 in chemistry.',
    gaps: null
  },

  'HS-LS2-1': {
    steps: [
      { code: 'K-ESS3-1', expect: 'suggested', label: 'Needs and where organisms live', role: 'Students used a model to represent the relationship between organisms’ needs and where they live.' },
      { code: '2-LS2-1', expect: 'documented', label: 'Plant needs', role: 'Students investigated whether plants need sunlight and water.' },
      { code: '3-LS4-3', expect: 'suggested', label: 'Some survive well, some less well', role: 'Students argued that in a particular habitat some organisms survive well, some less well, and some not at all.' },
      { code: '5-LS2-1', expect: 'documented', label: 'Matter moves among organisms', role: 'Students modeled the movement of matter among plants, animals, decomposers, and the environment.' },
      { code: 'MS-LS2-1', expect: 'documented', label: 'Resource availability and populations', role: 'Students were expected to analyze and interpret data on the effects of resource availability on organisms and populations. This is the direct precursor to carrying capacity.' },
      { code: 'MS-LS2-2', expect: 'documented', label: 'Patterns of interactions', role: 'Students predicted patterns of interactions (competition, predation, mutualism) across ecosystems.' }
    ],
    ideaDevelops: 'Students were expected to connect organisms’ needs to habitats (K, grade 2), see that survival varies by habitat (grade 3), model matter movement (grade 5), and analyze how resource availability affects populations (middle school). High school asks for mathematical and computational reasoning about limits to population size at different scales.',
    practiceDevelops: 'Data analysis in middle school becomes mathematical and computational representation at high school.',
    newAtHS: 'Carrying capacity as a quantitative limit; multiple interdependent factors; scale.',
    gaps: null
  },

  'HS-LS2-4': {
    steps: [
      { code: '5-PS3-1', expect: 'suggested', label: 'Food energy from the sun', role: 'Students modeled how food energy was once energy from the sun.' },
      { code: '5-LS2-1', expect: 'documented', label: 'Matter moves through ecosystems', role: 'Students modeled the movement of matter among plants, animals, decomposers, and the environment.' },
      { code: 'MS-LS2-3', expect: 'documented', label: 'Cycling of matter and flow of energy', role: 'Students were expected to model the cycling of matter and flow of energy among living and nonliving parts of an ecosystem.' }
    ],
    ideaDevelops: 'Students were expected to model matter moving through food webs (grade 5) and both matter cycling and energy flow (middle school). High school makes it quantitative: proportional reasoning about how much energy and biomass transfers between trophic levels.',
    practiceDevelops: 'Modeling (grade 5 and middle school) becomes mathematical representation at high school.',
    newAtHS: 'Quantitative trophic transfer; why higher levels support less biomass.',
    gaps: null
  },

  'HS-LS3-1': {
    steps: [
      { code: '1-LS3-1', expect: 'documented', label: 'Like but not exactly like parents', role: 'Students constructed an evidence-based account that offspring are like, but not exactly like, their parents.' },
      { code: '3-LS3-1', expect: 'documented', label: 'Traits are inherited and vary', role: 'Students analyzed data to show traits are inherited and vary within a group.' },
      { code: '3-LS3-2', expect: 'documented', label: 'Environment influences traits', role: 'Students used evidence that traits can be influenced by the environment.' },
      { code: 'MS-LS3-1', expect: 'documented', label: 'Mutations and proteins', role: 'Students modeled why mutations located on chromosomes may affect proteins and traits.' },
      { code: 'MS-LS3-2', expect: 'documented', label: 'Asexual vs. sexual reproduction', role: 'Students were expected to model why asexual reproduction yields identical offspring and sexual reproduction yields variation.' }
    ],
    ideaDevelops: 'Students were expected to notice family resemblance (grade 1), analyze inherited and environmental influences on traits (grade 3), and model how genes on chromosomes and modes of reproduction affect traits (middle school). High school focuses on the molecular basis: DNA and chromosomes as the code for traits.',
    practiceDevelops: 'Students moved from observation, data analysis, and modeling to asking clarifying questions at high school, a practice that is easy to overlook.',
    newAtHS: 'The molecular basis of inheritance; questioning as the target practice.',
    gaps: null
  },

  'HS-LS3-2': {
    steps: [
      { code: '1-LS3-1', expect: 'documented', label: 'Not exactly like parents', role: 'Students constructed an account that offspring are similar but not identical to parents.' },
      { code: '3-LS3-1', expect: 'documented', label: 'Variation within a group', role: 'Students analyzed data showing variation of inherited traits in a group.' },
      { code: '3-LS3-2', expect: 'documented', label: 'Environment affects traits', role: 'Students used evidence that the environment can influence traits.' },
      { code: 'MS-LS3-1', expect: 'documented', label: 'Mutations', role: 'Students modeled how mutations may affect proteins and have harmful, beneficial, or neutral effects.' },
      { code: 'MS-LS3-2', expect: 'documented', label: 'Sexual reproduction makes variation', role: 'Students modeled why sexual reproduction results in genetic variation.' }
    ],
    ideaDevelops: 'Students were expected to recognize variation (grades 1 and 3) and model mutations and sexual reproduction as sources of variation (middle school). High school asks students to argue from evidence about three specific sources: meiosis, replication errors, and environmentally caused mutations.',
    practiceDevelops: 'Students argued in early grades and modeled in middle school; high school requires making and defending claims.',
    newAtHS: 'Specific mechanisms (crossing over, replication errors); argumentation with data.',
    gaps: null
  },

  'HS-LS4-2': {
    steps: [
      { code: '3-LS4-2', expect: 'documented', label: 'Variation can give advantages', role: 'Students constructed an explanation of how variations among individuals may give advantages in surviving, finding mates, and reproducing.' },
      { code: '3-LS4-3', expect: 'documented', label: 'Survival varies by habitat', role: 'Students argued that some organisms survive well in a habitat and others less well or not at all.' },
      { code: 'MS-LS4-4', expect: 'documented', label: 'Genetic variation and survival', role: 'Students were expected to explain how genetic variations increase some individuals’ probability of surviving and reproducing.' },
      { code: 'MS-LS4-6', expect: 'documented', label: 'Math of natural selection', role: 'Students used mathematical representations to show how natural selection may increase or decrease traits over time.' },
      { code: 'MS-LS2-1', expect: 'suggested', label: 'Resource availability', role: 'Students analyzed data on how resource availability affects populations. This is the competition factor.' }
    ],
    ideaDevelops: 'Many teachers are surprised that grade 3 students were expected to explain how variation can provide advantages in survival and reproduction. Middle school added genetic variation and mathematical representations of trait change. High school asks students to integrate four factors into one evidence-based explanation.',
    practiceDevelops: 'Explanation appears at grade 3, middle school, and high school. The high school version must integrate multiple factors and evidence.',
    newAtHS: 'Integration of four factors; distribution graphs and proportional reasoning as evidence.',
    gaps: null
  }
};
