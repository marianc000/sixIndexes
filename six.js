import { getUrl, processResponse, get } from "./request.js";
import { symbols } from "./constants.js";

export function sixData(months) {
  console.log(months);

  let netting = 60;

  months = parseInt(months) || 1;

  if (months > 3) netting *= 24;

  return getData(symbols, months, netting);

}

async function getData(symbols, months, netting) {
  const url = getUrl(symbols, months, netting);
  return processResponse(await get(url));
}