const numberExamples = (anyColumnMap) => {
  return Array.from(anyColumnMap.values()).reduce(
    (partialSum, num) => partialSum + num,
    0
  );
};

const mapFromArray = (array) => {
  const res = new Map();
  array.forEach((element) => {
    res.set(element, (res.get(element) || 0) + 1);
  });
  return res;
};

const filterData = (data, conditionsMap) => {
  let filteredData = data;

  if (conditionsMap && conditionsMap.size > 0) {
    for (const [key, value] of conditionsMap) {
      filteredData = filteredData.filter((element) => element[key] === value);
    }
  }

  return filteredData;
};

const appearances = (filteredData, searchedColumnIndex) => {
  let searchedColumnArray = [];
  filteredData.forEach((array) => {
    searchedColumnArray.push(array[searchedColumnIndex]);
  });
  const appearances = mapFromArray(searchedColumnArray);
  let maxKey,
    maxValue = 0;
  for (const [key, value] of appearances) {
    if (value > maxValue) {
      maxKey = key;
      maxValue = value;
    }
  }
  return [maxKey, maxValue / filteredData.length];
};

const entropyConditioned = (filteredData, searchedColumnIndex) => {
  let searchedColumnArray = [];
  filteredData.forEach((array) => {
    searchedColumnArray.push(array[searchedColumnIndex]);
  });
  return entropy(mapFromArray(searchedColumnArray));
};

const entropy = (searchedColumntMap) => {
  const examples = numberExamples(searchedColumntMap);
  return Array.from(searchedColumntMap.values()).reduce((partialCalc, num) => {
    return -(num / examples) * Math.log2(num / examples) + partialCalc;
  }, 0);
};

const informationGain = (
  searchedColumnIndex,
  mainColumnIndex,
  currentEntropy,
  filteredData
) => {
  let searchedColumnArray = [];
  filteredData.forEach((array) => {
    searchedColumnArray.push(array[searchedColumnIndex]);
  });
  let res = currentEntropy;
  const searchedColumnMap = mapFromArray(searchedColumnArray);

  let dataMap = new Map();
  const keys = Array.from(searchedColumnMap.keys());
  keys.forEach((key) => {
    dataMap.set(key, new Map());
  });
  filteredData.forEach((array) => {
    dataMap
      .get(array[searchedColumnIndex])
      .set(
        array[mainColumnIndex],
        (dataMap.get(array[searchedColumnIndex]).get(array[mainColumnIndex]) ||
          0) + 1
      );
  });

  keys.forEach((key) => {
    res -=
      (searchedColumnMap.get(key) / numberExamples(searchedColumnMap)) *
      entropy(dataMap.get(key));
  });

  return res;
};

const utilsCalcs = { filterData, appearances, entropyConditioned, informationGain };

export default utilsCalcs;
