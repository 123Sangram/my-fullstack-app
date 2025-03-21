import React, { useState } from "react";
import jsPDF from "jspdf";

const DynamicInputFields = ({
  inputFields,
  handleInputChange,
  removeInputField,
  addInputField,
}) => {
  return (
    <div className="add-field">
      {inputFields.map((inputField, index) => (
        <div key={index} className="input-flex">
          <input
            type="text"
            value={inputField.value}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Add point"
          />
          <button
            onClick={() => removeInputField(index)}
            style={{ marginLeft: "10px" }}
            className="remove-btn"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addInputField} className="blue-btn">
        Add Input Field
      </button>
    </div>
  );
};

const PDFGenerator = () => {
  // State for static inputs
  const [sellerName, setSellerName] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerDesignation, setBuyerDesignation] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");

  // State for dynamic inputs
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const removeInputField = (index) => {
    const newInputFields = inputFields.filter((_, i) => i !== index);
    setInputFields(newInputFields);
  };

  const addInputField = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleInputChange = (index, event) => {
    const newInputFields = [...inputFields];
    newInputFields[index].value = event.target.value;
    setInputFields(newInputFields);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title and subtitle to the PDF
    doc.text("ANNEXURE 1", 10, 10);
    doc.text("MODEL AGREEMENT", 10, 20);

    // Add content for Seller
    doc.text("*Party of the First Part (Seller):", 10, 30);
    doc.text(`Name: ${sellerName || "[Seller Name]"}`, 10, 40);
    doc.text(`Address: ${sellerAddress || "[Seller Address]"}`, 10, 50);

    // Add content for Buyer
    doc.text("*Party of the Second Part (Buyer):", 10, 70);
    doc.text(`Name: ${buyerName || "[Buyer Name]"}`, 10, 80);
    doc.text(`Designation: ${buyerDesignation || "[Designation]"}`, 10, 90);
    doc.text(`Address: ${buyerAddress || "[Buyer Address]"}`, 10, 100);

    // Add dynamic points
    doc.text("Points:", 10, 500);
    inputFields.forEach((field, index) => {
      doc.text(
        `${index + 1}. ${field.value || "[No point added]"}`,
        10,
        500 + index * 10
      );
    });

    // Save the PDF
    doc.save("generated_agreement.pdf");
  };

  return (
    <div>
      <div className="document">
        <div className="white">
          <div className="agreement-container">
            <h2 className="title">ANNEXURE 1</h2>
            <h3 className="subtitle">MODEL AGREEMENT</h3>

            <div className="section">
              <p>
                <strong>*Party of the First Part (Seller):</strong>
              </p>
              <p>
                Name:{" "}
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="[Seller Name]"
                />
              </p>
              <p>
                Address:{" "}
                <input
                  type="text"
                  value={sellerAddress}
                  onChange={(e) => setSellerAddress(e.target.value)}
                  placeholder="[Seller Address]"
                />
              </p>
              <p className="description">
                Which hereinafter shall be in this agreement addressed as the
                First Party (which expression, unless repugnant to the context
                or meaning thereof, means and includes successors, relatives,
                and assignees).
              </p>
            </div>

            <div className="section">
              <p>
                <strong>*Party of the Second Part (Buyer):</strong>
              </p>
              <p>
                Name:{" "}
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="[Buyer Name]"
                />
              </p>
              <p>
                Designation:{" "}
                <input
                  type="text"
                  value={buyerDesignation}
                  onChange={(e) => setBuyerDesignation(e.target.value)}
                  placeholder="[Designation]"
                />
              </p>
              <p>
                Address:{" "}
                <input
                  type="text"
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  placeholder="[Buyer Address]"
                />
              </p>
              <p className="description">
                Which hereinafter shall be in this agreement addressed as the
                Second Party (which expression, unless repugnant to the context
                or meaning thereof, means and includes successors, promoters,
                executors, administrators, and assignees).
              </p>
            </div>

            <div className="section">
              <p>
                The First Party is interested in producing certain commodities
                for the Second Party as per Schedule 1.
                <br />
                <DynamicInputFields
                  inputFields={inputFields}
                  handleInputChange={handleInputChange}
                  removeInputField={removeInputField}
                  addInputField={addInputField}
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button to generate PDF */}
      <button onClick={generatePDF} className="blue-btn">
        Generate PDF
      </button>

      {/* Preview Section */}
      <div className="preview-section">
        <h3>Preview of Agreement</h3>
        <div>
          <h4>*Party of the First Part (Seller):</h4>
          <p>Name: {sellerName || "[Seller Name]"}</p>
          <p>Address: {sellerAddress || "[Seller Address]"}</p>
        </div>
        <div>
          <h4>*Party of the Second Part (Buyer):</h4>
          <p>Name: {buyerName || "[Buyer Name]"}</p>
          <p>Designation: {buyerDesignation || "[Designation]"}</p>
          <p>Address: {buyerAddress || "[Buyer Address]"}</p>
        </div>
        <div>
          <h4>Points:</h4>
          {inputFields.length > 0 ? (
            inputFields.map((field, index) => (
              <p key={index}>{`${index + 1}. ${
                field.value || "[No point added]"
              }`}</p>
            ))
          ) : (
            <p>No points added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
