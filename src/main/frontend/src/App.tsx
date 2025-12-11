import "./App.css";

import { useEffect, useState } from "react";
import { getBench, getSquat, getDeadlift } from "./api/leaderboard.ts";
import type { Data } from "./api/data.ts";
import { Podium } from "./component/Podium";

function App() {
  const [datas, setDatas] = useState<Data[]>([]);
  const [status, setStatus] = useState("Loading...");
  const [activeTab, setActiveTab] = useState<"bench" | "deadlift" | "squat">("bench");


  useEffect(() => {
    async function load() {
      try {
        setStatus("Loading...");

        let data: Data[];

        if (activeTab === "bench") {
          data = await getBench();
        } else if (activeTab === "deadlift") {
          data = await getDeadlift();
        } else {
          data = await getSquat();
        }

        setDatas(data);
        setStatus("");
      } catch (err) {
        setStatus("Error: " + (err as Error).message);
      }
    }

    load();
  }, [activeTab]);

  if (status) {
    return <p>{status}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Digdir strength list</h1>

      {/* TAB BAR */}
      <div className="tab-bar">
        <button
          className={`tab doodle-border ${activeTab === "bench" ? "active" : ""}`}
          onClick={() => setActiveTab("bench")}
        >
          Bench
        </button>

        <button
          className={`tab doodle-border ${activeTab === "deadlift" ? "active" : ""}`}
          onClick={() => setActiveTab("deadlift")}
        >
          Deadlift
        </button>
        <button
          className={`tab doodle-border ${activeTab === "squat" ? "active" : ""}`}
          onClick={() => setActiveTab("squat")}
        >
          Squat
        </button>
      </div>

      {/* BORDER BOX */}
      <div
        className="doodle-border content-box"
        style={{
          padding: "0px",
          marginTop: "0px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
      >
        <table className="bench-table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Weight (Kg)</th>
          </tr>
          </thead>
          <tbody>
          {datas.map((u) => (
            <tr key={u.name}>
              <td>{u.name}</td>
              <td>{u.weight}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {/* 🏆 podium */}
      <Podium entries={datas} />
    </div>

  );


}

export default App;
