export interface RiskmatrixWidgetsResponse {
  id: string;
  score_0_10: number;
  score_10_20: number;
  score_20_30: number;
  score_30_40: number;
  score_40_50: number;
  score_50_60: number;
  score_60_70: number;
  score_70_80: number;
  score_80_90: number;
  score_90_100: number;
  risks: number;
  total_persons: number;
  analyzed: number;
  red_flags: number;
}
