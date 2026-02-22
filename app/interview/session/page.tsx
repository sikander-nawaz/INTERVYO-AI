"use client";

import RecordingIndicator from "@/components/RecordingIndicator";
import { Button } from "@/components/ui/button";
import { useInterviewStore } from "@/store/interviewStore";
import { useRecorder } from "@/hooks/useRecorder";
import { analyzeAnswer } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SessionPage() {
  const router = useRouter();

  const { questions, currentIndex, nextQuestion, addResult } =
    useInterviewStore();

  // const { recording, startRecording, stopRecording } = useRecorder();

  const { recording, startRecording, stopRecording, fillerCount } =
    useRecorder();

  const [loading, setLoading] = useState(false);

  const question = questions[currentIndex];

  const handleRecord = async () => {
    if (!recording) {
      await startRecording();
      return;
    }

    setLoading(true);

    try {
      const audioBlob = await stopRecording();

      const result = await analyzeAnswer(audioBlob);

      addResult(result);

      // Move to next question or report
      if (currentIndex + 1 >= questions.length) {
        router.push("/interview/report");
      } else {
        nextQuestion();
      }
    } catch (err) {
      console.error(err);
      alert("Analysis failed (backend not running)");
    } finally {
      setLoading(false);
    }
  };

  if (!question) {
    return (
      <div className="flex h-screen items-center justify-center">
        No questions loaded.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <p className="text-sm text-muted-foreground">
        Question {currentIndex + 1} / {questions.length}
      </p>
      <h2 className="text-xl font-semibold text-center max-w-xl">{question}</h2>

      {/* live filler words counter */}
      <p className="text-sm text-red-500">Filler Words Used: {fillerCount}</p>
      <RecordingIndicator recording={recording} />

      {/* live animation which detects the clerity, STAR and confidence */}
      <div className="space-y-2">
        <div>
          <p className="text-sm">Clarity</p>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded animate-pulse"
              style={{
                width: recording ? `${Math.random() * 80 + 10}%` : "0%",
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm">STAR Score</p>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-500 rounded animate-pulse"
              style={{
                width: recording ? `${Math.random() * 80 + 10}%` : "0%",
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm">Confidence</p>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-purple-500 rounded animate-pulse"
              style={{
                width: recording ? `${Math.random() * 80 + 10}%` : "0%",
              }}
            />
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="animate-pulse text-center">
            <p className="text-lg font-medium">
              AI is analyzing your answer...
            </p>
            <p className="text-sm text-muted-foreground">
              Evaluating clarity, structure & confidence
            </p>
          </div>
        ) : (
          <Button onClick={handleRecord}>
            {recording ? "Stop Answer" : "Start Answer"}
          </Button>
        )}
      </div>
    </div>
  );
}
