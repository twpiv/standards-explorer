/* Shared vocabulary: Science and Engineering Practices (SEP), Crosscutting Concepts (CCC),
   grade bands, disciplines, and the practice-language patterns used to highlight PE wording.

   Provenance labels used throughout the app:
     official    - verbatim NJDOE 2026 text, or NGSS foundation-box category names
     documented  - supported by an official structure (NJDOE Disciplinary Progressions, NGSS foundation
                   boxes, NJDOE model scope and sequence), possibly compiled or paraphrased
     suggested   - an instructional suggestion written for this app; never a state requirement
*/
window.SE = window.SE || {}; SE.data = SE.data || {};

SE.data.bands = [
  { id: 'K-2', label: 'K–2', long: 'Grades K–2' },
  { id: '3-5', label: '3–5', long: 'Grades 3–5' },
  { id: '6-8', label: '6–8', long: 'Middle School' },
  { id: '9-12', label: '9–12', long: 'High School' }
];

SE.data.disciplines = {
  PS: { label: 'Physical Science', short: 'PS' },
  LS: { label: 'Life Science', short: 'LS' },
  ESS: { label: 'Earth and Space Science', short: 'ESS' },
  ETS: { label: 'Engineering Design', short: 'ETS' }
};

SE.data.courses = {
  biology: { id: 'biology', label: 'Biology', unitPrefix: 'B', discipline: 'LS',
    blurb: 'Ecosystems, matter and energy in living systems, inheritance, and evolution, with Earth and space science woven in.',
    starters: [
      { code: 'HS-LS2-1', why: 'Opens the NJDOE model unit B.1 (Ecosystem Interactions and Dynamics). A quantitative look at what limits populations.' },
      { code: 'HS-LS1-5', why: 'Matter and energy in organisms (model unit B.2). Connects strongly to chemistry and Earth’s carbon cycle.' },
      { code: 'HS-LS1-7', why: 'Cellular respiration as bond breaking and forming, a natural bridge to HS-PS1-4 in chemistry.' },
      { code: 'HS-LS1-1', why: 'DNA to proteins to function (model unit B.3). Anchors inheritance work.' },
      { code: 'HS-LS3-1', why: 'Asking questions about DNA, chromosomes, and traits. A practice many teachers rarely foreground.' },
      { code: 'HS-LS4-2', why: 'The four factors of evolution (model units B.4 and B.5). Rich prior learning from grade 3 and middle school.' }
    ] },
  chemistry: { id: 'chemistry', label: 'Chemistry', unitPrefix: 'C', discipline: 'PS',
    blurb: 'Energy and thermodynamics, structure and properties of matter, reactions, and nuclear processes in Earth’s systems.',
    starters: [
      { code: 'HS-PS3-4', why: 'NJDOE’s model chemistry course opens with thermodynamics in Earth’s systems (unit C.1).' },
      { code: 'HS-PS1-1', why: 'The periodic table as a model (unit C.2). A frequent starting point for structure and properties.' },
      { code: 'HS-PS1-3', why: 'Bulk properties as evidence of forces between particles. Bridges chemistry and physics.' },
      { code: 'HS-PS1-2', why: 'Explaining simple reactions with electron states and periodic trends (unit C.3).' },
      { code: 'HS-PS1-7', why: 'Mathematical reasoning about conservation of atoms and mass, where “stoichiometry” lives.' },
      { code: 'HS-PS1-4', why: 'Bond energy and reaction energy (unit C.5). Connects to cellular respiration and combustion.' }
    ] },
  physics: { id: 'physics', label: 'Physics', unitPrefix: 'P', discipline: 'PS',
    blurb: 'Energy and systems, forces and interactions, waves and radiation, and Earth and space applications.',
    starters: [
      { code: 'HS-PS2-1', why: 'Net force, mass, and acceleration (unit P.3). The PE many teachers associate with kinematics and Newton’s laws.' },
      { code: 'HS-PS3-1', why: 'NJDOE’s model physics course opens with energy flow (unit P.1). Computational models of energy.' },
      { code: 'HS-PS2-2', why: 'Momentum conservation in collisions (unit P.3).' },
      { code: 'HS-PS3-2', why: 'Energy as motion plus position, from roller coasters to charged plates.' },
      { code: 'HS-ESS1-4', why: 'Orbits and gravity (unit P.4). Earth and space science inside physics.' },
      { code: 'HS-PS4-1', why: 'Frequency, wavelength, and speed of waves (unit P.5).' }
    ] }
};

