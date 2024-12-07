import { Button } from '@/components/ui';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker, IconDropdown, IconLeft, IconRight } from 'react-day-picker';

type MatchInfo = {
  result: string;
  team: string;
  time: string;
  place: string;
  channel: string;
  logo: string;
};

const matchData: Record<string, MatchInfo> = {
  '2024-12-01': {
    result: '승',
    team: '엔씨 다이노스',
    time: '17:00',
    place: '수원',
    channel: 'SPO-T,MS-T,SS-T',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F173D58365036F0AA03',
  },
  '2024-12-06': {
    result: '패',
    team: 'LG 트윈스',
    time: '14:00',
    place: '잠실',
    channel: 'M-T',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F1424D544502DD27604',
  },
  '2024-12-08': {
    result: '승',
    team: 'LG 트윈스',
    time: '18:30',
    place: '수원',
    channel: 'K-2T',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F1424D544502DD27604',
  },
  '2024-12-10': {
    result: '무',
    team: '한화 이글스',
    time: '19:30',
    place: '문학경기장',
    channel: 'K-2T',
    logo: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F127E7F41502DCD4632',
  },
};

const MatchCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState('kt wiz 경기');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const getResultColor = (result: string) => {
    switch (result) {
      case '승':
        return 'bg-red-500';
      case '패':
        return 'bg-gray-600';
      case '무':
        return 'bg-gray-400';
      default:
        return '';
    }
  };

  const calendarHeader = ({ displayMonth }: { displayMonth: Date }) => {
    return (
      <div className="flex justify-center items-center gap-10 px-4 py-4 bg-[#35383e]">
        <button
          onClick={() => {
            setCurrentMonth(
              new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1)
            );
          }}
          type="button"
          className="flex items-center justify-center text-lg font-bold text-wiz-white bg-slate-500 w-10 h-10 rounded hover:bg-slate-400"
        >
          <IconLeft />
        </button>
        <div className="relative flex items-center">
          <span className="text-lg font-bold text-wiz-white">
            {format(displayMonth, 'yyyy년 MM월')}
          </span>
          {/* 드롭다운 버튼 */}
          <select
            value={format(displayMonth, 'yyyy-MM')}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              setCurrentMonth(new Date(Number(year), Number(month) - 1));
            }}
            className="absolute right-0 top-0 text-sm bg-transparent border-none outline-none cursor-pointer w-6 h-6 opacity-0"
          >
            {Array.from({ length: 16 }, (_, i) => {
              const month = new Date(2024, 6 + i);
              return (
                <option key={month.getTime()} value={format(month, 'yyyy-MM')}>
                  {format(month, 'yyyy년 MM월')}
                </option>
              );
            })}
          </select>
          <span className="cursor-pointer p-4 text-wiz-white">
            <IconDropdown className="w-3 h-3" />
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setCurrentMonth(
              new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1)
            );
          }}
          className="flex items-center justify-center text-lg font-bold text-wiz-white bg-slate-500 w-10 h-10 rounded hover:bg-slate-400"
        >
          <IconRight />
        </button>
        {/* <button
          type="button"
          className="absolute right-10 flex items-center justify-center text-xs text-slate-500 bg-slate-200 rounded hover:bg-slate-300 p-1"
          onClick={() => setCurrentMonth(new Date())}
        >
          오늘
        </button> */}
      </div>
    );
  };

  const renderCellContent = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const match = matchData[formattedDate];
    const day = date.getDay();

    return (
      <div
        className={`relative w-full h-full p-2 flex flex-col items-center justify-start gap-2 ${
          match?.place === '수원' ? 'bg-[#f5323250]' : ''
        }`}
      >
        {/* 날짜 */}
        <div
          className={`absolute top-2 right-2 text-sm font-bold ${
            day === 0
              ? 'text-red-500'
              : day === 6
                ? 'text-blue-500'
                : 'text-wiz-white'
          }`}
        >
          {format(date, 'd')}
        </div>
        {match && (
          <>
            {/* 경기 결과 */}
            <div
              className={`absolute top-2 left-2 text-xs text-white py-1 px-2 rounded ${getResultColor(
                match.result
              )}`}
            >
              {match.result}
            </div>
            {/* 팀 로고 */}
            <img src={match.logo} alt={match.team} className="w-14 h-14 my-6" />
            {/* 경기 정보 */}
            <span className="text-sm text-wiz-white">
              {match.time} {match.place}
            </span>
            <div className="text-gray-400">{match.channel}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full my-10">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center border-b pb-3 mb-5">
        <div className="flex gap-2">
          <Button
            className={`text-md px-4 py-2 rounded cursor-pointer border border-wiz-white ${
              selectedTab === 'kt wiz 경기'
                ? 'bg-wiz-red text-white hover:bg-wiz-red'
                : 'bg-transparent text-wiz-white hover:text-wiz-black hover:bg-wiz-white'
            }`}
            onClick={() => setSelectedTab('kt wiz 경기')}
          >
            kt wiz 경기
          </Button>
          <Button
            className={`text-md px-5 py-2 rounded cursor-pointer border border-wiz-white ${
              selectedTab === '전체 리그'
                ? 'bg-wiz-red text-white hover:bg-wiz-red'
                : 'bg-transparent text-wiz-white hover:text-wiz-black hover:bg-wiz-white'
            }`}
            onClick={() => setSelectedTab('전체 리그')}
          >
            전체 리그
          </Button>
        </div>
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
      {/* 캘린더 */}
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ko}
        className="border border-[#fefefe40] rounded-lg w-full max-w-full mx-auto"
        classNames={{
          table: 'w-full border-collapse',
          cell: 'h-[180px] w-[160px] text-center p-0 border border-[#fefefe40] relative',
          day: 'h-full w-full text-sm flex items-center justify-center relative',
        }}
        captionLayout="dropdown"
        defaultMonth={new Date()}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        fromMonth={new Date(2024, 6)}
        toMonth={new Date(2025, 9)}
        components={{
          Caption: calendarHeader,
          Head: () => (
            <thead>
              <tr className="bg-[#35383e]">
                {['일', '월', '화', '수', '목', '금', '토'].map(
                  (day, index) => (
                    <th
                      key={day}
                      className={`p-2 font-medium ${
                        index === 0
                          ? 'text-red-500'
                          : index === 6
                            ? 'text-blue-500'
                            : 'text-wiz-white'
                      }`}
                    >
                      {day}
                    </th>
                  )
                )}
              </tr>
            </thead>
          ),
          DayContent: ({ date }) => (
            <div
              className={`relative w-full h-full bg-[#35383e20] ${
                format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                  ? 'border-2 border-wiz-red'
                  : ''
              }`}
            >
              {renderCellContent(date)}
            </div>
          ),
        }}
      />
      <p className="mt-5 text-sm text-gray-500 text-right">
        * 경기 일정은 사정에 따라 변동될 수 있습니다.
      </p>
    </div>
  );
};

export default MatchCalendar;
