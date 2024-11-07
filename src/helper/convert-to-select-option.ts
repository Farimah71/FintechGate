export const convertToSelectOption = (data: any[], keys?: [string, string]) => {
  if (data.length) {
    const selectOptionData = data.map((item) => ({
      label: keys ? item[keys[0]] : item.title,
      value: keys ? item[keys[1]] : item.id,
    }));

    return selectOptionData;
  }
};
