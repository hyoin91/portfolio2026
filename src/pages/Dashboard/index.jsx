import Icon from "../../components/ui/Icon";
import {Search,UserRound} from "lucide-react";

import Welcome from "../../components/dashboard/Welcome";
import RoleBalance from "../../components/dashboard/RoleBalanceCard/RoleBalance";
import Stats from "../../components/dashboard/StatsCard/Stats";
import {RowBetween} from"../../components/layout/Layout";

function Dashboard() {
  return (
  <div>
    <Welcome/>
    <RowBetween>
      <RoleBalance/>
      <Stats/>
    </RowBetween>
    
  </div>
  );
}

export default Dashboard;

//---------------------styled----------------//
