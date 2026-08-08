import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    day: string;
    uploads: number;
  }[];
}

const UploadChart = ({ data = [] }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Weekly Upload Activity
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid
            stroke="#94a3b8"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "currentColor" }}
          />

          <YAxis
            tick={{ fill: "currentColor" }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="uploads"
            stroke="#3B82F6"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default UploadChart;