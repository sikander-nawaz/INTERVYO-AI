"use client";

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

  const { recording, startRecording, stopRecording } = useRecorder();

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
      <h2 className="text-xl font-semibold text-center max-w-xl">{question}</h2>

      <Button onClick={handleRecord} disabled={loading}>
        {loading ? "Analyzing..." : recording ? "Stop Answer" : "Start Answer"}
      </Button>
    </div>
  );
}
