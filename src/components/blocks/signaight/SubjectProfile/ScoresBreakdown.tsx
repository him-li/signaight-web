import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { useAppSelector } from "@/store/store";
import { selectSubjectsState } from "@/store/subjectsSlice";

export default function ScoresBreakdown() {
  const scores = useAppSelector(selectSubjectsState).currentSubjectData?.scores;
  const data = [
    {
      Courage: scores?.courage || 0,
      Consistency: scores?.consistency || 0,
      Credibility: scores?.credibility || 0,
      Conscientiousness: scores?.conscientiousness || 0,
      Clandestineness: scores?.clandestineness || 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart
        data={data}
        layout={"vertical"}
        barCategoryGap={0}
        margin={{ top: 0, right: 0, left: 25, bottom: 0 }}
      >
        <Bar dataKey="Courage" fill="#1776BD" background />
        <Bar dataKey="Consistency" fill="#007B81" background />
        <Bar dataKey="Credibility" fill="#2F4858" background />
        <Bar dataKey="Conscientiousness" fill="#4DBEB0" background />
        <Bar dataKey="Clandestineness" fill="#2e8085" background />
        <Legend
          align="left"
          verticalAlign="middle"
          iconSize={0}
          layout={"vertical"}
        />
        <XAxis type="number" hide domain={[41, 56]} />
        <YAxis dataKey="name" type="category" hide />
      </BarChart>
    </ResponsiveContainer>
  );
}
