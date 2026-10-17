// Japanese national holidays, including substitute and citizens' holidays.
// Rules: https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html
// Equinox dates after the published calendar are estimates; update for law changes.
// Supported years: 1948–2099. No network is needed, including when installed offline.
function japaneseHolidays(year) {
  const holidays = new Set();
  if(year < 1948 || year > 2099) return holidays;
  const key = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const add = (month, day) => holidays.add(key(new Date(year, month-1, day)));
  const monday = (month, nth) => 1 + (8-new Date(year, month-1, 1).getDay())%7 + 7*(nth-1);
  if(year >= 1949){
    add(1, 1);
    add(1, year >= 2000 ? monday(1, 2) : 15);
    if(year >= 1967) add(2, 11);
    if(year >= 2020) add(2, 23);
    const spring = year <= 1979 ? 20.8357 : 20.8431;
    add(3, Math.floor(spring + .242194*(year-1980) - Math.floor((year-1980)/4)));
    add(4, 29);
    add(5, 3);
    if(year >= 2007) add(5, 4);
    add(5, 5);
  }
  if(year >= 1996){
    if(year === 2020) add(7, 23);
    else if(year === 2021) add(7, 22);
    else add(7, year >= 2003 ? monday(7, 3) : 20);
  }
  if(year >= 2016) add(8, year === 2020 ? 10 : year === 2021 ? 8 : 11);
  if(year >= 1966) add(9, year >= 2003 ? monday(9, 3) : 15);
  const autumn = year <= 1979 ? 23.2588 : 23.2488;
  add(9, Math.floor(autumn + .242194*(year-1980) - Math.floor((year-1980)/4)));
  if(year >= 1966){
    if(year === 2020) add(7, 24);
    else if(year === 2021) add(7, 23);
    else add(10, year >= 2000 ? monday(10, 2) : 10);
  }
  add(11, 3);
  add(11, 23);
  if(year >= 1989 && year <= 2018) add(12, 23);
  const special = {
    1959: [[4,10]], 1989: [[2,24]], 1990: [[11,12]],
    1993: [[6,9]], 2019: [[5,1],[10,22]]
  };
  for(const [month, day] of special[year] || []) add(month, day);
  const nationalHolidays = new Set(holidays);
  if(year >= 1986){
    for(let date = new Date(year, 0, 2); date.getFullYear() === year; date.setDate(date.getDate()+1)){
      const before = new Date(year, date.getMonth(), date.getDate()-1);
      const after = new Date(year, date.getMonth(), date.getDate()+1);
      if(nationalHolidays.has(key(before)) && nationalHolidays.has(key(after))) holidays.add(key(date));
    }
  }
  if(year >= 1973){
    for(const holiday of nationalHolidays){
      const [y,m,d] = holiday.split('-').map(Number);
      const date = new Date(y,m-1,d);
      if(date.getDay() !== 0 || holiday < '1973-04-12') continue;
      date.setDate(date.getDate()+1);
      if(year >= 2007){
        while(holidays.has(key(date))) date.setDate(date.getDate()+1);
      }
      holidays.add(key(date));
    }
  }
  return holidays;
}
