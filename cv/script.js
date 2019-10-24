const getDurationText = (start = '1221-12-21') => {
  var startDate = moment(start, 'YYYY-MM-DD', true);

  years = moment().diff(startDate, 'years', true);
  months = moment().diff(startDate, 'months', true);

  yearsOnly = Math.floor(years);
  monthsOnly = Math.round(months - yearsOnly * 12);

  if (monthsOnly === 12) {
    yearsOnly += 1;
    monthsOnly = 0;
  }

  text = ' ';
  if (yearsOnly > 0 || monthsOnly > 0) {
    text += '(';
    if (yearsOnly) {
      text += String(yearsOnly);
      text += ' ';
      text += 'year';
      if (yearsOnly > 1) {
        text += 's';
      }
    }
    if (monthsOnly) {
      text = text.length > 2 ? (text += ' ') : text;
      text += String(monthsOnly);
      text += ' ';
      text += 'month';
      if (monthsOnly > 1) {
        text += 's';
      }
    }
    text += ')';
  }
  return text;
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const currentTasks = document.querySelectorAll('span.current[data-begin]');
    for (let i = 0; i < currentTasks.length; i++) {
      const el = currentTasks[i];
      const startDate = el.getAttribute('data-begin');
      const duration = getDurationText(startDate);
      el.innerHTML = duration;
    }
  },
  false
);
