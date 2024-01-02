import React, { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { TeamList } from "./TeamList";

export const Teams: React.FC = () => {
  const { userTeams } = useDashboard();
  useEffect(() => {}, [userTeams]);

  return (
    <aside className='flex flex-col  m-auto justify-center my-auto mx-auto'>
      <div className='my-auto ml-4 mt-4 space-y-6 '>
        {userTeams?.map(({ id, name, logo }: { id: number; name: string; logo: string }) => (
          <div className=''>
            <TeamList key={id} id={id} name={name} logo={logo} />
          </div>
        ))}
      </div>
    </aside>
  );
};