/* The eight practices. name = NGSS category name [official]. about = plain-language description [suggested/app-written].
   progression = paraphrase of the grade-band summaries in NGSS Appendix F (not quoted; follow the link for exact wording). */
SE.data.seps = {
  SEP1: { name: 'Asking Questions and Defining Problems', short: 'Asking questions',
    about: 'Scientists ask questions that can be investigated empirically; engineers define problems precisely enough, with criteria and constraints, that solutions can be judged.',
    progression: {
      'K-2': 'Simple descriptive questions that can be tested.',
      '3-5': 'Questions that specify qualitative relationships.',
      '6-8': 'Questions that specify relationships between variables and that clarify arguments and models.',
      '9-12': 'Formulating, refining, and evaluating empirically testable questions and design problems, using models and simulations.' } },
  SEP2: { name: 'Developing and Using Models', short: 'Modeling',
    about: 'Models (diagrams, physical replicas, mathematical representations, simulations) are tools for representing a system, explaining it, and predicting its behavior. Students should develop, use, test, and revise them.',
    progression: {
      'K-2': 'Using and developing concrete models such as drawings, replicas, or storyboards of events or design solutions.',
      '3-5': 'Building and revising simple models; using models to represent events and design solutions.',
      '6-8': 'Developing, using, and revising models to describe, test, and predict more abstract phenomena and design systems.',
      '9-12': 'Using, synthesizing, and developing models to predict and show relationships among variables between systems and their components.' } },
  SEP3: { name: 'Planning and Carrying Out Investigations', short: 'Investigating',
    about: 'Designing investigations that produce useful data: deciding what to measure, controlling variables, choosing tools, and judging how much data is enough.',
    progression: {
      'K-2': 'Simple fair-test investigations that provide data to support explanations or design solutions.',
      '3-5': 'Investigations that control variables and provide evidence for explanations or design solutions.',
      '6-8': 'Investigations that involve multiple variables and provide evidence for explanations or solutions.',
      '9-12': 'Investigations that provide evidence for, and test, conceptual, mathematical, physical, and empirical models.' } },
  SEP4: { name: 'Analyzing and Interpreting Data', short: 'Analyzing data',
    about: 'Organizing, displaying, and interpreting data to find patterns and relationships, and judging what the data can and cannot support.',
    progression: {
      'K-2': 'Collecting, recording, and sharing observations.',
      '3-5': 'Beginning quantitative approaches to collecting data; multiple trials of observations.',
      '6-8': 'Extended quantitative analysis, distinguishing correlation from causation, and basic statistics and error analysis.',
      '9-12': 'More detailed statistical analysis, comparing data sets for consistency, and using models to generate and analyze data.' } },
  SEP5: { name: 'Using Mathematics and Computational Thinking', short: 'Math and computation',
    about: 'Using mathematical relationships, algorithms, and computational tools to represent variables, test predictions, and model systems. The meaning of the mathematics matters, not only the calculation.',
    progression: {
      'K-2': 'Recognizing that mathematics can describe the natural and designed world.',
      '3-5': 'Extending measurement to many physical properties; using computation to analyze data and compare design solutions.',
      '6-8': 'Finding patterns in large data sets; using mathematical concepts to support explanations and arguments.',
      '9-12': 'Algebraic thinking, linear and nonlinear functions, and computational tools to analyze, represent, and model data.' } },
  SEP6: { name: 'Constructing Explanations and Designing Solutions', short: 'Explaining and designing',
    about: 'Constructing causal explanations of phenomena supported by evidence and scientific ideas, and designing and refining solutions to problems against criteria and constraints.',
    progression: {
      'K-2': 'Using evidence and ideas to construct evidence-based accounts of phenomena and to design solutions.',
      '3-5': 'Explanations that specify variables to describe and predict phenomena; designing multiple solutions.',
      '6-8': 'Explanations and solutions supported by multiple sources of evidence consistent with scientific ideas and theories.',
      '9-12': 'Explanations and designs supported by multiple, independent, student-generated sources of evidence consistent with scientific ideas and theories.' } },
  SEP7: { name: 'Engaging in Argument from Evidence', short: 'Argumentation',
    about: 'Using evidence and reasoning to support or refute claims, and critiquing the arguments, explanations, and designs of others.',
    progression: {
      'K-2': 'Comparing ideas and representations about the natural and designed world.',
      '3-5': 'Critiquing explanations or solutions proposed by peers by citing relevant evidence.',
      '6-8': 'Constructing convincing arguments that support or refute claims for explanations or solutions.',
      '9-12': 'Using appropriate and sufficient evidence and reasoning to defend and critique claims and explanations.' } },
  SEP8: { name: 'Obtaining, Evaluating, and Communicating Information', short: 'Communicating information',
    about: 'Reading, evaluating, and synthesizing scientific and technical information, and communicating ideas clearly in multiple formats.',
    progression: {
      'K-2': 'Using observations and texts to communicate new information.',
      '3-5': 'Evaluating the merit and accuracy of ideas and methods.',
      '6-8': 'Evaluating the merit and validity of ideas and methods.',
      '9-12': 'Evaluating the validity and reliability of claims, methods, and designs.' } }
};

