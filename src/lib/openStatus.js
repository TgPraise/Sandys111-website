// Parses the site.hours.schedule shape ({ days: "Monday – Thursday", time: "12:00 – 00:00" })
// and returns whether the venue is open right now. Handles overnight ranges
// (e.g. Friday 12:00 – 03:00, which crosses midnight into Saturday).

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function dayRangeToIndexes(daysStr) {
  // "Monday – Thursday" -> [1,2,3,4]; "Sunday" -> [0]
  const parts = daysStr.split(/[–-]/).map((s) => s.trim());
  const start = DAY_NAMES.indexOf(parts[0]);
  const end = parts[1] ? DAY_NAMES.indexOf(parts[1]) : start;
  const out = [];
  let i = start;
  while (true) {
    out.push(i);
    if (i === end) break;
    i = (i + 1) % 7;
  }
  return out;
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getOpenStatus(schedule, now = new Date()) {
  const day = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  for (const entry of schedule) {
    const days = dayRangeToIndexes(entry.days);
    const [openStr, closeStr] = entry.time.split(/[–-]/).map((s) => s.trim());
    const openMin = toMinutes(openStr);
    let closeMin = toMinutes(closeStr);
    const overnight = closeMin <= openMin; // e.g. 12:00 -> 00:00/03:00

    if (overnight) closeMin += 24 * 60;

    // Check "today" window
    if (days.includes(day) && minutesNow >= openMin) {
      const nowAdjusted = minutesNow;
      if (nowAdjusted < closeMin) return { open: true, closesAt: closeStr };
    }

    // Check spillover from yesterday's overnight window
    const yesterday = (day + 6) % 7;
    if (overnight && days.includes(yesterday) && minutesNow + 24 * 60 < closeMin) {
      return { open: true, closesAt: closeStr };
    }
  }

  return { open: false, closesAt: null };
}
