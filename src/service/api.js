export async function getPublicData(signguCode) {

  const CODES = [
    {signguCode: "11110"},
    {signguCode: "11170"},
    {signguCode: "11440"},
    {signguCode: "11680"},
  ];

  let url = "https://apis.data.go.kr/B552468/acdntFreqocZone/getAcdntFreqocZone";

  url += "?serviceKey=8MdmqT%2FrOcU6D4yvSg0C%2BJM1peRCog40X%2Fa30aIJ4YCPOEO5VfPhX112ph630L63jSNMPTFuiPWBrs2ctY5eMA%3D%3D";
  url += "&pageNo=1"; // 첫번째 페이지의 데이터를 가져옴
  url += "&numOfRows=10"; // 한 페이지에 10개의 결과를 요청
  url += "&dataType=json"; // 데이터를 JSON 형식으로 요청
  url += "&signguCode=" + signguCode;

  const res = await fetch(url, {});

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}