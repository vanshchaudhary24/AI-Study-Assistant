import type { ReactNode } from "react";

interface UploadStatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const UploadStatCard = ({
  title,
  value,
  icon,
}: UploadStatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-blue-600 p-3 text-white">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default UploadStatCard;