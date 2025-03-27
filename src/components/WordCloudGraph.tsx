import React, { useEffect, useRef } from "react";
import TagCloud from "tagcloud";

interface WordCloudProps {
  wordFrequency: { text: string; value: number }[];
}

const WordCloudGraph: React.FC<WordCloudProps> = ({ wordFrequency }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || wordFrequency.length === 0) return;

    // Initialize the word cloud
    TagCloud(containerRef.current, wordFrequency, {
      radius: 300, // Radius of the word cloud
      maxSpeed: "normal", // Speed of animation
      initSpeed: "fast", // Initial speed
      direction: 135, // Direction of rotation
      keep: true, // Keep rotating
      color: true, // Use random colors
    });
  }, [wordFrequency]);

  return <div ref={containerRef} className="w-full h-[400px]"></div>;
};

export default WordCloudGraph;