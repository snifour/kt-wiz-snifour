import { useEffect, useState } from 'react';
import axios from 'axios';

import { OverallBatterRank } from '@/features/common/types/batters';
import { API_URL } from '@/constants/api-url';
import { PlayerScatterChart } from '../common/PlayerScatterChart';
import { PlayerRankingTable } from '../common/PlayerRankingTable';
import { batterColumns } from '@/constants/player-rank-colums';

function AllBatterRankingTab() {
  const [ranking, setRanking] = useState<OverallBatterRank[]>([]);

  useEffect(() => {
    const getAllBatterRanking = async () => {
      try {
        const { data, status } = await axios.get(
          `${API_URL}/game/rank/total/batter?gyear=2024&pname&sortKey=HRA`
        );

        if (status === 200 && data) {
          setRanking(data.data.list || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllBatterRanking();
  }, []);

  return (
    <div className="flex flex-col">
      <PlayerScatterChart data={ranking} position="batter" />
      <PlayerRankingTable data={ranking} columns={batterColumns} />
    </div>
  );
}

export { AllBatterRankingTab };