SE.data.sepProgressionSource = {
  label: 'NGSS Appendix F: Science and Engineering Practices (grade-band summaries, paraphrased)',
  url: 'https://www.nationalacademies.org/read/18290/chapter/12'
};

/* The seven crosscutting concepts. name = NGSS category name [official]; about = app-written lens description. */
SE.data.cccs = {
  CCC1: { name: 'Patterns', about: 'Observed patterns in form and events prompt questions about the relationships and causes behind them, and support classification and prediction.' },
  CCC2: { name: 'Cause and Effect', about: 'Events have causes. A major science activity is investigating and explaining causal relationships and the mechanisms behind them, then using them to predict.' },
  CCC3: { name: 'Scale, Proportion, and Quantity', about: 'What is relevant depends on size, time, and energy scales. Recognizing proportional relationships and how changes in scale change a system’s behavior.' },
  CCC4: { name: 'Systems and System Models', about: 'Defining the system under study (its boundaries, components, and interactions) and modeling it makes complex behavior understandable and testable.' },
  CCC5: { name: 'Energy and Matter', about: 'Tracking flows, cycles, and conservation of energy and matter into, out of, and within systems.' },
  CCC6: { name: 'Structure and Function', about: 'The way an object or living thing is shaped and its substructure determine many of its properties and functions.' },
  CCC7: { name: 'Stability and Change', about: 'For natural and built systems alike, conditions of stability and the rates and causes of change are critical to understanding.' }
};

/* Practice-language patterns. They mark the performance language in a PE's official wording.
   For HS PEs the official (NGSS) SEP is shown alongside. For K-8 PEs the "family" is only a reading of the
   wording and is labeled as such in the interface; it is not an official foundation-box alignment.
   Order matters: earlier, more specific patterns win. */
