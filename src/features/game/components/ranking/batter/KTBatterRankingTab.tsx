import { PlayerScatterChart } from '@/features/game/components/ranking';
import { batterColumns } from '@/constants/player-rank-colums';
// import { useBatterRank } from '@/assets/hooks/ranking/useBatterRank';
import SortableTable from '@/features/common/SortableTable';
import { ktBatter } from '@/assets/data/__test__/mockRanking.json';

function KTBatterRankingTab() {
  // const { ranking, loading, error } = useBatterRank('kt');

  // if (!ranking.length || loading) {
  //   return null;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  const ranking = ktBatter;

  return (
    <div>
      <PlayerScatterChart data={ranking} position="batter" />
      <SortableTable data={ranking} columns={batterColumns} domain="kt" />
    </div>
  );
}

export { KTBatterRankingTab };
