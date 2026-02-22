"use client";

import { useInterviewStore } from "@/store/interviewStore";
import { Card, CardContent } from "@/components/ui/card";
import ScoreRadar from "@/components/RadarChart";

export default function ReportPage() {
  const results = useInterviewStore((s) => s.results);

  if (!results.length) {
    return (
      <div className="flex h-screen items-center justify-center">
        No results available.
      </div>
    );
  }

  // averages
  const avgClarity =
    results.reduce((a, b) => a + b.clarity, 0) / results.length;

  const avgStar =
    results.reduce((a, b) => a + b.star_score, 0) / results.length;

  const avgFillers =
    results.reduce((a, b) => a + b.filler_count, 0) / results.length;

  const overallScore = Math.round(
    (avgClarity + avgStar + (10 - avgFillers)) / 3,
  );

  return (
    <div className="min-h-screen p-10 space-y-8">
      <h1 className="text-3xl font-bold text-center">Interview Report</h1>

      {/* OVERALL SCORE */}
      <Card>
        <CardContent className="p-6 text-center space-y-2">
          <h2 className="text-xl font-semibold">Overall Score</h2>
          <p className="text-4xl font-bold">{overallScore}/10</p>
        </CardContent>
      </Card>

      {/* RADAR CHART */}
      <Card>
        <CardContent className="p-6">
          <ScoreRadar
            clarity={avgClarity}
            star={avgStar}
            fillers={avgFillers}
          />
        </CardContent>
      </Card>

      {/* QUESTION RESULTS */}
      <div className="grid gap-4">
        {results.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p>Question {i + 1}</p>
              <p>Clarity: {r.clarity}</p>
              <p>STAR Score: {r.star_score}</p>
              <p>Filler Words: {r.filler_count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
