"use client";

import { useMemo, useState } from 'react';

type StageOneAnswers = {
  idea: string;
  q11: string; // inspiration
  q12: string; // beneficiary
  q13: string; // main problem
  q14: string; // technology
  q15: string; // expected impact
  q16: string; // concerns
  q17: string; // background
  q18: string; // feedback type
};

const stageOneQuestions: { key: keyof StageOneAnswers; label: string; placeholder?: string }[] = [
  { key: 'idea', label: 'Idea — Briefly describe your health automation concept', placeholder: 'e.g., An AI app that reminds elderly patients to take their medicine.' },
  { key: 'q11', label: '1.1 What inspired you to think about this idea?' },
  { key: 'q12', label: '1.2 Who will benefit most (patients, doctors, families, hospitals, general public)?' },
  { key: 'q13', label: '1.3 What main problem are you trying to solve?' },
  { key: 'q14', label: '1.4 What technology or method do you imagine (AI, sensors, data tracking, mobile app, etc.)?' },
  { key: 'q15', label: '1.5 What kind of results or impact do you expect?' },
  { key: 'q16', label: '1.6 What are your main concerns or risks?' },
  { key: 'q17', label: '1.7 What level of medical or technical background do you have?' },
  { key: 'q18', label: '1.8 What type of feedback do you want (conceptual improvement, ethical evaluation, market feasibility, user experience)?' },
];

