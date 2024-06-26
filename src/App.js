import { useState, useEffect } from 'react';
import { getPublicData } from './service/api';
import {FaCarBurst } from 'react-icons/fa6';
import KaKaoMap from './components/KakaoMap';
import RechartLineBar from './components/RechartLineBar';
import RechartPie from './components/RechartPie';

const SIGNGUS = [
  {signguCode: "11110", city: "서울특별시", name: "종로구"},
  {signguCode: "11170", city: "서울특별시", name: "용산구"},
  {signguCode: "11440", city: "서울특별시", name: "마포구"},
  {signguCode: "11680", city: "서울특별시", name: "강남구"},
];

function App() {
  const [signgus, setSigngus] = useState("11110");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [accidents, setAccidents] = useState([]);
  const [selectedSignguName, setSelectedSignguName] = useState("서울특별시 종로구");

  const signguList = SIGNGUS.map(signgu => {
    return (
      <option key={signgu.signguCode} value={signgu.signguCode}>
        {signgu.city}
        {" "}
        {signgu.name}
      </option>
    );
  });


  async function fetchData() {

    try {
      setIsLoaded(false);
      setError(null);

      const data = await getPublicData(signgus);

      console.log(data);

      setAccidents(data.response.body.items.item);

    } catch (error) {
      setError(error)
    } finally {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    document.title = '이륜차 사고 다발 구역 조회';
  }, []);
  
  useEffect(() => {
    fetchData();
    const selectedSigngu = SIGNGUS.find(signgu => signgu.signguCode === signgus);
    setSelectedSignguName(selectedSigngu ? `${selectedSigngu.city} ${selectedSigngu.name}` : '선택된 항목 없음');
  }, [signgus]);

  if (!isLoaded) {
    return (
      <div>
        <div>잠시 기다려주세요</div>
      </div>
    )
  }

  return (
    <div className="App">
      <header className='top-0 z-2 border'>
        <div className='flex justify-between'>
          <div className='flex items-center m-3'>
            <FaCarBurst className='text-5xl text-gray-400'/>
            <h1 className='text-2xl text-gray-400 font-semibold px-1'>이륜차 사고 다발 구역 조회</h1>
          </div>

          <div className='flex items-center'>
            <select
              className='border rounded-full px-4 py-2 mx-5'
              value={signgus}
              onChange={({ target }) => setSigngus(target.value)}
            >
              {signguList}
            </select>
          </div>
        </div>
      </header>

      <KaKaoMap accidents={accidents}/>

      <div className='grid grid-cols-2 gap-4 p-4 border-2 bg-gray-50'>
        <div className='border shadow-lg bg-white'>
          <h3 className='text-center font-semibold text-lg mt-10'>사고 장소별 건수 그래프</h3>
          <RechartLineBar accidents={accidents} />
        </div>
        <div className='border shadow-lg bg-white'>
          <h3 className='text-center font-semibold text-lg mt-10'>사고 장소별 건수 비율</h3>
          <RechartPie accidents={accidents}/>
        </div>
      </div>

    </div>
  );
}

export default App;

