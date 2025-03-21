import React, { useState, useEffect } from "react";
import Addd from  './Addd'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MenuItem, FormControl, InputLabel, Select, Card, CardContent } from "@mui/material";
import Add from "./Addd";

// Custom website colors (Adjust to match your site)
const themeColors = {
  primary: "#4CAF50", // Main Green (e.g., line chart color)
  secondary: "#FF9800", // Orange (e.g., bar chart color)
  background: "#1E1E2F", // Dark background
  text: "#FFFFFF", // White text
};

const grains = ["wheat", "rice", "corn", "barley", "soybean"];

const generateInitialData = () => {
  return Array.from({ length: 20 }, (_, index) => ({
    date: `Day ${index + 1}`,
    price: Math.floor(100 + Math.random() * 50),
    volume: Math.floor(500 + Math.random() * 300),
  }));
};

const MarketTrendAnalyzer = () => {
  const [selectedGrain, setSelectedGrain] = useState("wheat");
  const [marketData, setMarketData] = useState(generateInitialData());

  // Simulate Real-Time Data Updates (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) => {
        const newPrice = prevData[prevData.length - 1].price + (Math.random() * 10 - 5);
        const newVolume = prevData[prevData.length - 1].volume + (Math.random() * 20 - 10);
        return [
          ...prevData.slice(1), // Keep the latest 20 entries
          {
            date: `Day ${prevData.length + 1}`,
            price: Math.max(50, Math.floor(newPrice)), // Ensure positive prices
            volume: Math.max(100, Math.floor(newVolume)),
          },
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.background, color: themeColors.text, minHeight: "100vh", padding: "20px" }}>
      {/* Grain Selector */}
      <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
        <InputLabel style={{ color: themeColors.text }}>Select Grain</InputLabel>
        <Select
          value={selectedGrain}
          onChange={(e) => setSelectedGrain(e.target.value)}
          style={{ color: themeColors.text, borderColor: themeColors.primary }}
        >
          {grains.map((grain) => (
            <MenuItem key={grain} value={grain}>
              {grain.charAt(0).toUpperCase() + grain.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Line Chart (Price Trend) */}
      <Card style={{ backgroundColor: themeColors.background, marginBottom: "20px", borderRadius: "15px", boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }}>
        <CardContent>
          <h2 style={{ color: themeColors.primary }}>Market Trend for {selectedGrain}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={marketData}>
              <CartesianGrid stroke="#555" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke={themeColors.text} />
              <YAxis stroke={themeColors.text} />
              <Tooltip contentStyle={{ backgroundColor: themeColors.background, color: themeColors.text }} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke={themeColors.primary} strokeWidth={3} dot={{ r: 4 }} isAnimationActive />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart (Volume Distribution) */}
      <Card style={{ backgroundColor: themeColors.background, borderRadius: "15px", boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }}>
        <CardContent>
          <h2 style={{ color: themeColors.secondary }}>Market Volume for {selectedGrain}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={marketData}>
              <CartesianGrid stroke="#555" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke={themeColors.text} />
              <YAxis stroke={themeColors.text} />
              <Tooltip contentStyle={{ backgroundColor: themeColors.background, color: themeColors.text }} />
              <Legend />
              <Bar dataKey="volume" fill={themeColors.secondary} isAnimationActive animationDuration={2000} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/*  */}

<Addd/>
    </div>
  );
};

export default MarketTrendAnalyzer;
