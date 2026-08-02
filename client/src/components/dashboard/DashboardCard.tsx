import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const DashboardCard = ({
  title,
  value,
  icon,
}: DashboardCardProps) => {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-lg">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;