function generateReport(a: StageOneAnswers): string {
  const date = new Date().toISOString().split('T')[0];
  const beneficiaries = a.q12 || 'Not specified';
  const tech = a.q14 || 'Not specified';
  const problem = a.q13 || 'Not specified';
  const impact = a.q15 || 'Not specified';
  const concerns = a.q16 || 'Not specified';
  const background = a.q17 || 'Not specified';
  const feedback = a.q18 || 'Not specified';

  // STAGE TWO — DECONSTRUCT
  const deconstruct = `2.1 Restatement: ${a.idea}\n\n2.2 Objectives, stakeholders, technology:\n- Objectives: ${problem}\n- Stakeholders: ${beneficiaries}\n- Technology base: ${tech}\n\n2.3 Information gaps / assumptions:\n- Assumptions may be required for unclear details about workflow, data sources, and validation metrics.`;

  // STAGE THREE — DIAGNOSE
  const diagnose = `3.1 Medical importance: The problem addresses a clinically relevant area with potential impact on outcomes and safety.\n3.2 Existing solutions: Similar tools exist in digital health; differentiation should be based on usability, evidence, integration, and equity.\n3.3 Scientific validity, ethics, feasibility: Requires risk assessment, data governance, bias testing, accessibility, and clinical oversight.\n3.4 Expectation alignment: Aligns with current capabilities if scope is focused; overpromising diagnostic accuracy without trials would be misaligned.`;

  // STAGE FOUR — DEVELOP
  const develop = `4.1 Advantages:\n- Can improve consistency, access, and timeliness\n- May reduce errors and burden on staff\n- Enables data-driven quality improvement\n\n4.2 Disadvantages and possible harms:\n- False reassurance or missed escalation if automation fails\n- Privacy and security risks with health data\n- Algorithmic bias and inequity if datasets are unrepresentative\n- Alert fatigue or poor usability leading to non-adherence\n\n4.3 Implementation and user complexities:\n- Integration with clinical workflows and EHRs\n- Regulatory classification and compliance (e.g., medical device rules)\n- Ongoing monitoring, updates, and support\n- Accessibility, language, and cultural adaptation\n\n4.4 Reflective questions:\n- Why is automation preferable here?\n- What human value might be lost if fully automated?\n- How will success be measured and independently verified?`;

  // STAGE FIVE — DELIVER
  const deliver = `5.1 Evidence-based insights (examples):\n- WHO guidance on digital health interventions emphasizes evidence, equity, and data protection (see references).\n- NIH and PubMed literature highlight usability, human factors, and rigorous evaluation for mHealth.\n\n5.2 Recommendations and safeguards:\n- Define a narrow, high-value use case and success metrics (clinical, safety, experience).\n- Build privacy by design, with encryption, access controls, and transparent data use.\n- Perform bias assessments; include diverse users in design and testing.\n- Add clear escalation pathways to humans; never block access to care.\n- Document model limits; avoid diagnostic claims without appropriate trials.\n\n5.3 Short, neutral expert summary:\nThe concept is potentially viable if scoped, privacy-preserving, and evaluated with user-centered design, robust measurement, and appropriate clinical oversight.`;

  // STAGE SIX — EXPLAIN LIKE A CHILD
  const eli5 = `We are making a smart helper for health. It can remind or guide people so they stay safe. Grown-ups will still check the helper’s work. We keep people’s secrets safe. If the helper is not sure, a person helps. We watch how it works to make it better.`;

  // STAGE SEVEN — LEARNING RESOURCES
  const resources = `- WHO (for kids/teens): Basic health and safety topics — https://www.who.int\n- KidsHealth by Nemours: Health information for kids and parents — https://kidshealth.org\n- BBC Bitesize: Easy learning pages about science and health — https://www.bbc.co.uk/bitesize\n- National Geographic Kids: Science and body facts — https://kids.nationalgeographic.com\n- Science News for Students: Clear science news for young readers — https://www.snexplores.org`;

  // OUTPUT FORMAT A–J
  return [
    `A. Summary of User’s Idea and Perspective\n- Idea: ${a.idea}\n- Inspiration: ${a.q11}\n- Beneficiaries: ${beneficiaries}\n- Main problem: ${problem}\n- Technology: ${tech}\n- Expected impact: ${impact}\n- Concerns: ${concerns}\n- Background: ${background}\n- Requested feedback: ${feedback}`,
    `B. Medical Context and Importance\nThis idea targets: ${problem}. It is medically relevant if it demonstrably improves outcomes, safety, equity, or efficiency.`,
    `C. Advantages\n- Streamlines processes and reduces delays\n- May improve adherence and monitoring\n- Scales support to more people\n- Creates measurable data for quality improvement`,
    `D. Disadvantages and Risks\n- Privacy/security vulnerabilities\n- Overreliance on automation; missed human judgment\n- Bias and unequal performance across groups\n- Usability challenges and alert fatigue`,
    `E. Complexities and Implementation Barriers\n- Workflow and EHR integration\n- Regulatory and legal compliance\n- Clinical governance and accountability\n- Ongoing monitoring and maintenance\n- Accessibility and inclusivity`,
    `F. Reflective Questions and Answers\n- Why automation here? ${a.q11 ? `Because: ${a.q11}` : 'Articulate specific pain points and value.'}\n- What human value might be lost? Preserve empathy, context, and shared decision-making.\n- How will success be measured? Define clinical, safety, and user metrics with baselines and targets.`,
    `G. Expert Recommendations\n${deliver}`,
    `H. Final Expert Verdict\nLikely viable with a narrowly defined scope, strong privacy and safety controls, and staged evaluation (prototype → pilot → trial).`,
    `I. Simplified Child Explanation\n${eli5}`,
    `J. Educational Resources\n${resources}`,
    `\n— Generated on ${date}`,
    `\nReferences:\n- WHO guideline: Recommendations on digital interventions for health system strengthening (2019).\n- WHO/ITU: Focus on AI for health (various briefs).\n- NIH: Human factors in healthcare technology adoption.\n- PubMed: Systematic reviews on mHealth effectiveness and safety.`,
    `\nNote: This tool is for education and planning. It is not medical advice.`
  ].join("\n\n");
}

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<StageOneAnswers>({
    idea: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: ''
  });
  const [done, setDone] = useState(false);

  const current = stageOneQuestions[step];
  const progress = `${step + 1} / ${stageOneQuestions.length}`;

  const report = useMemo(() => (done ? generateReport(answers) : ''), [done, answers]);

  function onChange(value: string) {
    setAnswers(prev => ({ ...prev, [current.key]: value }));
  }

  function next() {
    if (step < stageOneQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (done) { setDone(false); return; }
    if (step > 0) setStep(step - 1);
  }

  async function copy() {
    await navigator.clipboard.writeText(report);
    alert('Copied to clipboard');
  }

  function download() {
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'health-automation-evaluation.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card">
      {!done ? (
        <>
          <div className="controls" style={{ justifyContent: 'space-between' }}>
            <span className="progress">Stage One — User Inquiry</span>
            <span className="badge">{progress}</span>
          </div>
          <hr />
          <div>
            <label htmlFor="answer">{current.label}</label>
            <textarea
              id="answer"
              value={(answers[current.key] as string) ?? ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={current.placeholder}
            />
            <div className="controls" style={{ marginTop: 12 }}>
              <button className="btn secondary" onClick={back} disabled={step === 0}>Back</button>
              <button className="btn" onClick={next} disabled={!((answers[current.key] as string) || '').trim()}>Next</button>
            </div>
            <p className="helper small">Please answer one section at a time. Your responses shape the expert analysis.</p>
          </div>
        </>
      ) : (
        <>
          <div className="controls" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div className="section-title">Generated Expert Evaluation</div>
              <p className="helper">Stages Two–Eight produced from your Stage One answers.</p>
            </div>
            <div className="footer-actions">
              <button className="btn secondary" onClick={back}>Edit Answers</button>
              <button className="btn" onClick={copy}>Copy</button>
              <button className="btn" onClick={download}>Download .md</button>
            </div>
          </div>
          <hr />
          <textarea className="textarea-output" readOnly value={report} />
        </>
      )}
    </div>
  );
}
