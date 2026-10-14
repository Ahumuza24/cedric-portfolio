import { Check, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const FORM_FIELDS = [
  { label: "Subject", value: "Biology" },
  { label: "Class", value: "Senior 4" },
  { label: "Questions", value: "20" },
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const SELECTED_DIFFICULTY = "Medium";

const QUESTION = {
  prompt: "Which organelle releases energy from glucose during respiration?",
  options: ["Ribosome", "Mitochondrion", "Nucleus", "Chloroplast"],
  answerIndex: 1,
};

const OPTION_LETTERS = ["A", "B", "C", "D"];

const SHORT_ANSWER_PROMPT = "Explain two ways the small intestine is adapted for absorption.";
const SHORT_ANSWER_MARKS = "4 marks";

function BrowserBar() {
  return (
    <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-3">
      <span className="size-2.5 rounded-full bg-pop-pink" />
      <span className="size-2.5 rounded-full bg-pop-yellow" />
      <span className="size-2.5 rounded-full bg-pop-green" />
      <span className="ml-4 h-2 w-1/3 rounded-full bg-ink/15" />
    </div>
  );
}

function ExamForm() {
  return (
    <div className="flex flex-col gap-2.5 border-r border-ink/10 bg-canvas p-4">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/60">New exam</p>
      {FORM_FIELDS.map((field) => (
        <div key={field.label} className="rounded-md border border-ink/15 bg-white px-2.5 py-1.5">
          <p className="text-[8px] text-ink/50">{field.label}</p>
          <p className="text-[11px] font-semibold text-ink">{field.value}</p>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-1">
        {DIFFICULTIES.map((difficulty) => (
          <span
            key={difficulty}
            className={cn(
              "rounded py-1 text-center text-[9px] font-medium",
              difficulty === SELECTED_DIFFICULTY ? "bg-ink text-white" : "bg-ink/10 text-ink/70",
            )}
          >
            {difficulty}
          </span>
        ))}
      </div>
      <span className="mt-1 flex items-center justify-center gap-1 rounded-md bg-pop-yellow py-2 text-[10px] font-semibold text-ink">
        <Sparkles className="size-3" /> Generate
      </span>
    </div>
  );
}

function QuestionOption({ text, index }: { text: string; index: number }) {
  const isAnswer = index === QUESTION.answerIndex;
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-md border px-2 py-1.5 text-[10px]",
        isAnswer ? "border-pop-green bg-pop-green/10 font-semibold" : "border-ink/10",
      )}
    >
      <span className="font-mono text-ink/50">{OPTION_LETTERS[index]}</span>
      {text}
      {isAnswer && <Check className="ml-auto size-3 text-pop-green" />}
    </li>
  );
}

function GeneratedQuestions() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-ink">Biology · Paper 1</p>
        <span className="rounded-full bg-pop-green/15 px-2 py-0.5 text-[8px] font-semibold text-pop-green">
          20 questions ready
        </span>
      </div>
      <div className="rounded-lg border border-ink/10 p-3 shadow-md">
        <p className="text-[10px] font-semibold text-ink">
          <span className="font-mono text-ink/50">Q1.</span> {QUESTION.prompt}
        </p>
        <ul className="mt-2 flex flex-col gap-1">
          {QUESTION.options.map((option, index) => (
            <QuestionOption key={option} text={option} index={index} />
          ))}
        </ul>
      </div>
      <ShortAnswerQuestion />
    </div>
  );
}

function ShortAnswerQuestion() {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-ink/10 p-3">
      <p className="text-[10px] font-semibold text-ink">
        <span className="font-mono text-ink/50">Q2.</span> {SHORT_ANSWER_PROMPT}
      </p>
      <span className="h-2 w-full rounded-full bg-ink/10" />
      <span className="h-2 w-4/5 rounded-full bg-ink/10" />
      <span className="self-end font-mono text-[8px] text-ink/50">{SHORT_ANSWER_MARKS}</span>
    </div>
  );
}

/** Mockup of the exam generator: settings on the left, generated questions on the right. */
export function ExamVisual() {
  return (
    <div className="flex size-full flex-col bg-white text-ink">
      <BrowserBar />
      <div className="grid flex-1 grid-cols-[2fr_3fr] overflow-hidden">
        <ExamForm />
        <GeneratedQuestions />
      </div>
    </div>
  );
}
