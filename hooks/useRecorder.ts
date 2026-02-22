import { useRef, useState, useEffect } from "react";

export const useRecorder = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [fillerCount, setFillerCount] = useState(0);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);
    mediaRecorder.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    // Simulate live filler detection (demo mode)
    const fillerInterval = setInterval(() => {
      if (recording) {
        setFillerCount((prev) => prev + Math.floor(Math.random() * 2));
      } else {
        clearInterval(fillerInterval);
      }
    }, 1000);

    recorder.start();
    setRecording(true);
  };

  const stopRecording = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorder.current;
      if (!recorder) return;

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, {
          type: "audio/webm",
        });
        chunks.current = [];
        setRecording(false);
        setFillerCount(0); // reset for next question
        resolve(blob);
      };

      recorder.stop();
    });
  };

  return {
    recording,
    startRecording,
    stopRecording,
    fillerCount,
  };
};
