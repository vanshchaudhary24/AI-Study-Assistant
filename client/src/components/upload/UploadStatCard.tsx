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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-white">
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