"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { startInterview } from "@/lib/api";
import { useInterviewStore } from "@/store/interviewStore";

export default function SetupPage() {
  const router = useRouter();
  const setQuestions = useInterviewStore((s) => s.setQuestions);

  const [role, setRole] = useState("SDE");
  const [level, setLevel] = useState("Intern");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);

      const data = await startInterview(role, level);
      // const data = {
      //   questions: [
      //     "Tell me about yourself",
      //     "Explain React hooks",
      //     "Describe a challenge you solved",
      //   ],
      // };    testing phase of check recording is working properly or not.

      setQuestions(data.questions);

      router.push("/interview/session");
    } catch (error) {
      alert("Backend not connected yet.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-bold text-center">Setup Interview</h2>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>SDE</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>DevOps</option>
            </select>
          </div>

          {/* LEVEL */}
          <div>
            <label className="text-sm font-medium">Experience Level</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Intern</option>
              <option>Junior</option>
              <option>Mid</option>
            </select>
          </div>

          <Button className="w-full" onClick={handleStart} disabled={loading}>
            {loading ? "Starting..." : "Start Interview"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
