var clockVideo = $('video#clock');
var stripesUpperVideo = $('video#stripes-upper');
var stripesLowerVideo = $('video#stripes-lower');
var lighthouseUpperVideo = $('video#lighthouse-upper');
var lighthouseLowerVideo = $('video#lighthouse-lower');

var deadlineWidget = $('#deadline-widget');
var deadlineNumYears = $('#num-years');
var deadlineDays = [$('#days-1'), $('#days-10'), $('#days-100')];
var deadlineLabelDays = $('#label-days');
var deadlineHours = [$('#hours-1'), $('#hours-10')];
var deadlineLabelHours = $('#label-hours');
var deadlineMinutes = [$('#minutes-1'), $('#minutes-10')];
var deadlineSeconds = [$('#seconds-1'), $('#seconds-10')];

var renewablesWidget = $('#renewables-widget');
var renewablesWholePart = [$('#renewables-1'), $('#renewables-10')];
var renewablesFractionalPart = [
  $('#renewables-0000000001'),
  $('#renewables-000000001'),
  $('#renewables-00000001'),
  $('#renewables-0000001'),
  $('#renewables-000001'),
  $('#renewables-00001'),
  $('#renewables-0001'),
  $('#renewables-001'),
  $('#renewables-01'),
];

var indigenousLandWidget = $('#indigenous-land-widget');

var lossDamageWidget = $('#loss-damage-widget');
var lossDamageWholePart = [$('#loss-1'), $('#loss-10')];
var lossDamageFractionalPart = [
  $('#loss-0000000000001'),
  $('#loss-000000000001'),
  $('#loss-00000000001'),
  $('#loss-0000000001'),
  $('#loss-000000001'),
  $('#loss-00000001'),
  $('#loss-0000001'),
  $('#loss-000001'),
  $('#loss-00001'),
  $('#loss-0001'),
  $('#loss-001'),
  $('#loss-01'),
];

var hundredPercentWidget = $('#hundred-percent-widget');

function setDigits(value, elements) {
  for (var element of elements) {
    element.text(value % 10);
    value = Math.floor(value / 10);
  }
}

const DEADLINE = luxon.DateTime.fromISO('2029-07-22T16:00:00Z');

function deadline(row) {
  if (row.children().length == 0) {
    row.append(deadlineWidget);
  }
  var now = luxon.DateTime.utc();
  var nextAnniversary = DEADLINE.set({year: now.year});
  if (nextAnniversary < now) {
    nextAnniversary = DEADLINE.set({year: now.year + 1});
  }
  var years = DEADLINE.year - nextAnniversary.year;
  var t = nextAnniversary.toMillis() - now.toMillis();
  t = Math.floor(t / 1000);
  var s = t % 60;
  t = Math.floor(t / 60);
  var m = t % 60;
  t = Math.floor(t / 60);
  var h = t % 24;
  var d = Math.floor(t / 24);

  deadlineNumYears.text(years);
  setDigits(d, deadlineDays);
  deadlineLabelDays.text((d == 1) ? 'DAY' : 'DAYS');
  setDigits(h, deadlineHours);
  deadlineLabelHours.text((h == 1) ? 'HR' : 'HRS');
  setDigits(m, deadlineMinutes);
  setDigits(s, deadlineSeconds);
}

function linearGrowth(spec) {
  var elapsed = BigInt(Date.now() - spec.refMillis);
  var value = spec.initial + spec.rate * elapsed / 1000n + spec.bias;
  var strValue = '0'.repeat(spec.shift) + String(value);
  var wholePart = strValue.substr(0, strValue.length - spec.shift);
  var fractionalPart = strValue.substr(-spec.shift).substr(0, spec.decimals);
  return wholePart.replace(/^0+/, '') + '.' + fractionalPart;
}

var RENEWABLES = {
  refMillis: luxon.DateTime.fromISO('2020-01-01T00:00:00Z').toMillis(),

  initial: 11400000000000000000000000n,
  rate: 20428359571070087n,

  decimals: 9,
  shift: 24
};
RENEWABLES.bias = 5n * 10n**BigInt(RENEWABLES.shift - RENEWABLES.decimals - 1);

function renewables(row) {
  if (row.children().length == 0) {
    row.append(renewablesWidget);
  }
  var value = linearGrowth(RENEWABLES);
  var [whole, fractional] = value.split('.');
  setDigits(whole - 0, renewablesWholePart);
  setDigits(fractional - 0, renewablesFractionalPart);
}

function indigenousLand(row) {
  if (row.children().length == 0) {
    row.append(indigenousLandWidget);
  }
}

var LOSS_DAMAGE = {
  refMillis: luxon.DateTime.fromISO('2020-01-01T00:00:00Z').toMillis(),

  initial: 297540000000000000000000n,
  rate: 471408520521309n,

  decimals: 12,
  shift: 22
};
LOSS_DAMAGE.bias = 5n * 10n**BigInt(LOSS_DAMAGE.shift - LOSS_DAMAGE.decimals - 1);

function lossDamage(row) {
  if (row.children().length == 0) {
    row.append(lossDamageWidget);
  }
  var value = linearGrowth(LOSS_DAMAGE);
  var [whole, fractional] = value.split('.');
  setDigits(whole - 0, lossDamageWholePart);
  setDigits(fractional - 0, lossDamageFractionalPart);
}

function hundredPercent(row) {
  if (row.children().length == 0) {
    row.append(hundredPercentWidget);
  }
}

function small(text) {
  return (row) => {
    row.text(text);
    row.addClass('small');
  };
}

function large(text) {
  return (row) => {
    row.text(text);
    row.addClass('large');
  };
}

function larger(text) {
  return (row) => {
    row.text(text);
    row.addClass('larger');
  };
}

function double(text) {
  return (row) => {
    row.text(text);
    row.addClass('double');
  };
}

function spaceAfter(text) {
  return (row) => {
    row.text(text);
    row.addClass('space-after');
  };
}

function inverted(text) {
  return (row) => {
    row.text(text);
    row.addClass('inverted');
  };
}

function pause(row) {
  row.addClass('omitted');
}

function strike(text) {
  return (row) => {
    if (row.children().length == 0) {
      var span = $('<span>');
      span.addClass('struck');
      span.text(text);
      var striker = $('<div>');
      striker.addClass('striker');

      row.append(span);
      span.append(striker);
    }
  };
}
