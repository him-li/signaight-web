export type EvaluationFactor = {
  title: string;
  score: number;
};

export type EvaluationCategory = {
  factors?: EvaluationFactor[];
  score: number;
};

export type Evaluation = {
  resilience?: EvaluationCategory;
  flexibility?: EvaluationCategory;
  work_under_pressure?: EvaluationCategory;
  curiosity?: EvaluationCategory;
  decision_making?: EvaluationCategory;
  courage?: EvaluationCategory;
  teamwork?: EvaluationCategory;
  moral_values?: EvaluationCategory;
  language_skills?: EvaluationCategory;
  interpersonal_skills?: EvaluationCategory;
};
