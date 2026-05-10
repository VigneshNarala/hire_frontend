import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/heatmap.css";

const Heatmap = ({ username }) => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateData();
  }, [username]);

  const generateData = () => {
    setLoading(true);
    // Generate a deterministic pattern based on username
    const seed = username || "guest";
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    const newValues = Array.from({ length: 365 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (365 - i));
      
      // Pseudo-random but consistent for the same username
      const pseudoRandom = Math.abs(Math.sin(hash + i));
      const count = pseudoRandom > 0.8 ? Math.floor(pseudoRandom * 5) : 0;

      return {
        date: date.toISOString().split('T')[0],
        count: count,
      };
    });

    setTimeout(() => {
      setValues(newValues);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="heatmap-glass">
      <div className="heatmap-header">
        <h3 className="heatmap-title">
          GitHub Commit Activity {username ? `- @${username}` : ""}
        </h3>
        {loading && <div className="spinner-mini"></div>}
      </div>
      <div className="heatmap-container">
        {!loading && (
          <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={values}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              return `color-scale-${value.count}`;
            }}
            showWeekdayLabels={false}
          />
        )}
      </div>
    </div>
  );
};

export default Heatmap;
