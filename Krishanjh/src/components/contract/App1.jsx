import "./App1.css";

const App = () => {
  return (
    <div className="krisaanjh-app-container">
      {/* Header Logo */}
      <header className="krisaanjh-logo">
        <img src="public/Asset 1@4x 1 (1).png" />
        <h1>Krisaanjh</h1>
      </header>

      {/* Farmer and Buyer Section */}
      <div className="krisaanjh-cards-container">
        {/* Farmer Card */}
        <div className="krisaanjh-card">
          <img
            src="src/assets/Rectangle 55.png"
            alt="Farmer"
            className="krisaanjh-image"
          />
          <div className="krisaanjh-back-image"></div>
          <div className="krisaanjh-card-footer">
            <h2>FARMER</h2>
          </div>
        </div>

        {/* Buyer Card */}
        <div className="krisaanjh-card">
          <img
            src="src/assets/Rectangle 59.png"
            alt="Buyer"
            className="krisaanjh-image"
          />
          <div className="krisaanjh-card-footer">
            <h2>BUYER</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
