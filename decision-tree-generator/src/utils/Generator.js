import { Treant } from "treant-js";
import utilsCalcs from "./Calcs";

const ID3Generator = (
  columns,
  columnsTypes,
  mainColumn,
  data,
  dataMap,
  setTreeAccuracy
) => {
  let failedExamples = 0;

  const drawTree = (configJSON) => {
    Treant(configJSON);
  };

  const indexofAcolumn = (searchedColumn) => {
    return columns.findIndex((column) => column === searchedColumn);
  };

  const mainColumnIndex = indexofAcolumn(mainColumn);

  const maxElementIndex = (array) => {
    let res = 0,
      max = array[0];
    array.forEach((element, i) => {
      if (!max || element > max) {
        res = i;
        max = element;
      }
    });
    return res;
  };

  const generateTree = (freeColumns, conditionsMap) => {
    const filteredData = utilsCalcs.filterData(
      data,
      conditionsMap,
      columnsTypes
    );

    if (filteredData.length === 0) {
      return {
        text: { name: "Undefined" },
        HTMLclass: "undefined",
      };
    }

    const currentEntropy = utilsCalcs.entropyConditioned(
      filteredData,
      mainColumnIndex
    );

    if (currentEntropy === 0) {
      return {
        text: { name: filteredData[0][mainColumnIndex] },
        HTMLclass: "solution",
      };
    } else if (freeColumns.length === 0) {
      const maxAppearances = utilsCalcs.appearances(
        filteredData,
        mainColumnIndex
      );
      failedExamples += maxAppearances[1] * filteredData.length;
      return {
        text: {
          name: maxAppearances[0],
          title:
            Math.round((maxAppearances[1] * 100 + Number.EPSILON) * 100) / 100 +
            "%",
        },
        HTMLclass: "solution",
      };
    }

    const informationGain = [];
    const thresholds = [];

    const bestThreshold = (possibleThresholds, thresholds, columnIndex) => {
      let bestThreshold, bestEntropy;
      possibleThresholds.forEach((threshold) => {
        const lowerData = filteredData.filter(
          (data) => +data[columnIndex] <= threshold
        );
        const higherData = filteredData.filter(
          (data) => +data[columnIndex] > threshold
        );
        const entropyLower = utilsCalcs.entropyConditioned(
          lowerData,
          mainColumnIndex
        );
        const entropyHigher = utilsCalcs.entropyConditioned(
          higherData,
          mainColumnIndex
        );
        const thresHoldEntropy =
          (lowerData.length / filteredData.length) * entropyLower +
          higherData.length / filteredData.length +
          entropyHigher;
        if (!bestEntropy || thresHoldEntropy < bestEntropy) {
          bestEntropy = thresHoldEntropy;
          bestThreshold = threshold;
        }
      });
      thresholds[columnIndex] = bestThreshold;
      return currentEntropy - bestEntropy;
    };

    columns.forEach((column, i) => {
      if (i !== mainColumnIndex && freeColumns.includes(column)) {
        if (columnsTypes[i] === "discrete") {
          informationGain[i] = utilsCalcs.informationGain(
            i,
            mainColumnIndex,
            currentEntropy,
            filteredData
          );
        } else {
          const orderedData = [...filteredData].sort((a, b) => +a[i] - +b[i]);
          const possibleThresholds = [];
          let upperBound, bottomBound;
          for (let j = 1; j < orderedData.length; j++) {
            bottomBound = +orderedData[j - 1][i];
            upperBound = +orderedData[j][i];
            if (
              upperBound !== bottomBound &&
              orderedData[j - 1][mainColumnIndex] !==
                orderedData[j][mainColumnIndex]
            ) {
              possibleThresholds.push(
                (upperBound - bottomBound) / 2 + bottomBound
              );
            }
          }

          if (possibleThresholds.length > 0) {
            informationGain[i] = bestThreshold(
              possibleThresholds,
              thresholds,
              i
            );
          }
        }
      }
    });

    const anyFreeContinuousColumn = () => {
      let res = false;
      columns.forEach((column, i) => {
        if (freeColumns.includes(column) && columnsTypes[i] === "continuous") {
          res = true;
        }
      });
      return res;
    };

    if (thresholds.length === 0 && anyFreeContinuousColumn()) {
      const maxAppearances = utilsCalcs.appearances(
        filteredData,
        mainColumnIndex
      );
      failedExamples += maxAppearances[1] * filteredData.length;
      return {
        text: {
          name: maxAppearances[0],
          title:
            Math.round((maxAppearances[1] * 100 + Number.EPSILON) * 100) / 100 +
            "%",
        },
        HTMLclass: "solution",
      };
    }

    const bestColumnIndex = maxElementIndex(informationGain);
    const children = [];

    if (columnsTypes[bestColumnIndex] === "discrete") {
      Array.from(dataMap.get(columns[bestColumnIndex]).keys()).forEach(
        (key, i) => {
          children[i] = {
            text: { name: key },
            HTMLclass: "value",
            children: [
              generateTree(
                freeColumns.filter(
                  (column) => column !== columns[bestColumnIndex]
                ),
                new Map(conditionsMap).set(bestColumnIndex, key)
              ),
            ],
          };
        }
      );
    } else {
      children[0] = {
        text: {
          name: `<= ${
            Math.round((thresholds[bestColumnIndex] + Number.EPSILON) * 10000) /
            10000
          }`,
        },
        HTMLclass: "value",
        children: [
          generateTree(
            freeColumns.filter((column) => column !== columns[bestColumnIndex]),
            new Map(conditionsMap).set(bestColumnIndex, [
              "<=",
              thresholds[bestColumnIndex],
            ])
          ),
        ],
      };
      children[1] = {
        text: {
          name: `> ${
            Math.round((thresholds[bestColumnIndex] + Number.EPSILON) * 10000) /
            10000
          }`,
        },
        HTMLclass: "value",
        children: [
          generateTree(
            freeColumns.filter((column) => column !== columns[bestColumnIndex]),
            new Map(conditionsMap).set(bestColumnIndex, [
              ">",
              thresholds[bestColumnIndex],
            ])
          ),
        ],
      };
    }

    return {
      text: { name: columns[bestColumnIndex] },
      HTMLclass: "column",
      children: children,
    };
  };

  const tree_config = {
    chart: {
      container: "#tree",
      scrollbar: "fancy",
      connectors: {
        type: "curve",
        style: {
          "stroke-width": 2,
          stroke: "#000",
        },
      },
    },

    nodeStructure: generateTree(
      columns.filter((column) => column !== columns[mainColumnIndex]),
      new Map()
    ),
  };
  setTreeAccuracy(1 - failedExamples / data.length);
  drawTree(tree_config);
};

export default ID3Generator;
