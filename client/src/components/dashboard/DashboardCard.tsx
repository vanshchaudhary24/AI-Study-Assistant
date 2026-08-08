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
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
          {value}
        </h2>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-lg">
        {icon}
      </div>

    </div>
  );
};

export default DashboardCard;