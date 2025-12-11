// src/components/Podium.tsx
import type { Data } from "../api/data";

type PodiumProps = {
  entries: Data[];
};

export function Podium({ entries }: PodiumProps) {
  // Make a sorted copy (heaviest first)
  const top3 = [...entries]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  // Fill missing spots if there are fewer than 3 lifters
  const [first, second, third] = [
    top3[0],
    top3[1],
    top3[2],
  ];

  return (
    <div className="podium-wrapper">
      <h2 className="podium-title">Top 3</h2>

      <div className="podium-stage">
        {/* 2nd place (left) */}
        <div className="podium-column podium-2">
          <div className="podium-figure">🥈</div>
          <div className="podium-block block-2 doodle-border">
            <span className="podium-place">2</span>
          </div>
          <div className="podium-name">
            {second ? second.name : "-"}
          </div>
          <div className="podium-weight">
            {second ? `${second.weight} kg` : ""}
          </div>
        </div>

        {/* 1st place (middle, tallest) */}
        <div className="podium-column podium-1">
          <div className="podium-figure">
            <img src="/Crown.svg" className="podium-img crown" alt="crown" />
          </div>
          <div className="podium-block block-1 doodle-border">
            <span className="podium-place">1</span>
          </div>
          <div className="podium-name">
            {first ? first.name : "-"}
          </div>
          <div className="podium-weight">
            {first ? `${first.weight} kg` : ""}
          </div>
        </div>

        {/* 3rd place (right) */}
        <div className="podium-column podium-3">
          <div className="podium-figure">🥉</div>
          <div className="podium-block block-3 doodle-border">
            <span className="podium-place">3</span>
          </div>
          <div className="podium-name">
            {third ? third.name : "-"}
          </div>
          <div className="podium-weight">
            {third ? `${third.weight} kg` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
