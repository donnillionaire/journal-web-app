import { useState, useEffect } from "react";
import SummariesGraph from "../components/SummariesGraph"; // Import the Summaries component
import { getSummaries } from "../services/JournalService";

const SummariesPage = () => {
  const [summaries, setSummaries] = useState({
    category_distribution: {},
    monthly_counts: [],
    daily_trend: [],
    word_count_trend:[]
  });

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await getSummaries();
        setSummaries(response);
      } catch (err) {
        console.error("Error fetching summaries:", err);
      }
    };
    fetchSummaries();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Other components... */}
      
      {/* Summaries Section */}
      <div className="w-full p-5 overflow-y-auto">
        <SummariesGraph
        wordCountTrend={summaries.word_count_trend}
          categoryDistribution={summaries.category_distribution}
          monthlyCounts={summaries.monthly_counts}
          dailyTrend={summaries.daily_trend}
        />
      </div>
    </div>
  );
};

export default SummariesPage;