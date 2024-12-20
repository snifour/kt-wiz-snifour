import { pitchingRecordColumns } from '@/constants/pitching-record-columns';
import DataTable from '@/features/common/DataTable';
import type { Pitcher } from '../../types/BoxScoreData';

interface PitchingRecordTableProps {
  data: Pitcher[] | undefined;
}

const PitchingRecordTable = ({ data = [] }: PitchingRecordTableProps) => {
  return <DataTable data={data} columns={pitchingRecordColumns} domain="kt" />;
};

export { PitchingRecordTable };
