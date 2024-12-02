import Breadcrumb from '@/features/common/Breadcrumb';
import SubTitle from '@/features/common/SubTitle';
import { IconLeft, IconRight } from 'react-day-picker';
import {
  BattingRecordTable,
  KeyRecordsTable,
  MatchScoreTable,
  PitchingRecordTable,
} from './table';
import { mockMatchData } from './table/MatchScoreTable';

const BoxScoreTab = () => {
  return (
    <div className="w-full flex justify-center my-20">
      <div className="max-w-[1200px] w-full flex flex-col justify-center items-center">
        {/* 경로 */}
        <Breadcrumb
          paths={[
            { key: 'home', label: 'Home' },
            { key: 'game', label: 'Game' },
            { key: 'regular-season', label: '정규리그' },
            { key: 'box-score', label: '박스 스코어', isActive: true },
          ]}
        />

        {/* 경기 스코어 테이블 */}
        <div className="w-full flex items-center justify-between border border-slate-200 px-8 py-6 gap-8">
          {/* team1 */}
          <div className="flex flex-col gap-1">
            <img
              src={mockMatchData[0].team1_logo}
              alt="team logo"
              className="w-20 h-20"
            />
            <p className="text-center text-2xl font-semibold">
              {mockMatchData[0].team1_result}
            </p>
            <p className="text-center text-sm">
              {mockMatchData[0].team1}({mockMatchData[0].team1_betel})
            </p>
          </div>
          {/* 날짜 헤더 */}
          <div>
            <div>
              <div className="flex justify-center items-center gap-10 px-4 py-4">
                <button
                  onClick={() => console.log('TODO')}
                  type="button"
                  className="flex items-center justify-center text-lg font-semibold text-white bg-slate-400 w-10 h-10 rounded hover:bg-slate-500"
                >
                  <IconLeft />
                </button>
                <div className="relative flex flex-col items-center gap-1">
                  <span className="text-2xl font-semibold">
                    {mockMatchData[0].match_date}
                  </span>
                  <span className="text-center text-slate-500">
                    {mockMatchData[0].match_time} | 관중:
                    {mockMatchData[0].audience}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => console.log('TODO')}
                  className="flex items-center justify-center text-lg font-bold text-white bg-slate-400 w-10 h-10 rounded hover:bg-slate-500"
                >
                  <IconRight />
                </button>
              </div>
            </div>
            <MatchScoreTable />
          </div>
          {/* team2 */}
          <div className="flex flex-col gap-1">
            <img
              src={mockMatchData[0].team2_logo}
              alt="team logo"
              className="w-20 h-20"
            />
            <p className="text-center text-2xl font-semibold">
              {mockMatchData[0].team2_result}
            </p>
            <p className="text-center text-sm">
              {mockMatchData[0].team2}({mockMatchData[0].team2_betel})
            </p>
          </div>
        </div>

        {/* 주요 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <SubTitle title="주요 기록" />
          <div className="w-full">
            <KeyRecordsTable />
          </div>
        </div>
        {/* team1 타자 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle title={`${mockMatchData[0].team1} 타자 기록`} />
            <div className="w-full">
              <BattingRecordTable />
            </div>
          </div>
        </div>
        {/* team2 타자 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle title={`${mockMatchData[0].team2} 타자 기록`} />
            <div className="w-full">
              <BattingRecordTable />
            </div>
          </div>
        </div>
        {/* team1 투수 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle title={`${mockMatchData[0].team1} 투수 기록`} />
            <div className="w-full">
              <PitchingRecordTable />
            </div>
          </div>
        </div>
        {/* team2 투수 기록 */}
        <div className="flex flex-col gap-2 w-full my-10">
          <div className="flex flex-col gap-2">
            <SubTitle title={`${mockMatchData[0].team2} 투수 기록`} />
            <div className="w-full">
              <PitchingRecordTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxScoreTab;
