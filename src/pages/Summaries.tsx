import { useState, useEffect } from "react";
import SummariesGraph from "../components/SummariesGraph"; // Import the Summaries component
import { getSummaries } from "../services/JournalService";
import WordCloudComponent from "../components/WordCloud";
import Navbar from "../components/NavBar";

const SummariesPage = () => {
  const [summaries, setSummaries] = useState({
    category_distribution: {},
    monthly_counts: [],
    daily_trend: [],
    word_count_trend: [],
    entry_length_averages: {},
  });

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await getSummaries();
        console.log("Response", response);
        setSummaries(response);
      } catch (err) {
        console.error("Error fetching summaries:", err);
      }
    };
    fetchSummaries();
  }, []);

  return (
    <>

    <Navbar/>
      <div className="flex flex-col h-screen bg-gray-300 text-white">
        {/* Other components... */}

        {/* Summaries Section */}
        <div className="w-full p-5 overflow-y-auto flex flex-col flex-grow">
          <SummariesGraph
            entryLengthAverages={summaries.entry_length_averages}
            wordCountTrend={summaries.word_count_trend}
            categoryDistribution={summaries.category_distribution}
            monthlyCounts={summaries.monthly_counts}
            dailyTrend={summaries.daily_trend}
          />

          <div className="mt-auto self-center">
            <h3 className="text-lg font-semibold mt-4 mb-2 text-center text-gray-600">
              Word Frequency Cloud
            </h3>
            <WordCloudComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default SummariesPage;
