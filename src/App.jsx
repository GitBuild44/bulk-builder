import { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [fileName, setFileName] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const headers = lines[0].split(",");
      const parsed = lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(",");
        return {
          name: values[headers.indexOf("Name")]?.trim(),
          quantity: values[headers.indexOf("Quantity")]?.trim(),
          setName: values[headers.indexOf("Set name")]?.trim(),
          rarity: values[headers.indexOf("Rarity")]?.trim(),
          condition: values[headers.indexOf("Condition")]?.trim(),
          foil: values[headers.indexOf("Foil")]?.trim(),
          scryfallId: values[headers.indexOf("Scryfall ID")]?.trim(),
        };
      });
      setCards(parsed);
    };
    reader.readAsText(file);
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ color: "#1F4E79" }}>🃏 Bulk Builder</h1>
      <p style={{ color: "#595959" }}>Import your ManaBox collection to get started.</p>

      <div style={{ margin: "24px 0", padding: "20px", border: "2px dashed #2E75B6", borderRadius: "8px" }}>
        <label style={{ cursor: "pointer", color: "#2E75B6", fontWeight: "bold" }}>
          📁 Click to upload your ManaBox CSV
          <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: "none" }} />
        </label>
        {fileName && <p style={{ marginTop: "8px", color: "#375623" }}>✅ Loaded: {fileName}</p>}
      </div>

      {cards.length > 0 && (
        <div>
          <h2 style={{ color: "#1F4E79" }}>Your Collection ({cards.length} cards)</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#1F4E79", color: "white" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Set</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Rarity</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Condition</th>
                <th style={{ padding: "8px", textAlign: "center" }}>Qty</th>
                <th style={{ padding: "8px", textAlign: "center" }}>Foil</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white" }}>
                  <td style={{ padding: "8px" }}>{card.name}</td>
                  <td style={{ padding: "8px" }}>{card.setName}</td>
                  <td style={{ padding: "8px" }}>{card.rarity}</td>
                  <td style={{ padding: "8px" }}>{card.condition}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{card.quantity}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>{card.foil === "foil" ? "✨" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;