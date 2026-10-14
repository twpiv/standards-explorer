/* "I Teach This Topic: What Standards Are Connected?"
   A bridge from familiar course topics to performance expectations (provenance: suggested).
   A topic is never equated with a PE. Each connection states its fit:
     direct      the topic's core idea is central to what the PE asks students to do
     partial     the topic is part of the PE, but the PE targets a specific performance or scope
     contextual  the topic supplies tools, language, or context, but the PE's target is something else
     earlier     earlier-grade PEs where students were expected to meet related ideas
   `gap` notes what a traditional unit includes that no HS PE requires by itself.
*/
window.SE = window.SE || {}; SE.data = SE.data || {};

SE.data.topics = [
  { id: 'kinematics', label: 'Kinematics', course: 'physics',
    aliases: ['motion', 'velocity', 'acceleration', 'displacement', 'speed', 'position-time graphs', 'motion graphs', 'free fall', 'projectile motion', 'kinematic equations', 'suvat', 'linear motion', '1d motion'],
    summary: 'No high school PE is about kinematics as such. Describing motion (position, velocity, acceleration, graphs) is the language students use to produce evidence for several PEs, most directly HS-PS2-1.',
    connections: [
      { code: 'HS-PS2-1', fit: 'partial', note: 'Velocity–time and position–time data are the evidence students analyze, but the target is the causal, mathematical relationship among net force, mass, and acceleration. Describing motion alone does not address it.' },
      { code: 'HS-PS2-2', fit: 'contextual', note: 'Before-and-after velocities are needed to compute momentum, in one dimension only.' },
      { code: 'HS-PS3-1', fit: 'contextual', note: 'Speed measurements feed kinetic-energy accounting.' },
      { code: 'HS-ESS1-4', fit: 'contextual', note: 'Predicting orbital motion uses motion concepts with gravitational force.' },
      { code: 'MS-PS2-2', fit: 'earlier', note: 'Students were expected to provide evidence that change in motion depends on net force and mass.' },
      { code: '3-PS2-2', fit: 'earlier', note: 'Students measured motion to show patterns can predict future motion.' }
    ],
    gap: 'Two-dimensional projectile motion, vector components, and drilling the kinematic equations are not required by any single HS PE. They may still be valuable tools, but they are not the expectation itself.' },

  { id: 'newtons-laws', label: 'Newton’s Laws and Forces', course: 'physics',
    aliases: ['forces', 'force', 'newton', 'f=ma', 'free body diagrams', 'net force', 'inertia', 'friction', 'dynamics', 'third law'],
    summary: 'Forces appear across several PEs, each with a different performance.',
    connections: [
      { code: 'HS-PS2-1', fit: 'direct', note: 'Analyze data to support Newton’s second law as a mathematical relationship.' },
      { code: 'HS-PS2-3', fit: 'partial', note: 'Applies force ideas to design a device that reduces collision force.' },
      { code: 'HS-PS2-4', fit: 'partial', note: 'Force laws for gravitational and electrostatic forces.' },
      { code: 'HS-PS2-2', fit: 'contextual', note: 'Momentum conservation follows from equal and opposite forces during interactions.' },
      { code: 'MS-PS2-1', fit: 'earlier', note: 'Newton’s third law was a middle school expectation.' },
      { code: 'MS-PS2-2', fit: 'earlier', note: 'The qualitative dependence of motion on net force and mass was a middle school expectation.' }
    ],
    gap: 'Newton’s third law is explicitly a middle school PE (MS-PS2-1). Inclined planes, pulleys, and friction coefficients are not named in any HS PE.' },

  { id: 'momentum', label: 'Momentum and Collisions', course: 'physics',
    aliases: ['impulse', 'collisions', 'conservation of momentum', 'elastic', 'inelastic', 'crash'],
    summary: 'Momentum is central to one PE and the scientific basis for an engineering PE.',
    connections: [
      { code: 'HS-PS2-2', fit: 'direct', note: 'Mathematical support for momentum conservation in two-body, one-dimensional systems.' },
      { code: 'HS-PS2-3', fit: 'direct', note: 'Designing to reduce collision force (change in momentum over time).' },
      { code: 'HS-PS3-1', fit: 'contextual', note: 'Energy accounting explains why kinetic energy is not always conserved in collisions.' },
      { code: 'MS-PS2-1', fit: 'earlier', note: 'Students applied Newton’s third law to colliding objects.' },
      { code: '4-PS3-3', fit: 'earlier', note: 'Students predicted energy changes when objects collide.' }
    ],
    gap: 'Two-dimensional collisions and elastic/inelastic classification with energy calculations go beyond HS-PS2-2’s boundary.' },

  { id: 'energy', label: 'Energy', course: 'physics',
    aliases: ['work', 'power', 'kinetic energy', 'potential energy', 'conservation of energy', 'energy transfer', 'efficiency', 'work-energy', 'mechanical energy'],
    summary: 'Energy is spread across the five HS-PS3 PEs and appears in chemistry, biology, and Earth science.',
    connections: [
      { code: 'HS-PS3-1', fit: 'direct', note: 'Computational model of energy changes in a system.' },
      { code: 'HS-PS3-2', fit: 'direct', note: 'Energy as motion and relative position at all scales.' },
      { code: 'HS-PS3-3', fit: 'partial', note: 'Design an energy-converting device.' },
      { code: 'HS-PS3-4', fit: 'partial', note: 'Thermal energy transfer and the second law.' },
      { code: 'HS-PS3-5', fit: 'partial', note: 'Forces and energy changes in field interactions.' },
      { code: 'HS-PS1-4', fit: 'contextual', note: 'Bond energy in chemical reactions.' },
      { code: 'HS-LS1-7', fit: 'contextual', note: 'Energy transfer in cellular respiration.' },
      { code: 'HS-ESS2-4', fit: 'contextual', note: 'Energy flow into and out of Earth’s systems.' },
      { code: 'MS-PS3-5', fit: 'earlier', note: 'Students argued that changes in kinetic energy mean energy transfer.' }
    ],
    gap: 'Work and power as named quantities are not in any HS PE. They can support energy accounting but are not the target.' },

  { id: 'waves', label: 'Waves and Sound', course: 'physics',
    aliases: ['wave', 'sound', 'frequency', 'wavelength', 'light', 'electromagnetic spectrum', 'em radiation', 'interference', 'doppler'],
    summary: 'Wave PEs emphasize mathematical relationships, models of radiation, and information technology.',
    connections: [
      { code: 'HS-PS4-1', fit: 'direct', note: 'Frequency, wavelength, and speed in various media.' },
      { code: 'HS-PS4-3', fit: 'partial', note: 'Wave versus particle models of electromagnetic radiation.' },
      { code: 'HS-PS4-4', fit: 'partial', note: 'Effects of absorbed radiation of different frequencies.' },
      { code: 'HS-PS4-5', fit: 'partial', note: 'How devices use wave behavior.' },
      { code: 'HS-PS4-2', fit: 'contextual', note: 'Digital transmission of information.' },
      { code: 'HS-ESS2-3', fit: 'contextual', note: 'Seismic waves as evidence of Earth’s interior.' },
      { code: 'MS-PS4-1', fit: 'earlier', note: 'Students used math to describe a simple wave model.' }
    ],
    gap: 'Interference patterns, standing waves, and Doppler calculations are not named in the HS PEs.' },

  { id: 'electricity-magnetism', label: 'Electricity and Magnetism', course: 'physics',
    aliases: ['electricity', 'magnetism', 'circuits', 'coulomb', 'electric field', 'magnetic field', 'induction', 'generator', 'motor', 'electrostatics', 'static electricity', 'current'],
    summary: 'HS PEs address electric and magnetic forces and fields, induction, and field energy. Circuit analysis is not a HS PE.',
    connections: [
      { code: 'HS-PS2-4', fit: 'direct', note: 'Coulomb’s law for electrostatic forces.' },
      { code: 'HS-PS2-5', fit: 'direct', note: 'Current produces magnetic fields; changing fields produce current.' },
      { code: 'HS-PS3-5', fit: 'direct', note: 'Model forces and energy changes through electric or magnetic fields.' },
      { code: 'HS-PS3-3', fit: 'contextual', note: 'Generators as energy-conversion devices.' },
      { code: 'MS-PS2-3', fit: 'earlier', note: 'Students asked questions about factors affecting electric and magnetic force strength.' }
    ],
    gap: 'Ohm’s law and series/parallel circuit analysis are not required by any HS PE.' },

  { id: 'gravity-orbits', label: 'Gravity and Orbits', course: 'physics',
    aliases: ['gravitation', 'orbit', 'kepler', 'satellites', 'universal gravitation', 'planets', 'circular motion'],
    summary: 'Gravity connects physics with Earth and space science.',
    connections: [
      { code: 'HS-PS2-4', fit: 'direct', note: 'Newton’s law of gravitation.' },
      { code: 'HS-ESS1-4', fit: 'direct', note: 'Predict orbital motion mathematically or computationally.' },
      { code: 'HS-PS2-1', fit: 'contextual', note: 'Gravity can supply the net force in second-law analysis (falling objects).' },
      { code: 'MS-ESS1-2', fit: 'earlier', note: 'Students modeled the role of gravity in solar system motion.' }
    ],
    gap: 'Uniform circular motion with centripetal force calculations is not named in a HS PE.' },

  { id: 'stoichiometry', label: 'Stoichiometry', course: 'chemistry',
    aliases: ['mole', 'moles', 'molar mass', 'balancing equations', 'limiting reactant', 'percent yield', 'mole ratio', 'conservation of mass'],
    summary: 'Stoichiometry lives inside one PE, which frames it as evidence for conservation rather than as a procedure.',
    connections: [
      { code: 'HS-PS1-7', fit: 'direct', note: 'Use mathematical representations (including the mole) to support conservation of atoms and mass.' },
      { code: 'HS-PS1-2', fit: 'contextual', note: 'Predicting products of simple reactions.' },
      { code: 'HS-ESS2-6', fit: 'contextual', note: 'Quantitative carbon-cycle models rely on mass accounting.' },
      { code: 'MS-PS1-5', fit: 'earlier', note: 'Students modeled why atoms and mass are conserved.' },
      { code: '5-PS1-2', fit: 'earlier', note: 'Students measured that total weight is conserved.' }
    ],
    gap: 'The clarification emphasizes mathematical thinking over memorized problem-solving procedures; complex reactions are excluded.' },

  { id: 'bonding', label: 'Chemical Bonding', course: 'chemistry',
    aliases: ['bonds', 'ionic', 'covalent', 'metallic', 'lewis structures', 'molecular shape', 'vsepr', 'intermolecular forces', 'imf', 'polarity'],
    summary: 'Bonding appears through properties, forces between particles, designed materials, and bond energy.',
    connections: [
      { code: 'HS-PS1-1', fit: 'partial', note: 'Predict types and numbers of bonds from periodic patterns.' },
      { code: 'HS-PS1-3', fit: 'partial', note: 'Infer strength of forces between particles from bulk properties.' },
      { code: 'HS-PS2-6', fit: 'partial', note: 'Why molecular-level structure matters for designed materials.' },
      { code: 'HS-PS1-4', fit: 'partial', note: 'Bond energy changes determine energy released or absorbed.' },
      { code: 'MS-PS1-1', fit: 'earlier', note: 'Students modeled atomic composition of molecules and extended structures.' }
    ],
    gap: 'VSEPR shapes and naming specific intermolecular forces are not targets; HS-PS1-3 emphasizes strength of forces rather than naming them.' },

  { id: 'periodic-table', label: 'Periodic Table and Atomic Structure', course: 'chemistry',
    aliases: ['atoms', 'electron configuration', 'periodic trends', 'valence electrons', 'atomic structure', 'atomic theory', 'ionization energy'],
    summary: 'The periodic table is framed as a predictive model.',
    connections: [
      { code: 'HS-PS1-1', fit: 'direct', note: 'Use the periodic table as a model to predict relative properties.' },
      { code: 'HS-PS1-2', fit: 'partial', note: 'Explain reaction outcomes using electron states and trends.' },
      { code: 'HS-ESS1-3', fit: 'contextual', note: 'How stars produce elements.' },
      { code: 'MS-PS1-1', fit: 'earlier', note: 'Atomic composition of simple molecules.' }
    ],
    gap: 'Full electron configurations, quantum numbers, and history of atomic models are not required by the PEs; the assessment boundary covers main-group elements and relative trends.' },

  { id: 'reactions', label: 'Chemical Reactions', course: 'chemistry',
    aliases: ['reaction types', 'combustion', 'synthesis', 'decomposition', 'single replacement', 'double replacement', 'redox'],
    summary: 'Reactions run through several PS1 PEs, each with a distinct performance.',
    connections: [
      { code: 'HS-PS1-2', fit: 'direct', note: 'Explain outcomes of simple reactions.' },
      { code: 'HS-PS1-4', fit: 'partial', note: 'Energy changes in reactions.' },
      { code: 'HS-PS1-5', fit: 'partial', note: 'Reaction rates.' },
      { code: 'HS-PS1-6', fit: 'partial', note: 'Equilibrium.' },
      { code: 'HS-PS1-7', fit: 'partial', note: 'Conservation of atoms and mass.' },
      { code: 'MS-PS1-2', fit: 'earlier', note: 'Identifying evidence of chemical reactions.' }
    ],
    gap: 'Memorizing reaction-type classifications is not a PE target.' },

  { id: 'kinetics-equilibrium', label: 'Reaction Rates and Equilibrium', course: 'chemistry',
    aliases: ['kinetics', 'rate', 'collision theory', 'le chatelier', 'equilibrium', 'catalyst'],
    summary: 'Two PEs, qualitative and molecular in focus.',
    connections: [
      { code: 'HS-PS1-5', fit: 'direct', note: 'Temperature and concentration effects on rate.' },
      { code: 'HS-PS1-6', fit: 'direct', note: 'Refine a chemical system to increase product at equilibrium.' },
      { code: 'MS-PS1-4', fit: 'earlier', note: 'Particle motion and temperature.' }
    ],
    gap: 'Rate laws, equilibrium constants, and ICE tables are excluded by the assessment boundaries. Catalysts are not named.' },

  { id: 'thermochemistry', label: 'Thermochemistry', course: 'chemistry',
    aliases: ['enthalpy', 'calorimetry', 'specific heat', 'exothermic', 'endothermic', 'heat', 'temperature', 'thermodynamics'],
    summary: 'Thermochemistry spans bond energy and thermal energy transfer.',
    connections: [
      { code: 'HS-PS1-4', fit: 'direct', note: 'Model energy release or absorption from changes in total bond energy.' },
      { code: 'HS-PS3-4', fit: 'direct', note: 'Investigate thermal energy transfer toward uniform distribution.' },
      { code: 'HS-PS3-1', fit: 'partial', note: 'Computational energy accounting.' },
      { code: 'MS-PS3-4', fit: 'earlier', note: 'Energy transferred, type of matter, mass, and temperature change.' }
    ],
    gap: 'Calculating enthalpy from bond energies is excluded from HS-PS1-4. Hess’s law is not named.' },

  { id: 'gas-laws', label: 'Gas Laws', course: 'chemistry',
    aliases: ['boyle', 'charles', 'ideal gas', 'pressure', 'kinetic molecular theory', 'gases'],
    summary: 'No HS PE is centered on gas laws. Related ideas appear in particle models of energy and matter.',
    connections: [
      { code: 'HS-PS3-2', fit: 'contextual', note: 'Temperature as energy of particle motion.' },
      { code: 'HS-PS1-3', fit: 'contextual', note: 'Bulk properties and forces between particles (vapor pressure is named).' },
      { code: 'MS-PS1-4', fit: 'earlier', note: 'Particle motion, temperature, and state.' }
    ],
    gap: 'Boyle’s, Charles’s, and the ideal gas law are not required by any HS PE.' },

  { id: 'nuclear', label: 'Nuclear Chemistry', course: 'chemistry',
    aliases: ['radioactivity', 'fission', 'fusion', 'half-life', 'radioactive decay', 'isotopes'],
    summary: 'One PE plus Earth and space applications.',
    connections: [
      { code: 'HS-PS1-8', fit: 'direct', note: 'Model nuclear changes and energy released in fission, fusion, and decay.' },
      { code: 'HS-ESS1-1', fit: 'contextual', note: 'Fusion in the sun.' },
      { code: 'HS-ESS1-5', fit: 'contextual', note: 'Radiometric dating of crustal rocks (PS1.C secondary).' },
      { code: 'HS-ESS1-6', fit: 'contextual', note: 'Radiometric ages of meteorites and Earth’s oldest minerals.' }
    ],
    gap: 'Quantitative nuclear energy calculations are excluded; alpha, beta, and gamma decays only.' },

  { id: 'acids-bases', label: 'Acids and Bases', course: 'chemistry',
    aliases: ['ph', 'acid', 'base', 'neutralization', 'titration', 'ocean acidification'],
    summary: 'No HS PE is centered on acids and bases. They appear as contexts.',
    connections: [
      { code: 'HS-PS1-2', fit: 'contextual', note: 'Simple reaction outcomes (assessment boundary: main group and combustion).' },
      { code: 'HS-PS1-6', fit: 'contextual', note: 'Acid-base equilibria can serve as equilibrium contexts.' },
      { code: 'HS-ESS3-6', fit: 'contextual', note: 'Ocean acidification is named in the clarification as an Earth-system change.' }
    ],
    gap: 'pH calculations and titration are not required by any HS PE.' },

  { id: 'cell-structure', label: 'Cell Structure', course: 'biology',
    aliases: ['cells', 'organelles', 'cell membrane', 'cell theory', 'prokaryote', 'eukaryote', 'microscope'],
    summary: 'Cell structure is mostly a middle school expectation. High school builds on it through function and organization.',
    connections: [
      { code: 'HS-LS1-1', fit: 'partial', note: 'DNA determines protein structure; proteins carry out functions in specialized cells.' },
      { code: 'HS-LS1-2', fit: 'contextual', note: 'Hierarchical organization of interacting systems.' },
      { code: 'MS-LS1-1', fit: 'earlier', note: 'Living things are made of cells.' },
      { code: 'MS-LS1-2', fit: 'earlier', note: 'Function of a cell and its parts.' }
    ],
    gap: 'Identifying organelles and cell types is not a HS PE target; HS-LS1-1’s boundary excludes identifying specific cell or tissue types.' },

  { id: 'dna-protein', label: 'DNA and Protein Synthesis', course: 'biology',
    aliases: ['transcription', 'translation', 'central dogma', 'genes', 'protein synthesis', 'mrna', 'codon'],
    summary: 'The PEs focus on the causal link from DNA to protein to function, not the biochemistry.',
    connections: [
      { code: 'HS-LS1-1', fit: 'direct', note: 'Explain how DNA structure determines protein structure and function.' },
      { code: 'HS-LS3-1', fit: 'partial', note: 'Ask questions about DNA and chromosomes coding for traits.' },
      { code: 'MS-LS3-1', fit: 'earlier', note: 'Mutations may affect proteins and traits.' }
    ],
    gap: 'The biochemistry of protein synthesis is excluded by HS-LS1-1’s assessment boundary.' },

  { id: 'genetics', label: 'Genetics and Heredity', course: 'biology',
    aliases: ['mendel', 'punnett squares', 'inheritance', 'alleles', 'dominant', 'recessive', 'heredity', 'pedigree', 'mutations'],
    summary: 'Three LS3 PEs, emphasizing questions, argument, and statistics.',
    connections: [
      { code: 'HS-LS3-1', fit: 'direct', note: 'Ask questions about DNA and chromosomes coding for inherited traits.' },
      { code: 'HS-LS3-2', fit: 'direct', note: 'Argue sources of inheritable variation.' },
      { code: 'HS-LS3-3', fit: 'direct', note: 'Statistics and probability of trait distribution.' },
      { code: 'HS-LS4-2', fit: 'contextual', note: 'Heritable variation is a factor in evolution.' },
      { code: '3-LS3-1', fit: 'earlier', note: 'Traits inherited from parents and variation in a group.' }
    ],
    gap: 'Punnett-square problem sets are a tool, not a target. Hardy-Weinberg calculations are excluded from HS-LS3-3.' },

  { id: 'cell-division', label: 'Mitosis and Meiosis', course: 'biology',
    aliases: ['mitosis', 'meiosis', 'cell cycle', 'cell division', 'crossing over'],
    summary: 'Division appears through its roles, not its phases.',
    connections: [
      { code: 'HS-LS1-4', fit: 'direct', note: 'Model mitosis and differentiation producing and maintaining organisms.' },
      { code: 'HS-LS3-2', fit: 'partial', note: 'Meiosis as a source of new genetic combinations.' }
    ],
    gap: 'Memorizing mitosis steps is excluded from HS-LS1-4; the phases of meiosis are excluded from HS-LS3-1 and HS-LS3-2.' },

  { id: 'respiration-photosynthesis', label: 'Cellular Respiration and Photosynthesis', course: 'biology',
    aliases: ['cellular respiration', 'photosynthesis', 'atp', 'mitochondria', 'chloroplast', 'fermentation', 'krebs'],
    summary: 'Matter and energy models, not biochemical pathways.',
    connections: [
      { code: 'HS-LS1-5', fit: 'direct', note: 'Model photosynthesis transforming light energy into stored chemical energy.' },
      { code: 'HS-LS1-7', fit: 'direct', note: 'Model respiration as bonds breaking and forming with net energy transfer.' },
      { code: 'HS-LS2-3', fit: 'partial', note: 'Aerobic and anaerobic conditions in ecosystems.' },
      { code: 'HS-LS2-5', fit: 'partial', note: 'Carbon cycling.' },
      { code: 'HS-PS1-4', fit: 'contextual', note: 'The same bond-energy model in chemistry.' },
      { code: 'MS-LS1-6', fit: 'earlier', note: 'Photosynthesis in cycling matter and energy.' }
    ],
    gap: 'Glycolysis, Krebs cycle, and light reactions in detail are excluded by the assessment boundaries.' },

  { id: 'ecology', label: 'Ecology and Ecosystems', course: 'biology',
    aliases: ['ecosystems', 'food webs', 'populations', 'carrying capacity', 'biodiversity', 'trophic levels', 'energy pyramid', 'succession', 'limiting factors'],
    summary: 'Eight LS2 PEs spanning populations, matter and energy, stability, and human impact.',
    connections: [
      { code: 'HS-LS2-1', fit: 'direct', note: 'Carrying capacity with mathematical and computational representations.' },
      { code: 'HS-LS2-2', fit: 'direct', note: 'Biodiversity and populations.' },
      { code: 'HS-LS2-4', fit: 'direct', note: 'Matter and energy among trophic levels.' },
      { code: 'HS-LS2-6', fit: 'direct', note: 'Ecosystem stability and change.' },
      { code: 'HS-LS2-7', fit: 'partial', note: 'Solutions to reduce human impacts.' },
      { code: 'HS-ESS3-3', fit: 'contextual', note: 'Simulating sustainability and biodiversity.' },
      { code: 'MS-LS2-1', fit: 'earlier', note: 'Resource availability and populations.' }
    ],
    gap: 'Vocabulary-heavy biome surveys are not a PE target.' },

  { id: 'evolution', label: 'Evolution and Natural Selection', course: 'biology',
    aliases: ['natural selection', 'adaptation', 'speciation', 'darwin', 'common ancestry', 'evidence of evolution', 'phylogeny', 'cladogram'],
    summary: 'Six LS4 PEs on evidence, mechanism, statistics, and human impact.',
    connections: [
      { code: 'HS-LS4-1', fit: 'direct', note: 'Multiple lines of evidence for common ancestry.' },
      { code: 'HS-LS4-2', fit: 'direct', note: 'Four factors of evolution.' },
      { code: 'HS-LS4-3', fit: 'direct', note: 'Statistics of advantageous traits.' },
      { code: 'HS-LS4-4', fit: 'direct', note: 'Natural selection leads to adaptation.' },
      { code: 'HS-LS4-5', fit: 'partial', note: 'Environmental change, speciation, and extinction.' },
      { code: '3-LS4-2', fit: 'earlier', note: 'Variation can provide advantages in survival and reproduction.' }
    ],
    gap: 'Genetic drift, gene flow, and co-evolution are excluded from HS-LS4-2’s boundary.' },

  { id: 'homeostasis', label: 'Homeostasis and Body Systems', course: 'biology',
    aliases: ['feedback', 'body systems', 'human body', 'organ systems', 'anatomy', 'physiology'],
    summary: 'Systems and feedback, not anatomy.',
    connections: [
      { code: 'HS-LS1-2', fit: 'direct', note: 'Model hierarchical organization of interacting systems.' },
      { code: 'HS-LS1-3', fit: 'direct', note: 'Investigate feedback mechanisms maintaining homeostasis.' },
      { code: 'MS-LS1-3', fit: 'earlier', note: 'The body as a system of interacting subsystems.' }
    ],
    gap: 'Detailed organ-system anatomy is not required; HS-LS1-2 excludes molecular-level interactions.' },

  { id: 'climate', label: 'Climate Change', course: null,
    aliases: ['global warming', 'greenhouse effect', 'carbon cycle', 'climate', 'sea level rise'],
    summary: 'Climate is integrated across Earth and space science and connects to every course. NJDOE marks climate-related PEs with a climate symbol.',
    connections: [
      { code: 'HS-ESS2-4', fit: 'direct', note: 'Model how changes in energy flow change climate.' },
      { code: 'HS-ESS3-5', fit: 'direct', note: 'Forecast rates and impacts of climate change from data and models.' },
      { code: 'HS-ESS3-6', fit: 'direct', note: 'Computational representation of human modification of Earth systems.' },
      { code: 'HS-ESS2-6', fit: 'partial', note: 'Quantitative carbon cycle.' },
      { code: 'HS-PS3-1', fit: 'contextual', note: 'Energy accounting underlies Earth’s energy budget.' },
      { code: 'HS-LS2-5', fit: 'contextual', note: 'Photosynthesis and respiration in carbon cycling.' },
      { code: 'MS-ESS3-5', fit: 'earlier', note: 'Questions about factors causing climate change.' }
    ],
    gap: null },

  { id: 'plate-tectonics', label: 'Plate Tectonics and Earth’s Interior', course: 'physics',
    aliases: ['earthquakes', 'volcanoes', 'plates', 'seafloor spreading', 'mantle', 'rock cycle', 'geology'],
    summary: 'Integrated into the NJDOE model physics and chemistry courses.',
    connections: [
      { code: 'HS-ESS2-1', fit: 'direct', note: 'Internal and surface processes form features.' },
      { code: 'HS-ESS2-3', fit: 'direct', note: 'Thermal convection in Earth’s interior.' },
      { code: 'HS-ESS1-5', fit: 'direct', note: 'Plate tectonics explains ages of crustal rocks.' },
      { code: 'HS-PS4-1', fit: 'contextual', note: 'Seismic waves.' },
      { code: 'MS-ESS2-3', fit: 'earlier', note: 'Evidence of past plate motions.' }
    ],
    gap: null },

  { id: 'astronomy', label: 'Stars and the Universe', course: 'physics',
    aliases: ['stars', 'big bang', 'sun', 'galaxies', 'stellar evolution', 'cosmology', 'redshift', 'astronomy'],
    summary: 'ESS1 PEs integrated into model physics and chemistry units.',
    connections: [
      { code: 'HS-ESS1-1', fit: 'direct', note: 'The sun’s life span and fusion.' },
      { code: 'HS-ESS1-2', fit: 'direct', note: 'Evidence for the Big Bang.' },
      { code: 'HS-ESS1-3', fit: 'direct', note: 'Stars produce elements.' },
      { code: 'HS-PS1-8', fit: 'contextual', note: 'Fusion and nuclear processes.' },
      { code: 'HS-PS4-3', fit: 'contextual', note: 'Light as evidence; models of radiation.' }
    ],
    gap: null },

  { id: 'engineering-design', label: 'Engineering Design', course: null,
    aliases: ['engineering', 'design', 'design process', 'criteria', 'constraints', 'prototype', 'stem', 'trade-offs'],
    summary: 'Four HS-ETS1 PEs, plus engineering embedded in many disciplinary PEs.',
    connections: [
      { code: 'HS-ETS1-1', fit: 'direct', note: 'Specify criteria and constraints for a global challenge.' },
      { code: 'HS-ETS1-2', fit: 'direct', note: 'Break a complex problem into smaller problems.' },
      { code: 'HS-ETS1-3', fit: 'direct', note: 'Evaluate solutions with prioritized criteria and trade-offs.' },
      { code: 'HS-ETS1-4', fit: 'direct', note: 'Simulate impacts of proposed solutions.' },
      { code: 'HS-PS2-3', fit: 'partial', note: 'Design to minimize collision force.' },
      { code: 'HS-PS3-3', fit: 'partial', note: 'Design an energy converter.' },
      { code: 'HS-LS2-7', fit: 'partial', note: 'Design solutions to reduce human impacts.' }
    ],
    gap: null }
];
