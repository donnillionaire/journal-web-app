import React, { useEffect, useRef, useState } from "react";
import WordCloud from "wordcloud";
import { getWordFrequency } from "../services/JournalService";

interface WordFrequency {
  text: string;
  value: number;
}

const WordCloudComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wordFrequency, setWordFrequency] = useState<WordFrequency[]>([]);

  useEffect(() => {
    const fetchWordFrequency = async () => {
      try {
        const response = await getWordFrequency();
        console.log("Response:", response.word_frequency);
        setWordFrequency(response.word_frequency);
      } catch (err) {
        console.error("Error fetching word frequency:", err);
      }
    };

    fetchWordFrequency();
  }, []);

  useEffect(() => {
    if (canvasRef.current && wordFrequency.length > 0) {
      WordCloud(canvasRef.current, {
        list: wordFrequency.map((item) => [item.text, item.value]),
        gridSize: 10,
        weightFactor: 14,
        fontFamily: "Arial",
        color: () => `hsl(${Math.random() * 360}, 100%, 50%)`,
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: "#ffffff",
      });
    }
  }, [wordFrequency]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width="800" height="500" />
    </div>
  );
};

export default WordCloudComponent;
