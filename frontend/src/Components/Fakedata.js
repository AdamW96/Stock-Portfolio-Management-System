const createData = (symbol, company, price, change, changePercentage) => {
  return { symbol, company, price, change, changePercentage };
}
const gainers = [
  createData('A26','Sinarmas Land Ltd', '$0.27', '5.88', '5.88%'),
  createData('UD3','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('A27','Sinarmas Land Ltd', '$0.27', '5.88', '5.88%'),
  createData('UD2','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('C09','City Developments Limited Fully Paid Ord. Shrs', '$9.72', '+5.88', '4.26%'),
];
const losers = [
  createData('NS8U','Hutchison Port Hldg Trust', '$0.27', '-8.43', '3.13%'),
  createData('J91U','ESR-REIT', '$13.47', '-2.12', '2.68%'),
  createData('NS9U','Hutchison Port Hldg Trust', '$0.27', '-8.43', '3.13%'),
  createData('J92U','ESR-REIT', '$13.47', '-2.12', '2.68%'),
  createData('E5H','Golden Agri-Resources Ltd', '$9.72', '-0.87', '1.89%'),
];

const randoms = [
  createData('NS8U','Hutchison Port Hldg Trust', '$0.27', '-8.43', '3.13%'),
  createData('J91U','ESR-REIT', '$13.47', '-2.12', '2.68%'),
  createData('K17','Sinarmas Land Ltd', '$0.27', '5.88', '5.88%'),
  createData('UD2','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('E5H','Golden Agri-Resources Ltd', '$9.72', '-0.87', '1.89%'),
  createData('B24','City Developments Limited Fully Paid Ord. Shrs', '$9.72', '+5.88', '4.26%'),
]


const randoms2 = [
  createData('UD2','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('D12','City Developments Limited Fully Paid Ord. Shrs', '$9.72', '+5.88', '4.26%'),
  createData('A27','Golden Ltd', '$0.27', '5.88', '5.88%'),
  createData('A26','ESR-REIT', '$0.27', '5.88', '5.88%'),
  createData('UD3','Japfa Ltd', '$13.47', '+2.12', '4.68%'),
  createData('C09','Sinarmas Land Ltd', '$9.72', '+5.88', '4.26%'),
]



export {gainers,losers,randoms,randoms2}