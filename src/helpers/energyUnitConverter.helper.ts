function convertEnergyUnit(valueNum: number) {
  if (!valueNum) return 0;
  if (valueNum >= 1000000) {
    return (valueNum / 1000000).toFixed(2) + " GWh";
  } else if (valueNum >= 1000) {
    return (valueNum / 1000).toFixed(2) + " MWh";
  } else {
    return valueNum.toFixed(2) + " kWh";
  }
}

function convertEnergyValue(valueNum: number) {
  const absValue = Math.abs(valueNum);

  if (absValue >= 1000000) {
    return (valueNum / 1000000);
  } else if (absValue >= 1000) {
    return (valueNum / 1000);
  } else {
    return valueNum;
  }
}

function getEnergyUnit(valueNum: number) {
  const absValue = Math.abs(valueNum)
  if (absValue >= 1000000) {
    return " GWh";
  } else if (absValue >= 1000) {
    return " MWh";
  } else {
    return " kWh";
  }
}
export { convertEnergyUnit, convertEnergyValue, getEnergyUnit };