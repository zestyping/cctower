const DEFAULT_HOLD = 5;

var slides = [
  {
    hold: 1,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['FOR', 'CENTURIES']},
    media: {upper: lighthouseUpperVideo, lower: lighthouseLowerImage}
  },
  {
    hold: 1,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['THE GREAT', 'LIGHTHOUSE', 'AT', 'ALEXANDRIA']},
  },
  {
    hold: 1,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['LIT BY FIRE']},
  },
  {
    hold: 3,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['GUIDED', 'SHIPS', 'THROUGH', 'STORMS', 'TO SAFE', 'HARBOR']},
  },
  {
    hold: 3,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['TODAY,', 'WE FACE', 'THE', 'STORMS &', 'INJUSTICE', 'OF', 'CLIMATE', 'CHANGE']}
  },
  {
    hold: 2,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['WE MUST', 'SHARPLY', 'CHANGE', 'COURSE']},
  },
  {
    hold: 2,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['THE LIGHT', 'WE MUST', 'FOLLOW:']},
  },
  {
    hold: 4,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['SCIENCE', 'JUSTICE', 'ECOLOGICAL', 'WISDOM', '& A', 'COMMITMENT', 'TO REAL', 'SYSTEMIC', 'SOLUTIONS']}
  },
  {
    hold: 1,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['WE TOO', 'CAN', 'REACH', 'THE', 'SAFE', 'HARBOR']},
  },
  {
    hold: 2,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['OF A', 'JUST AND', 'LIVABLE', 'WORLD']},
  },
  {
    hold: 7,
    left: {theme: '', beats: []},
    right: {theme: '', beats: ['BUT', 'ONLY', 'IF', 'WE', '#ActInTime']},
  },

  {
    duration: 60,
    left: {theme: '', beats: []},
    right: {theme: '', beats: []},
    media: {upper: stripesUpperVideo, lower: stripesLowerVideo}
  },

  {
    duration: 10,
    left: {theme: 'red', beats: [repeatHashtag('#ClimateClock')]},
    right: {theme: 'blue', beats: [repeatHashtag('#ActInTime')]},
    media: {upper: clockVideo},
  },
  {
    left: {theme: 'red', beats: ['THE', 'SCIENCE', 'IS', 'CLEAR', pause]},
    right: {theme: 'blue', beats: ['OUR', 'CARBON', 'BUDGET', 'IS', 'RUNNING', 'OUT']}
  },
  {
    left: {theme: 'red', beats: ['WE', 'HAVE', 'LESS', 'THAN', '7', 'YEARS']},
    right: {theme: 'blue', beats: ['TO', 'PROTECT', 'OUR', 'PLANET', '&', 'PEOPLE']}
  },
  {
    left: {theme: 'red', beats: [delayDenial, pause]},
    right: {theme: 'blue', beats: ['WE MUST', 'END', 'FOSSIL', 'FUELS', 'BY', strike('2070'), pause, strike('2050'), pause, strike('2040'), pause, doubleRaise('2030')]}
  },
  {
    duration: 20,
    left: {theme: 'red', beats: [inverse('DEADLINE'), deadline, pause]},
    right: {theme: 'red', beats: ['THIS IS OUR', 'WINDOW OF', doubleRaise('HOPE'), spaceAfter(''), pause, 'LET\'S', '#ActInTime', 'TO STAY', 'BELOW', '1.5° C']}
  },
  {
    left: {theme: 'red', beats: ['THE', 'EARTH', 'HAS A', 'DEADLINE']},
    right: {theme: 'blue', beats: ['BUT', 'WE HAVE', 'MANY', 'LIFELINES']}
  },
  {
    left: {theme: 'red', beats: ['SYSTEMIC', 'SOLUTIONS', 'ARE', double('STILL'), 'WITHIN', 'REACH', pause]},
    right: {theme: 'blue', beats: ['WE CAN', 'BUILD A', 'JUST &', 'LIVABLE', 'WORLD']}
  },
  {
    left: {theme: 'red', beats: ['LEADERS', 'PRESIDENTS', 'MINISTERS', 'DELEGATES', 'BE', doubleRaise('BOLD!'), pause]},
    right: {theme: 'blue', beats: ['THE', 'FUTURE', 'IS', 'COUNTING', 'ON', doubleRaise('YOU')]}
  },
  {
    hold: 10,
    left: {theme: 'red', beats: ['THE EYES', 'OF THE', 'WORLD', 'ARE ON', 'COP27', pause]},
    right: {theme: 'blue', beats: ['NO MORE', strike('BLAH'), strike('BLAH'), strike('BLAH'), '', 'TIME FOR', pause, inverse('COURAGE'), pause, pause, inverse('JUSTICE'), pause, pause, inverse('SPEED')]}
  },
  {
    duration: 10,
    left: {theme: 'red', beats: [repeatHashtag('#ClimateClock')]},
    right: {theme: 'blue', beats: [repeatHashtag('#ActInTime')]}
  }
];

var loop = [
  {
    duration: 20,
    left: {theme: 'blue', beats: [inverse('LIFELINE'), renewables, 'OF WORLD\'S', 'ENERGY', 'COMES FROM', 'RENEWABLES', pause]},
    right: {theme: 'blue', beats: ['WE NEED', doubleLower('100%'), 'RENEWABLES', 'BEFORE', doubleRaise('2030'), spaceAfter(''), 'TO STAY', 'BELOW', '1.5° C']}
  },
  {
    hold: 10,
    left: {theme: 'blue', beats: [inverse('LIFELINE'), indigenousLand, 'INDIGENOUS', 'LAND', 'MUST BE', 'PROTECTED', pause]},
    right: {theme: 'blue', beats: ['INDIGENOUS', 'LANDS IN', 'INDIGENOUS', 'HANDS', 'IS A KEY', 'CLIMATE', spaceAfter('SOLUTION'), pause, '#LandBack']}
  },
  {
    duration: 20,
    left: {theme: 'blue', beats: [inverse('LIFELINE'), loss8, 'LOSS &', 'DAMAGE', 'OWED', 'BY G20', pause]},
    right: {theme: 'blue', beats: ['THE BIGGEST', 'POLLUTERS', 'MUST PAY', 'THOSE', 'MOST', 'IMPACTED']}
  },
  {
    duration: 30,
    left: {theme: 'red', beats: [inverse('DEADLINE'), deadline, pause]},
    right: {theme: 'red', beats: ['THIS IS OUR', 'WINDOW OF', doubleRaise('HOPE'), spaceAfter(''), pause, 'LET\'S', '#ActInTime', 'TO STAY', 'BELOW', '1.5° C']}
  }
];

for (var i = 0; i < 4; i++) {
  slides = slides.concat(loop);
}
