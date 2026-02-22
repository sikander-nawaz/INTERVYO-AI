"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  clarity: number;
  star: number;
  fillers: number;
};

export default function ScoreRadar({ clarity, star, fillers }: Props) {
  const data = [
    { subject: "Clarity", value: clarity },
    { subject: "STAR", value: star },
    { subject: "Fluency", value: 10 - fillers },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar dataKey="value" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
