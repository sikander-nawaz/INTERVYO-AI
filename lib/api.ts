const BASE_URL = "http://localhost:8000"; // change later when deployed

// START INTERVIEW
export const startInterview = async (role: string, level: string) => {
  const res = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, level }),
  });

  if (!res.ok) {
    throw new Error("Failed to start interview");
  }

  return res.json();
};

// ANALYZE ANSWER (AUDIO UPLOAD)
export const analyzeAnswer = async (audio: Blob) => {
  const formData = new FormData();
  formData.append("audio", audio);

  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Analysis failed");
  }

  return res.json();
};
