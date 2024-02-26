import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { ActiveTeam, NoTeams } from "../components";
import { useDocumentTitle } from "../../hooks";
import { ClipLoader } from "react-spinners";
import ReactGA from "react-ga";

export const Main = () => {
  const { startSettingTeams, userTeams, dataLoading, startToggleModal, modalOpen } = useDashboard();

  useDocumentTitle("Dashboard | Esencia.app");
  useEffect(() => {
    const fetchData = async () => {
      await startSettingTeams();
    };

    fetchData();
  }, []);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <DashboardLayout>
      {dataLoading === false ? (
        userTeams?.length ? (
          <ActiveTeam />
        ) : (
          <NoTeams />
        )
      ) : (
        <div class='w-full md:grid lg:grid px-6 ml-4 sm:flex sm:flex-col lg:py-6 md:py-2 grid-cols-12 grid-rows-2 gap-6 animate-pulse'>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
          >
            <ClipLoader
              color='#00ff00'
              loading={true}
              css={`
                display: block;
                margin: 0 auto;
                border-color: red;
              `}
              size={50}
            />
          </div>
          <div class='h-[400px] w-full lg:col-span-6 md:col-span-8 bg-gray-200 rounded-md'></div>
          <div class='h-[400px] w-full lg:col-span-4 md:col-span-4 bg-gray-200 rounded-md'></div>
          <div class='h-[360px] w-full col-span-3 md:col-span-2 md:row-span-2 lg:row-span-1 bg-gray-200 rounded-md'></div>
          <div class='h-[300px] w-full lg:col-span-4 md:col-span-2 mt-2 row-span-2 rounded-md m-auto bg-gray-200'></div>
          <div class='h-[360px] w-full lg:col-span-8 md:col-span-8 row-span-2 bg-gray-200 rounded-md'></div>
        </div>
      )}
    </DashboardLayout>
  );
};
