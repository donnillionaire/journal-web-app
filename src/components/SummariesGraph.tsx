import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SummariesProps {
  categoryDistribution: { [key: string]: number };
  monthlyCounts: { month: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
  wordCountTrend: { date: string; word_count: number }[];
  entryLengthAverages: { [key: string]: number }; // Add entry length averages
}

const SummariesGraph: React.FC<SummariesProps> = ({
  categoryDistribution,
  monthlyCounts,
  dailyTrend,
  wordCountTrend,
  entryLengthAverages,
}) => {
  // Define a color palette for the categories
  const categoryColors: { [key: string]: string } = {
    Personal: "#FF6384", // Red
    Work: "#36A2EB",     // Blue
    Travel: "#FFCE56",   // Yellow
    Health: "#4BC0C0",   // Teal
    Social: "#9966FF",   // Purple
  };

  console.log("entry lengt", entryLengthAverages)

  // Convert category distribution to array format for PieChart
  const categoryData = Object.entries(categoryDistribution).map(
    ([name, value]) => ({
      name,
      value,
      fill: categoryColors[name] || "#8884d8", // Default color if category not found
    })
  );

  // Convert entry length averages to array format for BarChart
  const entryLengthData = Object.entries(entryLengthAverages).map(
    ([name, avgLength]) => ({
      name,
      avgLength,
      fill: categoryColors[name] || "#8884d8", // Use the same color palette
    })
  );

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">Summaries</h2>

      {/* Pie Chart: Category Distribution */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Category Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Entry Length Averages by Category */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Entry Length Averages by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={entryLengthData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgLength" fill="#36A2EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Monthly Entry Count */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Monthly Entry Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyCounts}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Daily Entry Trend */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Daily Entry Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyTrend}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Word Count Trends Over Time */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Word Count Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={wordCountTrend}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="word_count" stroke="#FF6384" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SummariesGraph;