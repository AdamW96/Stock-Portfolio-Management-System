import stockService from "../services/stock-service";

const createData = (
  symbol,
  company,
  price,
  change,
  changePercentage,
  stockId
) => {
  return { symbol, company, price, change, changePercentage, stockId };
};
const createAbout = (ABOUT, CEO, FOUNDED, HEADQUARTERS, WEBSITE, EMPLOYEES) => {
  return { ABOUT, CEO, FOUNDED, HEADQUARTERS, WEBSITE, EMPLOYEES };
};

let gainers = [];
let losers = [];
function saveAllStocks() {
  stockService.getAllStock().then((response) => {
    console.log(response);
    window.allStocks = response.data.data;
    console.log(window.allStocks);
    gainers = [
      createData(
        `${window.allStocks[9].symbol}`,
        `${window.allStocks[9].enname}`,
        "0.27",
        "5.88",
        "5.88%",
        `${window.allStocks[9].sid}`
      ),
      createData(
        `${window.allStocks[15].symbol}`,
        `${window.allStocks[15].enname}`,
        "13.47",
        "+2.12",
        "4.68%",
        `${window.allStocks[15].sid}`
      ),
      createData(
        `${window.allStocks[16].symbol}`,
        `${window.allStocks[16].enname}`,
        "0.27",
        "5.88",
        "5.88%",
        `${window.allStocks[16].sid}`
      ),
      createData(
        `${window.allStocks[20].symbol}`,
        `${window.allStocks[20].enname}`,
        "13.47",
        "+2.12",
        "4.68%",
        `${window.allStocks[20].sid}`
      ),
      createData(
        `${window.allStocks[50].symbol}`,
        `${window.allStocks[50].enname}`,
        "9.72",
        "+5.88",
        "4.26%",
        `${window.allStocks[50].sid}`
      ),
    ];
    losers = [
      createData(
        `${window.allStocks[100].symbol}`,
        `${window.allStocks[100].enname}`,
        "$0.27",
        "-8.43",
        "3.13%",
        `${window.allStocks[100].sid}`
      ),
      createData(
        `${window.allStocks[105].symbol}`,
        `${window.allStocks[105].enname}`,
        "$13.47",
        "-2.12",
        "2.68%",
        `${window.allStocks[105].sid}`
      ),
      createData(
        `${window.allStocks[180].symbol}`,
        `${window.allStocks[180].enname}`,
        "$0.27",
        "-8.43",
        "3.13%",
        `${window.allStocks[180].sid}`
      ),
      createData(
        `${window.allStocks[190].symbol}`,
        `${window.allStocks[190].enname}`,
        "$13.47",
        "-2.12",
        "2.68%",
        `${window.allStocks[190].sid}`
      ),
      createData(
        `${window.allStocks[200].symbol}`,
        `${window.allStocks[200].enname}`,
        "$9.72",
        "-0.87",
        "1.89%",
        `${window.allStocks[200].sid}`
      ),
    ];
  });
}
saveAllStocks();

let randoms = [
  createData("NS8U", "Hutchison Port Hldg Trust", "$0.27", "-8.43", "3.13%"),
  createData("J91U", "ESR-REIT", "$13.47", "-2.12", "2.68%"),
  createData("K17", "Sinarmas Land Ltd", "$0.27", "5.88", "5.88%"),
  createData("UD2", "Japfa Ltd", "$13.47", "+2.12", "4.68%"),
  createData("E5H", "Golden Agri-Resources Ltd", "$9.72", "-0.87", "1.89%"),
  createData(
    "B24",
    "City Developments Limited Fully Paid Ord. Shrs",
    "$9.72",
    "+5.88",
    "4.26%"
  ),
];

let randoms2 = [
  createData("UD2", "Japfa Ltd", "$13.47", "+2.12", "4.68%"),
  createData(
    "D12",
    "City Developments Limited Fully Paid Ord. Shrs",
    "$9.72",
    "+5.88",
    "4.26%"
  ),
  createData("A27", "Golden Ltd", "$0.27", "5.88", "5.88%"),
  createData("A26", "ESR-REIT", "$0.27", "5.88", "5.88%"),
  createData("UD3", "Japfa Ltd", "$13.47", "+2.12", "4.68%"),
  createData("C09", "Sinarmas Land Ltd", "$9.72", "+5.88", "4.26%"),
];

let about = {
  ABOUT:
    "The Oversea-Chinese Banking Corporation Limited or OCBC Bank is a Singaporean multinational banking and financial services corporation headquartered in OCBC Centre, Raffles Place, Singapore. OCBC Bank was born out of the Great Depression through the consolidation of three banks in 1932 - the Chinese Commercial Bank Limited, the Ho Hong Bank Limited and the Oversea-Chinese Bank Limited. OCBC Bank has assets of more than S$521.3 billion, making it the second largest bank in Southeast Asia by assets after DBS Bank and ahead of United Overseas Bank, which are also headquartered in Singapore. It is also one of the world’s most highly-rated banks, with an Aa1 rating from Moody’s and AA- rating from Standard & Poor's. OCBC Bank is consistently ranked amongst the top 5 safest banks in the world by Global Finance Magazine. The Asian Banker named OCBC Bank Singapore's strongest bank for 2018-2019, and the 5th strongest in Asia-Pacific. The bank's global network has grown to comprise more than 570 branches and representative offices in 18 countries and regions. ",
  CEO: "Helen Wong",
  FOUNDED: "31 Oct 1932",
  HEADQUARTERS: "Singapore",
  WEBSITE: "ocbc.com",
  EMPLOYEES: "30,619",
};

let a = [
  createAbout(
    "The Oversea-Chinese Banking Corporation Limited or OCBC Bank is a Singaporean multinational banking and financial services corporation headquartered in OCBC Centre, Raffles Place, Singapore. OCBC Bank was born out of the Great Depression through the consolidation of three banks in 1932 - the Chinese Commercial Bank Limited, the Ho Hong Bank Limited and the Oversea-Chinese Bank Limited. OCBC Bank has assets of more than S$521.3 billion, making it the second largest bank in Southeast Asia by assets after DBS Bank and ahead of United Overseas Bank, which are also headquartered in Singapore. It is also one of the world’s most highly-rated banks, with an Aa1 rating from Moody’s and AA- rating from Standard & Poor's. OCBC Bank is consistently ranked amongst the top 5 safest banks in the world by Global Finance Magazine. The Asian Banker named OCBC Bank Singapore's strongest bank for 2018-2019, and the 5th strongest in Asia-Pacific. The bank's global network has grown to comprise more than 570 branches and representative offices in 18 countries and regions. ",
    "Helen Wong",
    "31 Oct 1932",
    "ocbc.com",
    "30,619"
  ),
];

export { gainers, losers, randoms, randoms2, about };
