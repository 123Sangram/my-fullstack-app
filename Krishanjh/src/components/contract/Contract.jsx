// import { useState } from "react";
// import "./App2.css"; // Importing a CSS file for styling
// import PDFGenerator from "./PDFGenerator";

// const App2 = () => {
//   const [selectedLine, setSelectedLine] = useState("");
//   const [editPoint, setEditPoint] = useState("");
//   const [newPoint, setNewPoint] = useState("");
//   const [font, setFont] = useState("Arial");

//   const handleSelectLine = (e) => setSelectedLine(e.target.value);
//   const handleEditPoint = (e) => setEditPoint(e.target.value);
//   const handleAddNewPoint = (e) => setNewPoint(e.target.value);
//   const handleFontChange = (e) => setFont(e.target.value);

//   return (
//     <div className="contract-editor-container">
//       <div className="side-menu">
//         <img src="../src/Utils/Asset 1@4x 1.png" alt="" />
//         <svg
//           width="15"
//           height="28"
//           viewBox="0 0 15 28"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M13.3789 25.7605L1.6189 14.0005L13.3789 2.24048"
//             stroke="white"
//             // stroke-width="3.024"
//             // stroke-linecap="round"
//             // stroke-linejoin="round"
//           />
//         </svg>
//         <svg
//           width="22"
//           height="21"
//           viewBox="0 0 22 21"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M0.72 3.59933H0.82224C0.979396 4.21679 1.3378 4.76428 1.84084 5.15532C2.34387 5.54636 2.96285 5.75865 3.6 5.75865C4.23715 5.75865 4.85613 5.54636 5.35916 5.15532C5.8622 4.76428 6.2206 4.21679 6.37776 3.59933H20.88C21.071 3.59933 21.2541 3.52347 21.3891 3.38844C21.5241 3.25342 21.6 3.07028 21.6 2.87933C21.6 2.68837 21.5241 2.50524 21.3891 2.37021C21.2541 2.23518 21.071 2.15933 20.88 2.15933H6.37776C6.2206 1.54187 5.8622 0.994368 5.35916 0.603329C4.85613 0.212289 4.23715 0 3.6 0C2.96285 0 2.34387 0.212289 1.84084 0.603329C1.3378 0.994368 0.979396 1.54187 0.82224 2.15933H0.72C0.529044 2.15933 0.345909 2.23518 0.210883 2.37021C0.0758569 2.50524 0 2.68837 0 2.87933C0 3.07028 0.0758569 3.25342 0.210883 3.38844C0.345909 3.52347 0.529044 3.59933 0.72 3.59933ZM3.6 1.43933C3.88481 1.43933 4.16321 1.52378 4.40002 1.68201C4.63683 1.84024 4.8214 2.06514 4.93039 2.32826C5.03938 2.59139 5.06789 2.88092 5.01233 3.16026C4.95677 3.43959 4.81962 3.69617 4.61823 3.89756C4.41685 4.09895 4.16026 4.23609 3.88093 4.29166C3.6016 4.34722 3.31206 4.3187 3.04894 4.20971C2.78581 4.10072 2.56091 3.91615 2.40268 3.67935C2.24445 3.44254 2.16 3.16413 2.16 2.87933C2.16 2.49741 2.31171 2.13115 2.58177 1.86109C2.85182 1.59104 3.21809 1.43933 3.6 1.43933ZM20.88 9.35933H20.7778C20.6206 8.74187 20.2622 8.19437 19.7592 7.80333C19.2561 7.41229 18.6371 7.2 18 7.2C17.3629 7.2 16.7439 7.41229 16.2408 7.80333C15.7378 8.19437 15.3794 8.74187 15.2222 9.35933H0.72C0.529044 9.35933 0.345909 9.43518 0.210883 9.57021C0.0758569 9.70524 0 9.88837 0 10.0793C0 10.2703 0.0758569 10.4534 0.210883 10.5884C0.345909 10.7235 0.529044 10.7993 0.72 10.7993H15.2222C15.3794 11.4168 15.7378 11.9643 16.2408 12.3553C16.7439 12.7464 17.3629 12.9587 18 12.9587C18.6371 12.9587 19.2561 12.7464 19.7592 12.3553C20.2622 11.9643 20.6206 11.4168 20.7778 10.7993H20.88C21.071 10.7993 21.2541 10.7235 21.3891 10.5884C21.5241 10.4534 21.6 10.2703 21.6 10.0793C21.6 9.88837 21.5241 9.70524 21.3891 9.57021C21.2541 9.43518 21.071 9.35933 20.88 9.35933ZM18 11.5193C17.7152 11.5193 17.4368 11.4349 17.2 11.2766C16.9632 11.1184 16.7786 10.8935 16.6696 10.6304C16.5606 10.3673 16.5321 10.0777 16.5877 9.7984C16.6432 9.51906 16.7804 9.26248 16.9818 9.06109C17.1832 8.8597 17.4397 8.72256 17.7191 8.667C17.9984 8.61143 18.2879 8.63995 18.5511 8.74894C18.8142 8.85793 19.0391 9.0425 19.1973 9.27931C19.3555 9.51611 19.44 9.79452 19.44 10.0793C19.44 10.4612 19.2883 10.8275 19.0182 11.0976C18.7482 11.3676 18.3819 11.5193 18 11.5193ZM20.88 16.5593H13.5778C13.4206 15.9419 13.0622 15.3944 12.5592 15.0033C12.0561 14.6123 11.4371 14.4 10.8 14.4C10.1629 14.4 9.54387 14.6123 9.04084 15.0033C8.5378 15.3944 8.1794 15.9419 8.02224 16.5593H0.72C0.529044 16.5593 0.345909 16.6352 0.210883 16.7702C0.0758569 16.9052 0 17.0884 0 17.2793C0 17.4703 0.0758569 17.6534 0.210883 17.7884C0.345909 17.9235 0.529044 17.9993 0.72 17.9993H8.02224C8.1794 18.6168 8.5378 19.1643 9.04084 19.5553C9.54387 19.9464 10.1629 20.1587 10.8 20.1587C11.4371 20.1587 12.0561 19.9464 12.5592 19.5553C13.0622 19.1643 13.4206 18.6168 13.5778 17.9993H20.88C21.071 17.9993 21.2541 17.9235 21.3891 17.7884C21.5241 17.6534 21.6 17.4703 21.6 17.2793C21.6 17.0884 21.5241 16.9052 21.3891 16.7702C21.2541 16.6352 21.071 16.5593 20.88 16.5593ZM10.8 18.7193C10.5152 18.7193 10.2368 18.6349 9.99998 18.4766C9.76317 18.3184 9.5786 18.0935 9.46961 17.8304C9.36062 17.5673 9.33211 17.2777 9.38767 16.9984C9.44323 16.7191 9.58038 16.4625 9.78177 16.2611C9.98315 16.0597 10.2397 15.9226 10.5191 15.867C10.7984 15.8114 11.0879 15.8399 11.3511 15.9489C11.6142 16.0579 11.8391 16.2425 11.9973 16.4793C12.1555 16.7161 12.24 16.9945 12.24 17.2793C12.24 17.6612 12.0883 18.0275 11.8182 18.2976C11.5482 18.5676 11.1819 18.7193 10.8 18.7193Z"
//             fill="white"
//           />
//         </svg>
//         <svg
//           width="28"
//           height="28"
//           viewBox="0 0 28 28"
//           fill="black"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M25.8376 10.9994H24.5208C24.166 10.9994 23.7521 10.6768 23.6124 10.2951C23.4888 9.94032 23.3383 9.59087 23.1716 9.24681C22.9943 8.88661 23.0588 8.36513 23.3114 8.11246L24.252 7.17165C24.9078 6.51577 24.9078 5.44594 24.252 4.79006L22.7309 3.26864C22.4137 2.95145 21.9891 2.77404 21.5376 2.77404C21.0861 2.77404 20.6615 2.94608 20.3444 3.26864L19.4091 4.20945C19.2586 4.35998 19.006 4.45137 18.7373 4.45137C18.5706 4.45137 18.4094 4.41911 18.275 4.34922C17.9364 4.18257 17.5816 4.03741 17.2269 3.90839C16.8453 3.77399 16.5228 3.35466 16.5228 2.99984V1.6827C16.5228 0.758023 15.7649 0 14.835 0H12.685C11.7551 0 11.0026 0.758023 11.0026 1.6827V2.99984C11.0026 3.35466 10.6801 3.77399 10.2985 3.90839C9.94375 4.03204 9.589 4.18257 9.25038 4.34385C9.116 4.40836 8.95475 4.44599 8.78813 4.44599C8.51937 4.44599 8.26675 4.3546 8.11625 4.20407L7.181 3.26864C6.86388 2.95145 6.43925 2.77404 5.98775 2.77404C5.53625 2.77404 5.11162 2.95145 4.7945 3.26864L3.268 4.79544C2.95088 5.11262 2.7735 5.53733 2.7735 5.98892C2.7735 6.44051 2.95088 6.85984 3.268 7.17703L4.20863 8.11784C4.46125 8.37051 4.52575 8.89199 4.35375 9.25218C4.18713 9.59625 4.042 9.94569 3.913 10.3005C3.77863 10.6822 3.35938 11.0048 3.00463 11.0048H1.68775C0.757875 10.9994 0 11.7574 0 12.6875V14.8379C0 15.768 0.757875 16.5206 1.68237 16.5206H2.99925C3.354 16.5206 3.77325 16.8432 3.90762 17.2249C4.03125 17.5797 4.18175 17.9291 4.34838 18.2732C4.52575 18.6334 4.45587 19.1549 4.20325 19.4075L3.26262 20.3484C2.60688 21.0042 2.60688 22.0741 3.26262 22.7299L4.78912 24.2567C5.10625 24.5739 5.53088 24.7513 5.98238 24.7513C6.43388 24.7513 6.85313 24.5739 7.17563 24.2567L8.11625 23.3159C8.26675 23.1654 8.51937 23.074 8.78813 23.074C8.95475 23.074 9.116 23.1063 9.25038 23.1762C9.589 23.3428 9.94375 23.488 10.2985 23.6116C10.6801 23.746 11.0026 24.1653 11.0026 24.5202V25.8373C11.0026 26.7674 11.7605 27.52 12.685 27.52H14.835C15.7649 27.52 16.5228 26.762 16.5228 25.8373V24.5202C16.5228 24.1653 16.8453 23.746 17.2269 23.6116C17.5816 23.488 17.9364 23.3374 18.275 23.1762C18.404 23.1116 18.5706 23.074 18.7373 23.074C19.006 23.074 19.2586 23.1654 19.4091 23.3159L20.3444 24.2567C20.6615 24.5739 21.0861 24.7513 21.5376 24.7513C21.9891 24.7513 22.4084 24.5739 22.7309 24.2567L24.252 22.7299C24.9078 22.0741 24.9078 21.0042 24.252 20.3484L23.3167 19.4129C23.0641 19.1602 22.9996 18.6388 23.177 18.2786C23.3436 17.9399 23.4888 17.5851 23.6124 17.2302C23.7467 16.8485 24.166 16.526 24.5208 16.526H25.8376C26.7675 16.526 27.52 15.768 27.52 14.8433V12.6875C27.52 11.7574 26.7621 10.9994 25.8376 10.9994ZM13.76 18.7033C11.0349 18.7033 8.82038 16.4883 8.82038 13.7627C8.82038 11.0424 11.0349 8.8221 13.76 8.8221C16.4851 8.8221 18.6996 11.037 18.6996 13.7627C18.6996 16.483 16.4851 18.7033 13.76 18.7033Z"
//             fill="white"
//           />
//         </svg>
//       </div>
//       {/* Sidebar with controls */}
//       <div className="sidebar">
//         <h2>Edit contract</h2>
//         <label>Select Module</label>
//         <select value={selectedLine} onChange={handleSelectLine}>
//           <option value="">Select Module</option>
//           <option value="line1">Module 1</option>
//           <option value="line2">Module 2</option>
//         </select>
//         <hr />
//         <label>Edit a point</label>
//         <input
//           type="text"
//           placeholder="Edit a point"
//           value={editPoint}
//           onChange={handleEditPoint}
//         />
//         <hr />
//         <label>Add new point</label>
//         <input
//           type="text"
//           placeholder="Add new point"
//           value={newPoint}
//           onChange={handleAddNewPoint}
//         />
//         <hr />
//         <label>Select font</label>
//         <select value={font} onChange={handleFontChange}>
//           <option value="Arial">Arial</option>
//           <option value="Times New Roman">Times New Roman</option>
//           <option value="Courier New">Courier New</option>
//         </select>
//       </div>

