"use client";

import { useInterviewStore } from "@/store/interviewStore";
import { Card, CardContent } from "@/components/ui/card";
import ScoreRadar from "@/components/RadarChart";
import Navbar from "@/components/Navbar";

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
    <div>
      <div>
        <Navbar />
      </div>

      <div className="min-h-screen p-10 space-y-8">
        <h1 className="text-3xl font-bold text-center">Interview Report</h1>

        {/* Responsive Grid: 1 column on mobile, 2 columns on medium screens (laptops) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
          {/* OVERALL SCORE - Takes up left half on laptop */}
          <Card className="flex flex-col justify-center items-center shadow-lg border-2">
            <CardContent className="p-10 text-center space-y-4">
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Overall Score
              </h2>
              <div className="relative flex items-center justify-center">
                {/* Added a subtle circle background for flair */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                <p className="text-7xl font-black text-primary relative">
                  {overallScore}/10
                </p>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Great job! Here is your performance breakdown.
              </p>
            </CardContent>
          </Card>

          {/* RADAR CHART - Takes up right half on laptop */}
          <Card className="shadow-lg border-2">
            <CardContent className="p-6 flex items-center justify-center">
              <div className="w-full h-[300px]">
                {" "}
                {/* Set a height for the chart container */}
                <ScoreRadar
                  clarity={avgClarity}
                  star={avgStar}
                  fillers={avgFillers}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QUESTION RESULTS */}
        <div className="grid gap-6 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mt-8 mb-2 text-center">
            Question Breakdown
          </h3>

          {results.map((r, i) => (
            <Card
              key={i}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                {" "}
                {/* P-0 to let the header touch the edges */}
                {/* TOP CENTERED HEADER */}
                <div className="pb-5 border-b text-center">
                  <p className="font-bold text-lg text-primary">
                    Question {i + 1}
                  </p>
                  {/* Optional: if you have the question text, place it here: */}
                  {/* <p className="text-sm text-muted-foreground px-4 italic">{questions[i]}</p> */}
                </div>
                {/* METRICS GRID BELOW */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
                      Clarity
                    </span>
                    <span className="text-xl font-semibold">{r.clarity}</span>
                  </div>

                  <div className="flex flex-col border-y sm:border-y-0 sm:border-x border-border py-4 sm:py-0">
                    <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
                      STAR Score
                    </span>
                    <span className="text-xl font-semibold">
                      {r.star_score}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
                      Filler Words
                    </span>
                    <span className="text-xl font-semibold text-red-500">
                      {r.filler_count}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
