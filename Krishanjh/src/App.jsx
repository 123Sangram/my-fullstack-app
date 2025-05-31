import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutContractFarming from "./components/about/AboutContractFarming";
import Faq from "./components/about/FAQPage";
import Support from "./components/about/SupportSection";
import Ask from "./components/ask/Ask"; // Ask component का import
import BuyerForm from "./components/buyerform/BuyerForm";
import ChatBot from "./components/chatbot/ChatBot";
import Contract from "./components/contract/Contract";
import FarmingEducation from "./components/education/FarmingEducation";
import EnterPage from "./components/enterpage/EnterPage";
import FarmerForm from "./components/farmerform/FarmerForm";
import FrontPage from "./components/front/FrontPage";
import Legal from "./components/Market/LegalPage";
import MarketTrendAnalyzer from "./components/Market/MarketTrendAnalyzer";
import MidPage from "./components/midpage/MidPage";
import BuyerProfile from "./components/profile/BuyerProfile";
import FarmerProfile from "./components/profile/FarmerProfile";
import ReadMore from "./components/secondPage/ReadMore";
import AllFarmers from "./components/profile/AllFarmers";
import BuyerList from "./components/profile/BuyerList";
import ProductList from "./components/profile/ProductList";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterPage />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/farmer-form" element={<FarmerForm />} />
        <Route path="/buyer-form" element={<BuyerForm />} />
        <Route path="/frontpage" element={<FrontPage />} />
        <Route path="/midpage" element={<MidPage />} />
        <Route path="/MarketTrendAnalyzer" element={<MarketTrendAnalyzer />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/support" element={<Support />} />
        <Route path="/allfarmers" element={<AllFarmers/>} />
        <Route
          path="/about-contract-farming"
          element={<AboutContractFarming />}
        />
        <Route path="/education" element={<FarmingEducation />} />
        <Route path="/farmer-profile" element={<FarmerProfile />} />
        <Route path="/buyer-profile" element={<BuyerProfile />} />
        <Route path="/readmore" element={<ReadMore/>} />
         <Route path="/buyerlist" element={<BuyerList/>} />
          <Route path="/productlist" element={<ProductList/>} />
      </Routes>
    </Router>
  );
}

export default App;
