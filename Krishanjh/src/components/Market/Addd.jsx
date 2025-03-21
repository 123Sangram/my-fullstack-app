import React, { useState, useEffect } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";

// Custom website colors (Adjust to match your site)
const themeColors = {
  primary: "#4CAF50", // Main Green (e.g., line chart color)
  secondary: "#FF9800", // Orange (e.g., bar chart color)
  background: "#1E1E2F", // Dark background
  text: "#FFF", // White text
};

const grains = ["wheat", "rice", "corn", "barley", "soybean"];

const generateInitialData = () => {
  return Array.from({ length: 20 }, (_, index) => ({
    date: `Day ${index + 1}`,
    price: Math.floor(100 + Math.random() * 102350),
    volume: Math.floor(500 + Math.random() * 234300),
    state: ["Punjab", "Haryana", "UP", "MP", "Rajasthan"][
      Math.floor(Math.random() * 5)
    ],
    grain: grains[Math.floor(Math.random() * grains.length)],
  }));
};

const Addd= () => {
  const [selectedGrain, setSelectedGrain] = useState("wheat");
  const [marketData, setMarketData] = useState(generateInitialData());

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) => {
        const newPrice =
          prevData[prevData.length - 1].price + (Math.random() * 10 - 5);
        const newVolume =
          prevData[prevData.length - 1].volume + (Math.random() * 20 - 10);
        return [
          ...prevData.slice(1),
          {
            date: `Day ${prevData.length + 1}`,
            price: Math.max(50, Math.floor(newPrice)),
            volume: Math.max(100, Math.floor(newVolume)),
            state: ["Punjab", "Haryana", "UP", "MP", "Rajasthan"][
              Math.floor(Math.random() *10005)
            ],
            grain: grains[Math.floor(Math.random() * grains.length)],
          },
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const maxPrice = Math.max(...marketData.map((d) => d.price));
  const minPrice = Math.min(...marketData.map((d) => d.price));
  const priceChangeProbability = Math.random() > 0.5 ? "Increase" : "Decrease";

  const stateDistribution = grains.map((grain) => ({
    name: grain,
    value: marketData.filter((d) => d.grain === grain).length,
  }));

  const grainByState = marketData.reduce((acc, cur) => {
    acc[cur.state] = acc[cur.state] || {};
    acc[cur.state][cur.grain] = (acc[cur.state][cur.grain] || 0) + 1043;
    return acc;
  }, {});

  return (
    <div
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.text,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Stack spacing={3}>
        <Card
          style={{ backgroundColor: themeColors.background, padding: "10px" }}
        >
          <CardContent>
            <Typography variant="h5" style={{ color: themeColors.primary }}>
              Dashboard
            </Typography>
            <Typography className="text-white">
              Max Price: ₹{maxPrice}
            </Typography>
            <Typography className="text-white">
              Min Price: ₹{minPrice}
            </Typography>
            <Typography className="text-white">
              Price Trend: {priceChangeProbability}
            </Typography>
          </CardContent>
        </Card>

        <FormControl
          fullWidth
          variant="outlined"
          style={{ marginBottom: "20px" }}
        >
          <InputLabel style={{ color: themeColors.text }}>
            Select Grain
          </InputLabel>
          <Select
            value={selectedGrain}
            onChange={(e) => setSelectedGrain(e.target.value)}
            style={{
              color: themeColors.text,
              borderColor: themeColors.primary,
            }}
          >
            {grains.map((grain) => (
              <MenuItem key={grain} value={grain}>
                {grain.charAt(0).toUpperCase() + grain.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={marketData}>
            <CartesianGrid stroke="#555" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke={themeColors.text} />
            <YAxis stroke={themeColors.text} />
            <Tooltip
              contentStyle={{
                backgroundColor: themeColors.background,

                color: themeColors.text,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke={themeColors.primary}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {Object.entries(grainByState).map(([state, grains]) => (
          <Card
            key={state}
            style={{
              backgroundColor: themeColors.background,
              marginBottom: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6" style={{ color: themeColors.primary }}>
                {state}
              </Typography>
              {Object.entries(grains).map(([grain, count]) => (
                <Typography className="text-white" key={grain}>
                  {grain}: {count} <span className='text-blue-500'>kuntal</span>
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}

        <footer
          style={{
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#333",
            color: "#fff",
          }}
        >
          © 2025 Market Trend Analyzer. All Rights Reserved.
        </footer>
      </Stack>
    </div>
  );
};

export default Addd;



// import React, { useState, useEffect } from "react";
// import {
//   LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
// } from "recharts";
// import { MenuItem, FormControl, InputLabel, Select, Card, CardContent, Stack, Typography, Box } from "@mui/material";

// // Custom website colors (Adjust to match your site)
// const themeColors = {
//   primary: "#4CAF50", // Main Green (e.g., line chart color)
//   secondary: "#FF9800", // Orange (e.g., bar chart color)
//   background: "#1E1E2F", // Dark background
//   text: "#FFFFFF", // White text
// };

// const grains = ["wheat", "rice", "corn", "barley", "soybean"];

// const fetchMarketData = async () => {
//   try {
//     const response = await fetch("https://api.example.com/market-data");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching market data:", error);
//     return [];
//   }
// };

// const MarketTrendAnalyzer = () => {
//   const [selectedGrain, setSelectedGrain] = useState("wheat");
//   const [marketData, setMarketData] = useState([]);

//   useEffect(() => {
//     const updateMarketData = async () => {
//       const newData = await fetchMarketData();
//       setMarketData(newData);
//     };

//     updateMarketData();
//     const interval = setInterval(updateMarketData, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const maxPrice = Math.max(...marketData.map((d) => d.price), 0);
//   const minPrice = Math.min(...marketData.map((d) => d.price), Infinity);
//   const priceChangeProbability = Math.random() > 0.5 ? "Increase" : "Decrease";

//   const stateDistribution = grains.map((grain) => ({
//     name: grain,
//     value: marketData.filter((d) => d.grain === grain).length,
//   }));

//   const grainByState = marketData.reduce((acc, cur) => {
//     acc[cur.state] = acc[cur.state] || {};
//     acc[cur.state][cur.grain] = (acc[cur.state][cur.grain] || 0) + 1;
//     return acc;
//   }, {});

//   return (
//     <div style={{ backgroundColor: themeColors.background, color: themeColors.text, minHeight: "100vh", padding: "20px" }}>
//       <Stack spacing={3}>
//         <Card style={{ backgroundColor: themeColors.background, padding: "10px" }}>
//           <CardContent>
//             <Typography variant="h5" style={{ color: themeColors.primary }}>
//               Dashboard
//             </Typography>
//             <Typography>Max Price: ₹{maxPrice}</Typography>
//             <Typography>Min Price: ₹{minPrice}</Typography>
//             <Typography>Price Trend: {priceChangeProbability}</Typography>
//           </CardContent>
//         </Card>

//         <FormControl fullWidth variant="outlined" style={{ marginBottom: "20px" }}>
//           <InputLabel style={{ color: themeColors.text }}>Select Grain</InputLabel>
//           <Select
//             value={selectedGrain}
//             onChange={(e) => setSelectedGrain(e.target.value)}
//             style={{ color: themeColors.text, borderColor: themeColors.primary }}
//           >
//             {grains.map((grain) => (
//               <MenuItem key={grain} value={grain}>
//                 {grain.charAt(0).toUpperCase() + grain.slice(1)}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={marketData}>
//             <CartesianGrid stroke="#555" strokeDasharray="3 3" />
//             <XAxis dataKey="date" stroke={themeColors.text} />
//             <YAxis stroke={themeColors.text} />
//             <Tooltip contentStyle={{ backgroundColor: themeColors.background, color: themeColors.text }} />
//             <Legend />
//             <Line type="monotone" dataKey="price" stroke={themeColors.primary} strokeWidth={3} dot={{ r: 4 }} />
//           </LineChart>
//         </ResponsiveContainer>

//         {Object.entries(grainByState).map(([state, grains]) => (
//           <Card key={state} style={{ backgroundColor: themeColors.background, marginBottom: "10px" }}>
//             <CardContent>
//               <Typography variant="h6" style={{ color: themeColors.primary }}>{state}</Typography>
//               {Object.entries(grains).map(([grain, count]) => (
//                 <Typography key={grain}>{grain}: {count}</Typography>
//               ))}
//             </CardContent>
//           </Card>
//         ))}

//         <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#333", color: "#fff" }}>
//           © 2025 Market Trend Analyzer. All Rights Reserved.
//         </footer>
//       </Stack>
//     </div>
//   );
// };

// export default MarketTrendAnalyzer;
