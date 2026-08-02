import {
  useEffect,
  useState,
} from "react";
import Loader from "../../components/common/Loader";
import DashboardCard from "../../components/dashboard/DashboardCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentDocuments from "../../components/dashboard/RecentDocuments";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { getAnalytics } from "../../services/analytics.service";
import UploadChart from "../../components/dashboard/charts/UploadChart";
import FeatureUsageChart from "../../components/dashboard/charts/FeatureUsageChart";

import {
  FileText,
  Brain,
  MessageSquare,
  BookOpen,
} from "lucide-react";


const Dashboard = () => {

  const [dashboard, setDashboard] =
    useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {

      const response =
        await getAnalytics();

      setDashboard(
        response.data
      );
    };


  if (!dashboard) {
    return <Loader text="Loading Dashboard..." />;
  }

  return (
    <>

      <WelcomeBanner />

      <div className="mb-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Documents"
          value={String(
            dashboard.totalDocuments
          )}
          icon={<FileText />}
        />

        <DashboardCard
          title="Summaries"
          value={String(
            dashboard.totalSummaries
          )}
          icon={<BookOpen />}
        />

        <DashboardCard
          title="Quizzes"
          value={String(
            dashboard.totalQuizzes
          )}
          icon={<Brain />}
        />

        <DashboardCard
          title="AI Chats"
          value={String(
            dashboard.totalChats
          )}
          icon={<MessageSquare />}
        />

      </div>

      <div className="mb-10 grid gap-8 md:grid-cols-3">

        <DashboardCard
          title="Flashcards"
          value={String(
            dashboard.totalFlashcards
          )}
          icon={<BookOpen />}
        />

        <DashboardCard
          title="Uploads This Week"
          value={String(
            dashboard.uploadsThisWeek
          )}
          icon={<FileText />}
        />

        <DashboardCard
          title="Storage Used"
          value={`${(
            dashboard.totalStorage /
            1024 /
            1024
          ).toFixed(2)} MB`}
          icon={<Brain />}
        />

      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-2">

        <UploadChart
          data={dashboard.UploadChart}
        />

        <FeatureUsageChart
          data={dashboard.FeatureUsageChart}
        />

      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-2">

        <QuickActions />

        <RecentActivity
          documents={dashboard.recentDocuments}
        />

      </div>

      <RecentDocuments
        documents={dashboard.recentDocuments}
      />

    </>

  );

};

export default Dashboard;