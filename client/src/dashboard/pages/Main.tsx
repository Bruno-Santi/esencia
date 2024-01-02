import { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { DashboardLayout } from "../../layaout/DashboardLayout";
import { ActiveTeam, NoTeams } from "../components";
import { useDocumentTitle } from "../../hooks";
import css from "@emotion/styled";
import { ClipLoader } from "react-spinners";
export const Main = () => {
  const { startSettingUser, startSettingTeams, userTeams, dataLoading, startToggleModal, modalOpen } = useDashboard();
  useDocumentTitle("Dashboard | Esencia.app");
  useEffect(() => {
    const fetchData = async () => {
      await startSettingUser();
      await startSettingTeams();
    };

    fetchData();
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
            css={css`
              display: block;
              margin: 0 auto;
              border-color: red;
            `}
            size={50}
          />
        </div>
      )}
    </DashboardLayout>
  );
};
