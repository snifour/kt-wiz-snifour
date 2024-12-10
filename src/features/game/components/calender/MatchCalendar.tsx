import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { useMatchStore } from '@/store/useMatchStore';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  getAllMonthSchedule,
  getMonthSchedule,
} from '../../apis/matchSchedule';
import { CalenderBody, MatchCalendarCell } from './';

export interface GameSchedule {
  broadcast: string;
  displayDate: string;
  gameDate: string;
  gmkey: string;
  gtime: string;
  home: string;
  homeKey: string;
  homeLogo: string;
  homeScore: number;
  matchTeamCode: string;
  matchTeamName: string;
  outcome: string;
  stadium: string;
  stadiumKey: string;
  status: string;
  visit: string;
  visitKey: string;
  visitLogo: string;
  visitScore: number;
}

const GAME_TABS_CONFIG = [
  { value: 'ktWiz', label: 'KT Wiz 경기' },
  { value: 'allLeague', label: '전체 리그' },
];

const MatchCalendar = () => {
  const [ktMatchData, setKTMatchData] = useState<GameSchedule[]>();
  const [allMatchData, setAllMatchData] = useState<GameSchedule[]>();
  const { currentMonth } = useMatchStore();
  const [currentTab, setCurrentTab] = useState<'ktWiz' | 'allLeague'>('ktWiz');

  useEffect(() => {
    const fetchMatchSchedule = async () => {
      const yearMonth = format(currentMonth, 'yyyyMM');
      if (currentTab === 'ktWiz') {
        const data = await getMonthSchedule(yearMonth);
        setKTMatchData(data);
      } else if (currentTab === 'allLeague') {
        const data = await getAllMonthSchedule(yearMonth);
        setAllMatchData(data);
      }
    };
    fetchMatchSchedule();
  }, [currentMonth, currentTab]);

  const renderCellContent = (date: Date) => {
    const formattedDate = format(date, 'yyyyMMdd');
    const match = ktMatchData?.find(
      (item) => item.gameDate.toString() === formattedDate
    );
    const matches = allMatchData?.filter(
      (item) => item.gameDate.toString() === formattedDate
    );

    return (
      <MatchCalendarCell
        date={date}
        ktMatchData={match}
        allMatchData={matches || []}
        currentTab={currentTab}
      />
    );
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value as 'ktWiz' | 'allLeague');
  };

  return (
    <div className="w-full my-10">
      <Tabs
        className="media-container"
        defaultValue={currentTab}
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-5">
          {/* 탭 */}
          <TabsList className="media-tabs-list">
            {GAME_TABS_CONFIG.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() =>
                  handleTabChange(tab.value as 'ktWiz' | 'allLeague')
                }
                className="media-tabs-trigger px-6 py-2.5"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2">
            <span className="text-md px-3 py-2 rounded bg-wiz-red text-white">
              승
            </span>
            <span className="text-md px-3 py-2 rounded bg-gray-600 text-white">
              패
            </span>
            <span className="text-md px-3 py-2 rounded bg-gray-400 text-white">
              무
            </span>
          </div>
        </div>
        {/* 탭 컨텐츠 */}
        <TabsContent value="ktWiz">
          <CalenderBody renderCellContent={renderCellContent} />
        </TabsContent>
        <TabsContent value="allLeague">
          <CalenderBody renderCellContent={renderCellContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { MatchCalendar };