//       {/* Main Document Editor */}
//       <div className="document-editor">
//         <div className="headerr">
//           <div className="bind">
//             <p className="ai-contract-writer">AI contract writer</p>
//             <div className="vl"></div>
//             <div className="text-formatting">
//               <button className="bold-btn">B</button>
//               <button className="underline-btn">U</button>
//               <button className="italic-btn">I</button>
//             </div>
//           </div>

//           <button className="share-btn">
//             Share
      
//           </button>
//         </div>
//         <PDFGenerator />
//       </div>
//     </div>
//   );
// };

// export default App2;










import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import stampp from '../../assets/images/images agriculture.jpeg';
import stamppp from '../../assets/images/topimage.jpg';

const App2 = () => {
  const [contractName, setContractName] = useState('MODEL AGREEMENT');
  const [sellerName, setSellerName] = useState('[Seller Name]');
  const [sellerAddress, setSellerAddress] = useState('[Seller Address]');
  const [buyerName, setBuyerName] = useState('[Buyer Name]');
  const [buyerDesignation, setBuyerDesignation] = useState('[Designation]');
  const [buyerAddress, setBuyerAddress] = useState('[Buyer Address]');
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState('');

  const addPoint = () => {
    if (newPoint.trim() !== '') {
      setPoints([...points, newPoint]);
      setNewPoint('');
    }
  };

  const removePoint = (index) => {
    const updated = [...points];
    updated.splice(index, 1);
    setPoints(updated);
  };

  const downloadPDF = () => {
    const input = document.getElementById('contract-content');
    if (!input) return;

    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);

      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        while (position + pdf.internal.pageSize.getHeight() < pdfHeight) {
          position -= pdf.internal.pageSize.getHeight();
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        }
      }

      pdf.save('contract.pdf');
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-green-200 p-4 sm:p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-800">Edit Contract</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Contract Name</label>
          <input value={contractName} onChange={(e) => setContractName(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Seller Name</label>
          <input value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full p-2 border rounded" />
          <label className="block text-sm font-medium mt-2 mb-1">Seller Address</label>
          <input value={sellerAddress} onChange={(e) => setSellerAddress(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Buyer Name</label>
          <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full p-2 border rounded" />
          <label className="block text-sm font-medium mt-2 mb-1">Buyer Designation</label>
          <input value={buyerDesignation} onChange={(e) => setBuyerDesignation(e.target.value)} className="w-full p-2 border rounded" />
          <label className="block text-sm font-medium mt-2 mb-1">Buyer Address</label>
          <input value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Add New Point</label>
          <input value={newPoint} onChange={(e) => setNewPoint(e.target.value)} className="w-full p-2 border rounded" />
          <button onClick={addPoint} className="mt-2 w-full bg-green-800 text-white py-2 rounded hover:bg-green-700">
            Add Input Field
          </button>
        </div>

        <button onClick={downloadPDF} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded w-full">
          Download Contract
        </button>
      </aside>

      {/* Preview Panel */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto bg-white">
        <div id="contract-content" className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 space-y-6 text-base sm:text-[16px] leading-relaxed">
          <img src={stamppp} alt="Stamp" className="w-full max-h-[200px] sm:max-h-[250px] object-contain mb-4" />

          <h3 className="text-green-700 font-semibold text-base sm:text-lg uppercase">Annexure 1</h3>
          <h1 className="text-xl sm:text-2xl font-bold mb-4">{contractName}</h1>

          <div>
            <p className="font-semibold">*Party of the First Part (Seller):</p>
            <p>Name: {sellerName}</p>
            <p>Address: {sellerAddress}</p>
            <p className="mb-4">Which hereinafter shall be in this agreement addressed as the First Party...</p>
          </div>

          <div>
            <p className="font-semibold">*Party of the Second Part (Buyer):</p>
            <p>Name: {buyerName}</p>
            <p>Designation: {buyerDesignation}</p>
            <p>Address: {buyerAddress}</p>
            <p className="mb-4">Which hereinafter shall be in this agreement addressed as the Second Party...</p>
          </div>

          {points.map((point, index) => (
            <div key={index} className="flex justify-between items-start gap-4">
              <p className="whitespace-pre-wrap flex-1">{point}</p>
              <button onClick={() => removePoint(index)} className="text-red-600 hover:text-red-800">Remove</button>
            </div>
          ))}

          <div className="pt-10 text-right">
            <p className="italic text-sm text-gray-600 mb-2">Signed electronically</p>
            <img src={stampp} alt="Digital Signature" className="h-20 sm:h-24 inline-block" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App2;