SE.data.practicePatterns = [
  { re: 'Analyze a major global challenge to specify', sep: 'SEP1' },
  { re: 'Evaluate questions', sep: 'SEP1' },
  { re: 'Ask questions about data', sep: 'SEP1' },
  { re: 'Ask questions(?: and predict outcomes)?', sep: 'SEP1' },
  { re: 'Define (?:the criteria and constraints|a simple design problem)', sep: 'SEP1' },
  { re: 'Develop and use (?:a )?models?', sep: 'SEP2' },
  { re: 'Develop (?:a )?(?:simple |quantitative )?models?(?: based on evidence)?', sep: 'SEP2' },
  { re: 'Develop a simple sketch, drawing, or physical model', sep: 'SEP2' },
  { re: 'Use (?:a |the periodic table as a )?models?', sep: 'SEP2' },
  { re: 'Plan and conduct (?:an )?investigations?', sep: 'SEP3' },
  { re: 'Plan and carry out fair tests', sep: 'SEP3' },
  { re: 'Plan an investigation', sep: 'SEP3' },
  { re: 'Conduct an investigation(?: and evaluate the experimental design)?', sep: 'SEP3' },
  { re: 'Collect data', sep: 'SEP3' },
  { re: 'Make observations(?: and(?:/or)? measurements)?', sep: 'SEP3' },
  { re: 'Analyze and interpret data', sep: 'SEP4' },
  { re: 'Analyze (?:geoscience )?data', sep: 'SEP4' },
  { re: 'Analyze displays of pictorial data', sep: 'SEP4' },
  { re: 'Construct and interpret graphical displays of data', sep: 'SEP4' },
  { re: 'Represent data in (?:tables and )?graphical displays', sep: 'SEP4' },
  { re: '(?:Measure|Describe) and graph', sep: 'SEP4' },
  { re: 'Use (?:and share )?observations', sep: 'SEP4' },
  { re: 'Use mathematical (?:and/or computational |or computational )?representations', sep: 'SEP5' },
  { re: 'Use a computational representation', sep: 'SEP5' },
  { re: 'Create a computational (?:model|simulation)', sep: 'SEP5' },
  { re: 'Use a computer simulation', sep: 'SEP5' },
  { re: 'Create or revise a simulation', sep: 'SEP5' },
  { re: 'Apply concepts of statistics and probability', sep: 'SEP5' },
  { re: 'Construct (?:and revise )?(?:a scientific |an )?explanation', sep: 'SEP6' },
  { re: 'Use evidence to construct an explanation', sep: 'SEP6' },
  { re: 'Apply scientific (?:and engineering )?ideas to (?:construct an explanation|design)', sep: 'SEP6' },
  { re: 'Apply scientific (?:principles|reasoning)(?: and evidence)?', sep: 'SEP6' },
  { re: 'Design, (?:evaluate|build), and refine', sep: 'SEP6' },
  { re: 'Design a solution', sep: 'SEP6' },
  { re: 'Refine the design', sep: 'SEP6' },
  { re: 'Evaluate or refine a technological solution', sep: 'SEP6' },
  { re: 'Evaluate a solution', sep: 'SEP6' },
  { re: 'Undertake a design project', sep: 'SEP6' },
  { re: 'Generate and compare multiple (?:possible )?solutions', sep: 'SEP6' },
  { re: 'Compare multiple solutions', sep: 'SEP6' },
  { re: 'Use (?:tools and )?materials(?: provided)? to design', sep: 'SEP6' },
  { re: 'Identify evidence from patterns', sep: 'SEP6' },
  { re: 'Evaluate the validity and reliability of claims in published materials', sep: 'SEP8' },
  { re: 'Evaluate the claims, evidence, and reasoning', sep: 'SEP7' },
  { re: 'Evaluate (?:the )?evidence', sep: 'SEP7' },
  { re: 'Evaluate competing design solutions', sep: 'SEP7' },
  { re: 'Construct(?:, use,)? and present arguments', sep: 'SEP7' },
  { re: 'Construct an argument', sep: 'SEP7' },
  { re: 'Support an argument', sep: 'SEP7' },
  { re: 'Make and defend a claim', sep: 'SEP7' },
  { re: 'Make a claim', sep: 'SEP7' },
  { re: 'Use argument', sep: 'SEP7' },
  { re: 'Communicate(?: scientific| technical| scientific and technical)?(?: information| ideas)?', sep: 'SEP8' },
  { re: 'Obtain (?:and combine )?information', sep: 'SEP8' },
  { re: 'Gather and (?:make sense of|synthesize) information', sep: 'SEP8' },
  { re: 'Integrate qualitative scientific and technical information', sep: 'SEP8' },
  { re: 'Read texts and use media', sep: 'SEP8' },
  { re: 'Use information from several sources', sep: 'SEP8' }
];
