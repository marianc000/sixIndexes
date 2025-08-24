import { subtractMonths, dateToYYYYMMDD } from "./dates.js";
import { dateToStr } from "./dates.js";

export function get(url) {
    return fetch(url).then(r => r.json());
}

function params2(symbols, fromdate, todate, netting) {
    return {
        "select": "ValorSymbol",
        "where": symbols.map(s => "ValorSymbol=" + s).join(' '),
        "columns": "Close,Date,High,Low,Millis,Open,Time",
        netting,
        fromdate,
        todate
    }
}

function params(symbols, months, netting) {
    const d = new Date();
    const d2 = subtractMonths(d, months);
    return new URLSearchParams(params2(symbols, dateToYYYYMMDD(d2), dateToYYYYMMDD(d), netting)).toString();
}

const msInHour = 60 * 60 * 1000;

function addDates(data) {

    const lastClose = data.Close.at(-1);

    return {
        dt: data.Millis.map(v => {
            const d = new Date(v + msInHour);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            return d;
        }),
        closeRelToLast: data.Close.map(v => v / lastClose)
    };
}

export function getUrl(symbols, months, netting) {
    return 'https://www.six-group.com/fqs/charts.json?' + params(symbols, months, netting);
}

function processResponse2({ ValorSymbol, data }) {
    return { ValorSymbol, data: addDates(data) };
}

export function processResponse(o) {
    const r = o.valors.sort((a, b) => a.ValorSymbol.localeCompare(b.ValorSymbol)).map(processResponse2);

    const rows = [['Date', ...r.map(o => o.ValorSymbol)]];
    const times = r[0].data.dt;

    times.forEach((d, i) => {
        r.forEach(o => {
            if (o.data.dt[i].getTime() !== d.getTime())
                throw 'not equal ' + ar[i].getTime() + ' ' + d.getTime();
        });

        rows.push([dateToStr(d), ...r.map(o => o.data.closeRelToLast[i])]);
    });

    console.log('r', rows)
    return rows;
}