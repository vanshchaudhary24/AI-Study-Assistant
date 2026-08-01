import {
  useEffect,
  useState,
} from "react";

import DashboardCard from "../../components/dashboard/DashboardCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentDocuments from "../../components/dashboard/RecentDocuments";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";

import { getDashboard } from "../../services/dashboard.service";

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
        await getDashboard();

      setDashboard(
        response.data
      );

    };

  if (!dashboard) {

    return (
      <p className="text-white">
        Loading...
      </p>
    );

  }

  return (

    <>

      <WelcomeBanner />

      <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Documents"
          value={String(
            dashboard.documents
          )}
          icon={<FileText />}
        />

        <DashboardCard
          title="Summaries"
          value={String(
            dashboard.summaries
          )}
          icon={<BookOpen />}
        />

        <DashboardCard
          title="Quizzes"
          value={String(
            dashboard.quizzes
          )}
          icon={<Brain />}
        />

        <DashboardCard
          title="AI Chats"
          value={String(
            dashboard.chats
          )}
          icon={<MessageSquare />}
        />

      </div>

      <QuickActions />

      <RecentDocuments
        documents={
          dashboard.recentDocuments
        }
      />

    </>

  );

};

export default Dashboard;