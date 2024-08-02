import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const SimpleRadarChart = ({ data }) => {
  //   const data = [
  //     {
  //       subject: "Math",
  //       A: 120,
  //       B: 110,
  //       fullMark: 150,
  //     },
  //     {
  //       subject: "Chinese",
  //       A: 98,
  //       B: 130,
  //       fullMark: 150,
  //     },
  //     {
  //       subject: "English",
  //       A: 86,
  //       B: 130,
  //       fullMark: 150,
  //     },
  //     {
  //       subject: "Geography",
  //       A: 99,
  //       B: 100,
  //       fullMark: 150,
  //     },
  //     {
  //       subject: "Physics",
  //       A: 85,
  //       B: 90,
  //       fullMark: 150,
  //     },
  //     {
  //       subject: "History",
  //       A: 65,
  //       B: 85,
  //       fullMark: 150,
  //     },
  //   ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid
          stroke="#4c7789"
          strokeWidth="4"
          strokeOpacity={0.8}
          radialLines={false}
        />
        <PolarAngleAxis
          dataKey="subject"
          stroke="#00ffff"
          strokeWidth="0"
          tick={{
            fontSize: "1rem",
            textDecoration: "underline",
            fontFamily: "Hind Siliguri",
            fontWeight: "600",
          }}
        />
        <Radar
          dataKey="A"
          stroke="#00ffff"
          strokeWidth="4"
          fill="#00ffff"
          fillOpacity={0.2}
        />
        <Radar
          dataKey="B"
          stroke="#508CFF"
          strokeWidth="4"
          fill="#508CFF"
          fillOpacity={0.2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SimpleRadarChart;
