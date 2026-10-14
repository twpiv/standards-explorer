/* Curated relationships between performance expectations (stored separately from the standards themselves).

   Each relationship
     id         stable identifier
     between    [codeA, codeB]. Relationships are undirected unless `directional: true` (then A -> B)
     category   'disciplinary'      closely related disciplinary ideas
                'practice'          shared science and engineering practice (curated, with reasoning)
                'crosscutting'      shared crosscutting concept (curated, with reasoning)
                'interdisciplinary' a useful connection across disciplines (PS/LS/ESS/ETS)
                'engineering'       an engineering design application
                'integration'       a possible instructional integration
     strength   3 = central, 2 = meaningful, 1 = worth knowing (shown under "Show more")
     status     'documented'  supported by an official structure: a shared NGSS foundation-box DCI component,
                              co-placement in an NJDOE model unit, or official PE/clarification wording
                'suggested'   a professional instructional suggestion; never a requirement or a prerequisite
     evidence   list of { kind: 'shared-dci' | 'model-unit' | 'wording' | 'clarification' | 'reasoning', note }
                The validator checks that every 'documented' relationship has at least one non-'reasoning'
                evidence item and that shared-dci and model-unit claims are true in the generated data.
     label      short name for the link
     why        app-written explanation of the reasoning (provenance: suggested)
     question   optional exploratory question

   Shared DCI/SEP/CCC links are ALSO computed automatically by js/core/engine.js and are labeled as such.
   Curated entries here add reasoning; they never upgrade a suggestion into a requirement.
*/
window.SE = window.SE || {}; SE.data = SE.data || {};

