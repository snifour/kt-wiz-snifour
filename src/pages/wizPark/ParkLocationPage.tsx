import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import Breadcrumb from '@/features/common/Breadcrumb';
import WizParkMap from '@/features/home/components/WizParkMap';
import { ArrowBigRightIcon } from 'lucide-react';

function ParkLocationPage() {
  return (
    <div className="flex flex-col items-center gap-10 my-20 mx-20 bg-wiz-black text-wiz-white">
      <Breadcrumb
        paths={[
          { key: 'home', label: 'Home' },
          { key: 'wizpark', label: 'Wiz Park' },
          { key: 'wizpark-road', label: '찾아오기', isActive: true },
        ]}
      />
      <WizParkMap />
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">
          경기도 수원시 장안구 경수대로 893(조원동) 수원 케이티 위즈 파크
        </p>
        <p>(구 : 경기도 수원시 장안구 조원동 775)</p>
        <Button className="bg-wiz-red rounded-xl h-7 mt-3">
          <a
            href="https://map.kakao.com/link/to/수원 KT 위즈파크,37.299759,127.009781"
            target="_blank"
            rel="noreferrer"
          >
            <span>빠른길찾기</span>
          </a>
        </Button>
      </div>
      <div className="flex gap-5">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>버스 이용 시</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>
                <Button className="bg-green-500 h-4 border-none rounded-xl hover:bg-green-500">
                  일반
                </Button>{' '}
                25, 25-2, 27, 36, 55, 62-1, 99, 99-2, 300-1
              </li>
              <li>
                <Button className="bg-green-500 h-4 border-none rounded-xl hover:bg-green-500">
                  일반
                </Button>{' '}
                310, 777
              </li>
              <li>
                <Button className="bg-wiz-red h-4 border-none rounded-xl hover:bg-wiz-red">
                  직행
                </Button>{' '}
                2007, 3000, 7770
              </li>
              <li>
                <Button className="bg-blue-700 h-4 border-none rounded-xl hover:bg-blue-700">
                  좌석
                </Button>{' '}
                300, 900
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>지하철 이용시</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-medium bg-wiz-red rounded-lg">
              화서역 하차
            </h1>
            <ul className="mt-3">
              <li className="flex">
                <ArrowBigRightIcon />
                택시로 10분
              </li>
              <li className="flex">
                <ArrowBigRightIcon />
                37, 39번 버스이용: 수성중 사거리 하차 후 도보 3분
              </li>
              <li className="flex">
                <ArrowBigRightIcon />
                55분 버스이용 종합운동장 하차 수원역하차 (택시로 20분)
              </li>
              <li className="flex">
                <ArrowBigRightIcon />
                1번, 5번, 8번 버스이용: 수성중 사거리 하차 후 도보 3분
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ParkLocationPage;
