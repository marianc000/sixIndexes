export function pad2(n) {
    return String(n).padStart(2, '0');
}

export function dateToYYYYMMDD(d) {
    let year = d.getFullYear(),
        month = pad2(d.getMonth() + 1),
        day = pad2(d.getDate());

    return [year, month, day].join('');
}

export function subtractMonths(d, m) {
    var d2 = new Date(d);
    d2.setMonth(d2.getMonth() - m);
    return d2
}

export function fromYYYYMMDD(str) {
    function num(s, e) {
        return parseInt(str.toString().substring(s, e));
    }

    let year = num(0, 4),
        month = num(4, 6) - 1,
        day = num(6);
    return new Date(year, month, day);
}

export function dateToStr(ms) {

    const d = new Date(ms);

    let year = d.getFullYear(),
        month = pad2(d.getMonth() + 1),
        day = pad2(d.getDate()),
        hours = pad2(d.getHours()),
        mins = pad2(d.getMinutes()),
        secs = pad2(d.getSeconds());

    return [year, month, day].join('-') + ' ' + [hours, mins].join(':');
}