SE.data.relationships = [

  /* ------------------------------ Physics: forces and motion ------------------------------ */
  { id: 'ps2-1__ps2-2', between: ['HS-PS2-1', 'HS-PS2-2'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Forces lead to momentum',
    why: 'Both PEs build PS2.A Forces and Motion. Newton’s second law and momentum conservation describe the same interactions in two ways: net force equals the rate of change of momentum, and during a collision the forces between two objects change their momenta by equal and opposite amounts. Investigations with carts and motion sensors can produce evidence for both.',
    question: 'How might investigations of forces and interactions support a later understanding of momentum?',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS2.A Forces and Motion in their NGSS foundation boxes.' },
                { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.3 Collisions and Momentum.' } ] },

  { id: 'ps2-1__ps2-3', between: ['HS-PS2-1', 'HS-PS2-3'], category: 'engineering', strength: 3, status: 'documented',
    label: 'Forces in collision safety',
    why: 'HS-PS2-3 applies force-and-motion ideas to an engineering problem: reducing the force on an object during a collision. The reasoning students need (a large change in velocity over a short time means a large acceleration and therefore a large net force) comes directly from the relationship in HS-PS2-1. A collision-safety investigation could involve both PEs, with HS-PS2-2 for momentum and HS-ETS1-3 for trade-offs. That integration is a suggestion, not a required grouping.',
    question: 'How can understanding forces and interactions inform an engineering solution designed to reduce collision forces?',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS2.A Forces and Motion.' },
                { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.3.' } ] },

  { id: 'ps2-1__ps3-1', between: ['HS-PS2-1', 'HS-PS3-1'], category: 'disciplinary', strength: 2, status: 'suggested',
    label: 'Motion as a context for energy accounting',
    why: 'The same cart, ramp, and falling-object systems used for force-and-motion data can be analyzed with energy accounting. Comparing the force description and the energy description of one system helps students see what each explains well. For example, energy accounting can quantify where energy goes when friction slows a cart. The PEs come from different DCIs (PS2.A and PS3.A/PS3.B), so this is an instructional connection, not a documented one.',
    question: 'How might motion and forces provide a useful context for developing an understanding of energy changes and transfers?',
    evidence: [ { kind: 'reasoning', note: 'Shared physical systems; work connects force and energy (an idea related to PS3.C).' } ] },

  { id: 'ps2-1__ess1-4', between: ['HS-PS2-1', 'HS-ESS1-4'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'The same laws govern orbits',
    why: 'Orbital motion is Newton’s second law applied with the gravitational force as the net force. A satellite is continuously accelerating toward Earth. Connecting HS-PS2-1 to HS-ESS1-4 shows students that Earth and space science uses the same causal reasoning as laboratory mechanics, though HS-ESS1-4 adds the gravitational force law and two-body systems.',
    evidence: [ { kind: 'reasoning', note: 'The HS-ESS1-4 clarification emphasizes Newtonian gravitational laws governing orbits.' } ] },

  { id: 'ps2-1__ps2-4', between: ['HS-PS2-1', 'HS-PS2-4'], category: 'disciplinary', strength: 2, status: 'suggested',
    label: 'Where does the net force come from?',
    why: 'HS-PS2-1 treats the net force as something students measure or are given. HS-PS2-4 provides mathematical models for two kinds of force (gravitational and electrostatic). Together they let students predict motion from the interaction itself. The PEs build different DCI components (PS2.A and PS2.B).',
    evidence: [ { kind: 'reasoning', note: 'Same core idea (PS2), different components.' } ] },

  { id: 'ps2-2__ps2-3', between: ['HS-PS2-2', 'HS-PS2-3'], category: 'engineering', strength: 3, status: 'documented',
    label: 'Momentum change and protective design',
    why: 'A protective device cannot change how much an object’s momentum changes when it stops. It can only change how long that change takes. HS-PS2-2 gives students momentum as a quantity; HS-PS2-3 asks them to design around the relationship between change in momentum, time, and force.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS2.A Forces and Motion.' },
                { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.3.' } ] },

  { id: 'ps2-2__ps3-1', between: ['HS-PS2-2', 'HS-PS3-1'], category: 'disciplinary', strength: 2, status: 'suggested',
    label: 'Momentum is conserved; is kinetic energy?',
    why: 'In a collision where carts stick together, total momentum is conserved but kinetic energy is not. Energy accounting (HS-PS3-1) explains where it went, into thermal energy and sound. Putting the two conservation ideas side by side helps students understand that conservation of energy and conservation of momentum are different claims.',
    evidence: [ { kind: 'reasoning', note: 'Common collision systems; distinct conserved quantities.' } ] },

  { id: 'ps2-3__ets1-3', between: ['HS-PS2-3', 'HS-ETS1-3'], category: 'engineering', strength: 3, status: 'documented',
    label: 'Evaluating safety trade-offs',
    why: 'Real collision-safety designs balance force reduction against cost, mass, comfort, reliability, and aesthetics. HS-ETS1-3 asks students to evaluate solutions with prioritized criteria and trade-offs, which turns a helmet or bumper project into an authentic engineering evaluation.',
    evidence: [ { kind: 'model-unit', note: 'NJDOE model unit P.3 includes HS-ETS1-3 (developed across courses) alongside HS-PS2-3.' } ] },

  { id: 'ps2-3__ets1-2', between: ['HS-PS2-3', 'HS-ETS1-2'], category: 'engineering', strength: 2, status: 'documented',
    label: 'Breaking down vehicle safety',
    why: 'Vehicle crash safety is a complex problem that engineers break into smaller ones: crumple zones, restraints, airbags, and helmet design. HS-ETS1-2 is about that decomposition; HS-PS2-3 is one well-defined subproblem.',
    evidence: [ { kind: 'shared-dci', note: 'HS-PS2-3 lists ETS1.C Optimizing the Design Solution (secondary); HS-ETS1-2 lists ETS1.C.' } ] },

  { id: 'ps2-4__ess1-4', between: ['HS-PS2-4', 'HS-ESS1-4'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'Gravitation predicts orbits',
    why: 'Newton’s law of gravitation (HS-PS2-4) is the force law behind orbital predictions (HS-ESS1-4). Students can use the same mathematical model to calculate the force on a satellite and to predict its period.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.4 Meteors, Orbits, and Gravity.' } ] },

  { id: 'ps2-4__ps1-3', between: ['HS-PS2-4', 'HS-PS1-3'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Coulomb’s law at the particle scale',
    why: 'The electrostatic forces described by Coulomb’s law are the same forces that hold particles together in substances. HS-PS1-3 asks students to infer the strength of those attractions from bulk properties, which connects a physics force law to chemistry evidence.',
    evidence: [ { kind: 'shared-dci', note: 'HS-PS1-3 lists PS2.B Types of Interactions (secondary); HS-PS2-4 lists PS2.B.' },
                { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.2 Structure and Properties of Matter.' } ] },

  { id: 'ps2-4__ps3-5', between: ['HS-PS2-4', 'HS-PS3-5'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Fields: force and energy',
    why: 'HS-PS2-4 describes the forces between charged or massive objects; HS-PS3-5 asks students to model both the forces and the energy changes when objects interact through fields. Together they connect a force view and an energy view of the same interaction.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.2.' } ] },

  { id: 'ps2-5__ps3-3', between: ['HS-PS2-5', 'HS-PS3-3'], category: 'engineering', strength: 2, status: 'documented',
    label: 'From induction to a generator',
    why: 'Electromagnetic induction (HS-PS2-5) is the principle behind generators, one of the energy-conversion devices named in the HS-PS3-3 clarification. Students who build a generator apply induction in a design context.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.1 Energy Flow from Earth’s Systems.' } ] },

  { id: 'ps2-5__ps3-5', between: ['HS-PS2-5', 'HS-PS3-5'], category: 'disciplinary', strength: 2, status: 'suggested',
    label: 'Magnetic interactions and energy',
    why: 'HS-PS2-5 establishes that currents and changing magnetic fields interact; HS-PS3-5 asks students to model forces and energy changes for objects interacting through electric or magnetic fields.',
    evidence: [ { kind: 'reasoning', note: 'Both involve electric and magnetic fields (PS2.B and PS3.C).' } ] },

  { id: 'ps2-5__ess3-2', between: ['HS-PS2-5', 'HS-ESS3-2'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'How electricity is generated, and at what cost',
    why: 'Almost all large-scale electricity generation, from fossil fuels, nuclear, wind, or hydropower, relies on induction. The revised HS-ESS3-2 asks students to weigh the economic, social, environmental, and geopolitical costs, risks, and benefits of energy solutions. Knowing how generation works gives that evaluation a scientific footing.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.1.' } ] },

  /* ------------------------------ Physics: energy ------------------------------ */
  { id: 'ps3-1__ps3-2', between: ['HS-PS3-1', 'HS-PS3-2'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Defining energy, then accounting for it',
    why: 'HS-PS3-2 gives students a model of what energy is (motion and relative position, at every scale); HS-PS3-1 asks them to account for it quantitatively in a system. Each makes the other more meaningful.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS3.A Definitions of Energy.' },
                { kind: 'model-unit', note: 'Both appear in NJDOE model units P.1 and P.4 (and C.5).' } ] },

  { id: 'ps3-1__ps3-4', between: ['HS-PS3-1', 'HS-PS3-4'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Energy accounting and the second law',
    why: 'Mixing hot and cold water is an energy-accounting problem (HS-PS3-1) and also evidence that energy spreads toward uniformity (HS-PS3-4). One investigation can generate evidence for both, while the PEs ask for different performances: a computational model and an investigation.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS3.B Conservation of Energy and Energy Transfer.' },
                { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.1 Thermodynamics in Earth’s Systems.' } ] },

  { id: 'ps3-1__ess2-4', between: ['HS-PS3-1', 'HS-ESS2-4'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'Earth’s energy budget',
    why: 'Climate change is, at its core, an energy-accounting problem: when energy flowing into Earth’s systems exceeds energy flowing out, the system warms. The modeling students do in HS-PS3-1 is the same reasoning HS-ESS2-4 applies to Earth’s climate.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.1 (HS-ESS2-4 develops across courses).' } ] },

  { id: 'ps3-1__ets1-4', between: ['HS-PS3-1', 'HS-ETS1-4'], category: 'engineering', strength: 2, status: 'documented',
    label: 'Simulating energy solutions',
    why: 'A computational energy model (HS-PS3-1) can grow into a computer simulation that tests proposed solutions to a complex problem, such as a building’s heating needs or a regional energy system (HS-ETS1-4).',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.1.' } ] },

  { id: 'ps3-1__ls2-4', between: ['HS-PS3-1', 'HS-LS2-4'], category: 'interdisciplinary', strength: 1, status: 'suggested',
    label: 'Energy accounting in ecosystems',
    why: 'Trophic-level calculations in HS-LS2-4 are energy accounting applied to living systems. Most energy entering a trophic level leaves as thermal energy from respiration rather than being stored as biomass.',
    evidence: [ { kind: 'reasoning', note: 'Both rely on conservation of energy across a defined system (CCC Energy and Matter).' } ] },

  { id: 'ps3-2__ps1-4', between: ['HS-PS3-2', 'HS-PS1-4'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'Bond energy is position energy',
    why: 'HS-PS3-2 says energy can be accounted for as motion plus relative position of particles. Chemical bond energy is energy of relative position of atoms. HS-PS1-4 uses exactly this idea to explain why reactions release or absorb energy.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.5 Energy from Chemical and Nuclear Processes.' } ] },

  { id: 'ps3-2__ps3-5', between: ['HS-PS3-2', 'HS-PS3-5'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Energy stored in fields',
    why: 'The HS-PS3-2 clarification mentions energy stored between charged plates. HS-PS3-5 asks students to model the forces and energy changes for objects interacting through fields.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model units C.2 and C.5.' } ] },

  { id: 'ps3-3__ess3-2', between: ['HS-PS3-3', 'HS-ESS3-2'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'From a device to an energy system',
    why: 'Students who design an energy converter (HS-PS3-3) experience efficiency and constraints at a small scale. The revised HS-ESS3-2 asks them to evaluate real energy and mineral resource solutions by weighing economic, social, environmental, and geopolitical costs and risks, as well as benefits. A wind turbine project can lead naturally into evaluating offshore wind.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.1 (HS-ESS3-2 develops across courses).' } ] },

  { id: 'ps3-3__ets1-3', between: ['HS-PS3-3', 'HS-ETS1-3'], category: 'engineering', strength: 2, status: 'documented',
    label: 'Evaluating a design with trade-offs',
    why: 'HS-PS3-3 asks students to design and refine within constraints; HS-ETS1-3 asks them to evaluate solutions with prioritized criteria, including social and environmental impacts.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.1.' } ] },

  { id: 'ps3-3__ess3-4', between: ['HS-PS3-3', 'HS-ESS3-4'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'Technologies that reduce climate impacts',
    why: 'Energy-conversion devices such as solar cells and wind turbines are among the technological solutions HS-ESS3-4 asks students to evaluate or refine.',
    evidence: [ { kind: 'reasoning', note: 'The HS-PS3-3 clarification names wind turbines and solar cells.' } ] },

  /* ------------------------------ Physics: waves; Earth and space ------------------------------ */
  { id: 'ps4-1__ess2-3', between: ['HS-PS4-1', 'HS-ESS2-3'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'Seismic waves reveal Earth’s interior',
    why: 'Earth’s layered interior is known largely from how seismic waves change speed and direction in different materials. HS-PS4-1 names seismic waves as an example; HS-ESS2-3 lists wave properties as a secondary DCI for modeling Earth’s interior.',
    evidence: [ { kind: 'shared-dci', note: 'HS-ESS2-3 lists PS4.A Wave Properties (secondary); HS-PS4-1 lists PS4.A.' },
                { kind: 'clarification', note: 'The HS-PS4-1 clarification includes seismic waves traveling through Earth.' } ] },

  { id: 'ps4-1__ps4-3', between: ['HS-PS4-1', 'HS-PS4-3'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Wave model of light',
    why: 'The wave relationships in HS-PS4-1 are one of the two models of electromagnetic radiation students evaluate in HS-PS4-3.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS4.A Wave Properties.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.5.' } ] },

  { id: 'ps4-1__ps4-5', between: ['HS-PS4-1', 'HS-PS4-5'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Wave behavior in technology',
    why: 'Frequency, wavelength, and speed are the properties communication and imaging devices manipulate. HS-PS4-5 asks students to communicate how devices use wave behavior.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS4.A Wave Properties.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.5.' } ] },

  { id: 'ess1-4__ess1-6', between: ['HS-ESS1-4', 'HS-ESS1-6'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Orbits, impacts, and Earth’s history',
    why: 'Orbital mechanics explains why objects such as meteorites reach Earth; HS-ESS1-6 uses meteorites and cratering records as evidence of Earth’s formation and early history.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit P.4 Meteors, Orbits, and Gravity.' } ] },

  /* ------------------------------ Chemistry ------------------------------ */
  { id: 'ps1-1__ps1-2', between: ['HS-PS1-1', 'HS-PS1-2'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'From periodic patterns to reaction outcomes',
    why: 'HS-PS1-1 uses outer-electron patterns to predict relative properties; HS-PS1-2 uses the same patterns to explain the outcome of reactions. The periodic table model becomes the explanatory tool.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.A Structure and Properties of Matter.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.3.' } ] },

  { id: 'ps1-1__ps1-3', between: ['HS-PS1-1', 'HS-PS1-3'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Atomic structure and bulk properties',
    why: 'Electron arrangements determine the kinds of attractions between particles, which in turn produce the bulk properties students measure in HS-PS1-3.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.A and PS2.B (secondary).' }, { kind: 'model-unit', note: 'Both appear in NJDOE model units C.2 and C.3.' } ] },

  { id: 'ps1-1__ps2-6', between: ['HS-PS1-1', 'HS-PS2-6'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Structure at the molecular level matters',
    why: 'HS-PS2-6 asks students to communicate why molecular-level structure determines how designed materials function, such as why metals conduct. Periodic patterns from HS-PS1-1 help explain those structures.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.A.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model units C.2 and C.3.' } ] },

  { id: 'ps1-1__ess1-3', between: ['HS-PS1-1', 'HS-ESS1-3'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'Where the elements came from',
    why: 'Students who study the periodic table rarely ask where the elements came from. HS-ESS1-3 asks students to communicate how stars produce elements over their life cycles, which gives the periodic table a cosmic history.',
    evidence: [ { kind: 'reasoning', note: 'Element origin (ESS1.A) connects to element properties (PS1.A).' } ] },

  { id: 'ps1-2__ps1-7', between: ['HS-PS1-2', 'HS-PS1-7'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Predicting products, then conserving atoms',
    why: 'Once students can explain which products form (HS-PS1-2), they can use mathematics to show atoms and mass are conserved in that reaction (HS-PS1-7).',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.B Chemical Reactions.' } ] },

  { id: 'ps1-2__ps1-4', between: ['HS-PS1-2', 'HS-PS1-4'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'What forms, and what energy changes',
    why: 'Combustion reactions are named in the HS-PS1-2 assessment boundary and are classic examples for bond-energy models in HS-PS1-4.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.A and PS1.B.' } ] },

  { id: 'ps1-3__ess2-5', between: ['HS-PS1-3', 'HS-ESS2-5'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'Water’s unusual properties shape Earth',
    why: 'Water’s strong attractions between particles give it a high boiling point, high heat capacity, and expansion on freezing. HS-ESS2-5 asks students to investigate how those properties affect Earth materials and surface processes such as frost wedging and dissolving rock.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.3 Molecular Processes in Earth Systems.' } ] },

  { id: 'ps1-3__ps2-6', between: ['HS-PS1-3', 'HS-PS2-6'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Forces between particles in designed materials',
    why: 'Both PEs focus on attractive and repulsive forces between particles: one infers them from bulk properties, the other explains how designers exploit them.',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.A and PS2.B.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.2.' } ] },

  { id: 'ps1-3__ps3-2', between: ['HS-PS1-3', 'HS-PS3-2'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Phase changes as energy of position',
    why: 'Melting and boiling require energy to separate attracting particles, an increase in energy of relative position. Linking HS-PS1-3 with HS-PS3-2 explains why stronger attractions mean higher boiling points.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.2.' } ] },

  { id: 'ps1-4__ls1-7', between: ['HS-PS1-4', 'HS-LS1-7'], category: 'interdisciplinary', strength: 3, status: 'suggested',
    label: 'Respiration is a bond-energy story',
    why: 'HS-LS1-7 describes cellular respiration in nearly the same terms as HS-PS1-4: bonds of food and oxygen molecules break, new bonds form, and there is a net transfer of energy. Students may meet the idea in biology a year before chemistry asks them to model it. Coordinating the two departments could let students carry one model across both courses.',
    evidence: [ { kind: 'wording', note: 'HS-LS1-7’s official wording refers to bonds broken and formed resulting in a net transfer of energy.' } ] },

  { id: 'ps1-4__ls1-5', between: ['HS-PS1-4', 'HS-LS1-5'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'Storing energy in bonds',
    why: 'Photosynthesis is an energy-absorbing reaction system: light energy becomes energy stored in the bonds of sugar molecules. Using the HS-PS1-4 model to explain HS-LS1-5 reinforces both.',
    evidence: [ { kind: 'reasoning', note: 'Both are modeled with CCC Energy and Matter.' } ] },

  { id: 'ps1-4__ps1-8', between: ['HS-PS1-4', 'HS-PS1-8'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Chemical versus nuclear energy',
    why: 'Comparing energy released in chemical reactions (changes in bonds) with nuclear processes (changes in the nucleus) highlights the enormous difference in energy scale.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.5.' } ] },

  { id: 'ps1-4__ess3-2', between: ['HS-PS1-4', 'HS-ESS3-2'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Fuels and their costs',
    why: 'Combustion of fuels releases energy because of bond energy changes. The revised HS-ESS3-2 asks students to weigh costs, risks, and benefits of energy resource solutions, including conserving resources.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.5 (HS-ESS3-2 develops across courses).' } ] },

  { id: 'ps1-5__ps1-6', between: ['HS-PS1-5', 'HS-PS1-6'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Rates, then equilibrium',
    why: 'Equilibrium is a balance of forward and reverse rates. Understanding how temperature and concentration affect rate (HS-PS1-5) is the basis for explaining how changing conditions shifts equilibrium (HS-PS1-6).',
    evidence: [ { kind: 'shared-dci', note: 'Both list PS1.B Chemical Reactions.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.4.' } ] },

  { id: 'ps1-6__ets1-2', between: ['HS-PS1-6', 'HS-ETS1-2'], category: 'engineering', strength: 2, status: 'documented',
    label: 'Optimizing a chemical process',
    why: 'Industrial chemistry, such as ammonia production for fertilizer, is a complex problem broken into smaller ones: yield, rate, energy cost, and safety. HS-PS1-6 is one of those subproblems.',
    evidence: [ { kind: 'shared-dci', note: 'HS-PS1-6 lists ETS1.C (secondary); HS-ETS1-2 lists ETS1.C.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.4.' } ] },

  { id: 'ps1-7__ess2-6', between: ['HS-PS1-7', 'HS-ESS2-6'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Accounting for carbon',
    why: 'A quantitative carbon-cycle model (HS-ESS2-6) depends on conservation of atoms. Every carbon atom released by combustion goes somewhere. The mole-based reasoning in HS-PS1-7 underlies estimates of CO₂ produced by burning fuels.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.4 (HS-ESS2-6 develops across courses).' } ] },

  { id: 'ps1-7__ls1-6', between: ['HS-PS1-7', 'HS-LS1-6'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'Atoms rearranged inside organisms',
    why: 'HS-LS1-6 asks how carbon, hydrogen, and oxygen from sugars combine with other elements to form amino acids and other large molecules. That is conservation of atoms applied to living systems.',
    evidence: [ { kind: 'reasoning', note: 'Both rest on atoms being conserved and rearranged (CCC Energy and Matter).' } ] },

  { id: 'ps3-4__ess2-4', between: ['HS-PS3-4', 'HS-ESS2-4'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Thermal energy transfer in the climate system',
    why: 'Thermal energy transfer between ocean, atmosphere, and land, which tends toward uniform distribution, drives much of climate. HS-PS3-4 investigations give students direct evidence for processes HS-ESS2-4 models at planetary scale.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit C.1.' } ] },

  { id: 'ps3-4__ess2-3', between: ['HS-PS3-4', 'HS-ESS2-3'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'Convection in Earth’s mantle',
    why: 'Thermal energy flows from Earth’s hot interior toward the surface, driving mantle convection. HS-ESS2-3 asks students to model the cycling of matter by thermal convection.',
    evidence: [ { kind: 'reasoning', note: 'Thermal energy transfer (PS3.B) drives convection (ESS2.A).' } ] },

  { id: 'ps3-4__ls1-3', between: ['HS-PS3-4', 'HS-LS1-3'], category: 'interdisciplinary', strength: 1, status: 'suggested',
    label: 'Body temperature regulation',
    why: 'Organisms constantly exchange thermal energy with their surroundings; feedback mechanisms that maintain body temperature are a homeostasis example (HS-LS1-3) built on the physics of thermal energy transfer.',
    evidence: [ { kind: 'reasoning', note: 'Thermal energy transfer is the physical context of thermoregulation.' } ] },

  /* ------------------------------ Biology ------------------------------ */
  { id: 'ls1-1__ls3-1', between: ['HS-LS1-1', 'HS-LS3-1'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'DNA codes for proteins and for traits',
    why: 'HS-LS1-1 explains how DNA determines protein structure and function; HS-LS3-1 asks questions about how DNA and chromosomes code for traits passed to offspring. They are two views of the same molecular basis of life.',
    evidence: [ { kind: 'shared-dci', note: 'HS-LS3-1 lists LS1.A Structure and Function (secondary); HS-LS1-1 lists LS1.A.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.3.' } ] },

  { id: 'ls1-1__ls1-2', between: ['HS-LS1-1', 'HS-LS1-2'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'From specialized cells to systems',
    why: 'HS-LS1-1 ends with “systems of specialized cells”; HS-LS1-2 models the hierarchical organization of those systems in multicellular organisms.',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS1.A Structure and Function.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.3.' } ] },

  { id: 'ls1-1__ls1-4', between: ['HS-LS1-1', 'HS-LS1-4'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'How cells become specialized',
    why: 'Cells in an organism share the same DNA but become different through differentiation. HS-LS1-4 explains how mitosis and differentiation produce the specialized cells HS-LS1-1 refers to.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.3.' } ] },

  { id: 'ls1-1__ps2-6', between: ['HS-LS1-1', 'HS-PS2-6'], category: 'crosscutting', strength: 2, status: 'suggested',
    label: 'Structure determines function at the molecular scale',
    why: 'Both PEs rely on the crosscutting concept Structure and Function at the molecular level. A protein’s shape determines what it does (HS-LS1-1), and a pharmaceutical is designed with a shape that fits a specific receptor, an example in the HS-PS2-6 clarification.',
    evidence: [ { kind: 'reasoning', note: 'Both list CCC Structure and Function.' } ] },

  { id: 'ls1-5__ls1-7', between: ['HS-LS1-5', 'HS-LS1-7'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Photosynthesis and respiration',
    why: 'Photosynthesis stores energy in sugar bonds; respiration releases it. Modeling both with the same matter-and-energy framework shows they are complementary processes.',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS1.C Organization for Matter and Energy Flow in Organisms.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.2.' } ] },

  { id: 'ls1-5__ls2-5', between: ['HS-LS1-5', 'HS-LS2-5'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'From the leaf to the global carbon cycle',
    why: 'HS-LS2-5 scales photosynthesis and respiration up to the cycling of carbon among biosphere, atmosphere, hydrosphere, and geosphere.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.2.' } ] },

  { id: 'ls1-5__ess2-7', between: ['HS-LS1-5', 'HS-ESS2-7'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Photosynthesis changed the planet',
    why: 'The oxygen in Earth’s atmosphere is largely the product of photosynthesis over billions of years. HS-ESS2-7 asks students to argue that Earth’s systems and life have coevolved, and photosynthesis changing the atmosphere is a central example.',
    evidence: [ { kind: 'clarification', note: 'The HS-ESS2-7 clarification gives photosynthetic life altering the atmosphere as an example.' } ] },

  { id: 'ls1-7__ls2-3', between: ['HS-LS1-7', 'HS-LS2-3'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Respiration with and without oxygen',
    why: 'HS-LS2-3 extends respiration to aerobic and anaerobic conditions in ecosystems, such as waterlogged soils and sediments.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.2.' } ] },

  { id: 'ls1-7__ls2-4', between: ['HS-LS1-7', 'HS-LS2-4'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Where the energy goes in a food web',
    why: 'Most energy consumed at each trophic level is transferred to the environment through cellular respiration rather than stored in new biomass. That is why energy pyramids narrow.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.2.' } ] },

  { id: 'ls2-1__ls2-2', between: ['HS-LS2-1', 'HS-LS2-2'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Carrying capacity and biodiversity',
    why: 'Both use mathematical representations of ecosystems: HS-LS2-1 focuses on limits to population size, HS-LS2-2 on factors affecting biodiversity and populations.',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS2.A Interdependent Relationships in Ecosystems.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.1.' } ] },

  { id: 'ls2-1__ess3-3', between: ['HS-LS2-1', 'HS-ESS3-3'], category: 'interdisciplinary', strength: 3, status: 'documented',
    label: 'Carrying capacity and human sustainability',
    why: 'HS-ESS3-3 asks students to simulate relationships among resource management, the sustainability of human populations, and biodiversity, which applies carrying-capacity reasoning to people.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.1.' } ] },

  { id: 'ls2-1__ls4-2', between: ['HS-LS2-1', 'HS-LS4-2'], category: 'disciplinary', strength: 2, status: 'suggested',
    label: 'Limited resources drive selection',
    why: 'Two of the four evolutionary factors in HS-LS4-2, the potential for a population to increase and competition for limited resources, are the same ideas behind carrying capacity.',
    evidence: [ { kind: 'wording', note: 'HS-LS4-2’s official wording names competition for limited resources.' } ] },

  { id: 'ls2-4__ls2-5', between: ['HS-LS2-4', 'HS-LS2-5'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Matter cycling at two scales',
    why: 'Trophic-level matter and energy transfer (HS-LS2-4) is one piece of the larger carbon cycle (HS-LS2-5).',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS2.B Cycles of Matter and Energy Transfer in Ecosystems.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.2.' } ] },

  { id: 'ls2-4__ess2-6', between: ['HS-LS2-4', 'HS-ESS2-6'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Biosphere in the carbon cycle',
    why: 'Carbon stored in biomass is one reservoir in the quantitative carbon-cycle model of HS-ESS2-6.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.2 (HS-ESS2-6 develops across courses).' } ] },

  { id: 'ls3-1__ls3-2', between: ['HS-LS3-1', 'HS-LS3-2'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Inheritance and variation',
    why: 'Questions about how DNA codes for traits (HS-LS3-1) lead naturally to how inheritable variation arises (HS-LS3-2).',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.3.' } ] },

  { id: 'ls3-1__ls1-4', between: ['HS-LS3-1', 'HS-LS1-4'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Copying the instructions',
    why: 'Mitosis passes the full set of DNA instructions to new cells; meiosis (named in HS-LS3-2) passes half to offspring. Understanding both clarifies what is inherited.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.3.' } ] },

  { id: 'ls3-2__ls4-2', between: ['HS-LS3-2', 'HS-LS4-2'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Variation is the raw material of evolution',
    why: 'HS-LS4-2 lists “heritable genetic variation of individuals in a species due to mutation and sexual reproduction” as one of four factors. HS-LS3-2 is where students argue how that variation arises.',
    evidence: [ { kind: 'wording', note: 'HS-LS4-2’s official wording names heritable genetic variation due to mutation and sexual reproduction.' } ] },

  { id: 'ls3-2__ls3-3', between: ['HS-LS3-2', 'HS-LS3-3'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'From sources of variation to its distribution',
    why: 'Once students argue how variation arises, HS-LS3-3 asks them to use statistics and probability to explain how expressed traits vary and are distributed in a population.',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS3.B Variation of Traits.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.3.' } ] },

  { id: 'ls3-2__ps4-4', between: ['HS-LS3-2', 'HS-PS4-4'], category: 'interdisciplinary', strength: 2, status: 'suggested',
    label: 'Radiation as an environmental mutagen',
    why: 'Ultraviolet radiation and other high-frequency electromagnetic radiation can damage DNA. HS-PS4-4 asks students to evaluate published claims about the effects of absorbed radiation; HS-LS3-2 names mutations caused by environmental factors. Sunscreen and tanning claims are a natural bridge.',
    evidence: [ { kind: 'reasoning', note: 'The HS-PS4-4 clarification emphasizes tissue damage depending on photon energy.' } ] },

  { id: 'ls4-2__ls4-4', between: ['HS-LS4-2', 'HS-LS4-4'], category: 'disciplinary', strength: 3, status: 'documented',
    label: 'Selection leads to adaptation',
    why: 'HS-LS4-2 explains the process; HS-LS4-4 focuses on its outcome: adaptation of populations.',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS4.C Adaptation.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model units B.4 and B.5.' } ] },

  { id: 'ls4-2__ls4-3', between: ['HS-LS4-2', 'HS-LS4-3'], category: 'disciplinary', strength: 2, status: 'documented',
    label: 'Explaining selection with statistics',
    why: 'HS-LS4-3 asks students to use statistics and probability to show advantageous traits increase in proportion, which is quantitative evidence for one of HS-LS4-2’s factors.',
    evidence: [ { kind: 'shared-dci', note: 'Both list LS4.B and LS4.C.' }, { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.4.' } ] },

  { id: 'ls4-2__ess2-7', between: ['HS-LS4-2', 'HS-ESS2-7'], category: 'interdisciplinary', strength: 2, status: 'documented',
    label: 'Life and Earth evolve together',
    why: 'Changing Earth conditions alter which traits are advantageous, and life in turn changes Earth’s systems. HS-ESS2-7 frames evolution within that coevolution.',
    evidence: [ { kind: 'model-unit', note: 'Both appear in NJDOE model unit B.5 (HS-ESS2-7 develops across courses).' } ] }
];
