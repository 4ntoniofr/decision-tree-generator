import { Treant } from "treant-js";
import utilsCalcs from "./Calcs";

const ID3Generator = (columns, mainColumn, data, dataMap, setTreeAccuracy) => {
  let failedExamples = 0;

  const drawTree = (configJSON) => {
    Treant(configJSON);
  };

  //setAppState("tree");
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
    const filteredData = utilsCalcs.filterData(data, conditionsMap);

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

    columns.forEach((column, i) => {
      if (i !== mainColumnIndex && freeColumns.includes(column)) {
        informationGain[i] = utilsCalcs.informationGain(
          i,
          mainColumnIndex,
          currentEntropy,
          filteredData
        );
      }
    });

    const bestColumnIndex = maxElementIndex(informationGain);

    const children = [];
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
