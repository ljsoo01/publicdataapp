import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KaKaoMap({ accidents }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  console.log(accidents);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        lat: parseFloat(accidents[0].centerY),
        lng: parseFloat(accidents[0].centerX),
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={5} // 지도의 확대 레벨
    >
      {accidents.map((accident, index) => (
        <MapMarker // 마커를 생성합니다
          key={index}
          position={{
            lat: accident.centerY,
            lng: accident.centerX
          }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35
            }, // 마커이미지의 크기입니다
          }}
          title={accident.freqocZoneNm}
          clickable={true}
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
        >
          {isOpen && 
            <div style={{ padding: "5px", color: "#000" }}>
              {accident.freqocZoneNm}
            </div>}
        </MapMarker>  
      ))}
    </Map>
  )

  return(
    <Map 
      id="map"
      center={{lat: accidents[0].centerX,
        lng: accidents[0].centerY}}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={5}
    >
      {/* {accidents.map((accident, index) => (
        <MapMarker
          key={index}
          position={{
            lat: accident.centerX, 
            lng: accident.centerY,
          }} // 마커를 표시할 위치
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35
            }, // 마커이미지의 크기입니다
          }}
          title={accident.freqocZoneNm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          onClick={(marker) => Map.panTo(marker.getPosition())}
          onMouseOver={() => setIsVisible(true)}
          onMouseOut={() => setIsVisible(false)}
        >
          
        </MapMarker>
      ))} */}

      
    </Map>
  )
}