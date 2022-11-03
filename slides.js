const DEFAULT_HOLD = 5;

var slides = [
  {
    duration: 60,
    left: {theme: '', beats: []},
    right: {theme: '', beats: []},
    video: {upper: lighthouseUpperVideo, lower: lighthouseLowerVideo}
  },

  {
    duration: 60,
    left: {theme: '', beats: []},
    right: {theme: '', beats: []},
    video: {upper: stripesUpperVideo, lower: stripesLowerVideo}
  },

  {
    duration: 10,
    left: {theme: 'red', beats: [small('#ClimateClock')]},
    right: {theme: 'blue', beats: [small('#ActInTime')]},
    video: {upper: clockVideo},
  },
  {
    left: {theme: 'red', beats: ['THE', 'SCIENCE', 'IS', 'CLEAR', pause]},
    right: {theme: 'blue', beats: ['OUR', 'CARBON', 'BUDGET', 'IS', 'RUNNING', 'OUT']}
  },
  {
    left: {theme: 'red', beats: ['WE', 'HAVE', 'LESS', 'THAN', '7', 'YEARS']},
    right: {theme: 'blue', beats: ['TO', 'PROTECT', 'OUR PLANET', '& PEOPLE']}
  },
  {
    left: {theme: 'red', beats: [larger('DELAY'), larger('='), larger('DENIAL'), pause]},
    right: {theme: 'blue', beats: ['WE MUST', 'END', 'FOSSIL', 'FUELS', 'BY', strike('2070'), pause, strike('2050'), pause, strike('2040'), pause, double('2030')]}
  },
  {
    duration: 20,
    left: {theme: 'red', beats: [inverse('DEADLINE'), deadline, pause]},
    right: {theme: 'red', beats: ['OUR', 'WINDOW', 'OF', double('HOPE'), spaceAfter(''), pause, 'LET\'S', '#ActInTime', 'TO STAY', 'BELOW', '1.5° C']}
  },
  {
    left: {theme: 'red', beats: ['THE', 'EARTH', 'HAS A', 'DEADLINE']},
    right: {theme: 'blue', beats: ['BUT', 'WE HAVE', 'MANY', 'LIFELINES']}
  },
  {
    left: {theme: 'red', beats: ['SOLUTIONS', 'EXIST', pause]},
    right: {theme: 'blue', beats: ['WE CAN', 'BUILD A', 'JUST &', 'LIVABLE', 'WORLD']}
  },
  {
    left: {theme: 'red', beats: ['LEADERS', 'PRESIDENTS', 'MINISTERS', 'DELEGATES', 'BE', double('BOLD!'), pause]},
    right: {theme: 'blue', beats: ['THE', 'FUTURE', 'IS', 'COUNTING', 'ON', double('YOU')]}
  },
  {
    hold: 10,
    left: {theme: 'red', beats: ['THE EYES', 'OF THE', 'WORLD', 'ARE ON', 'COP27', pause]},
    right: {theme: 'blue', beats: ['NO MORE', strike('BLAH'), strike('BLAH'), strike('BLAH'), '', 'TIME FOR', pause, inverse('COURAGE'), pause, pause, inverse('JUSTICE'), pause, pause, inverse('SPEED')]}
  },
  {
    duration: 10,
    left: {theme: 'red', beats: [small('#ClimateClock')]},
    right: {theme: 'blue', beats: [small('#ActInTime')]}
  }
];

var loop = [
  {
    duration: 20,
    left: {theme: 'blue', beats: [inverse('LIFELINE'), renewables, 'OF WORLD\'S', 'ENERGY', 'COMES FROM', 'RENEWABLES', pause]},
    right: {theme: 'blue', beats: ['WE NEED', hundredPercent, 'RENEWABLES', 'BEFORE', double('2030'), spaceAfter(''), 'TO STAY', 'BELOW', '1.5° C']}
  },
  {
    hold: 10,
    left: {theme: 'blue', beats: [inverse('LIFELINE'), indigenousLand, 'INDIGENOUS', 'LAND', 'MUST BE', 'PROTECTED', pause]},
    right: {theme: 'blue', beats: ['INDIGENOUS', 'LANDS IN', 'INDIGENOUS', 'HANDS', 'IS A KEY', 'CLIMATE', spaceAfter('SOLUTION'), pause, '#LandBack']}
  },
  {
    duration: 20,
    left: {theme: 'blue', beats: [inverse('LIFELINE'), lossDamage, 'LOSS &', 'DAMAGE', 'OWED', 'BY G20', pause]},
    right: {theme: 'blue', beats: ['THE BIGGEST', 'POLLUTERS', 'MUST PAY', 'THOSE', 'MOST', 'IMPACTED']}
  },
  {
    duration: 30,
    left: {theme: 'red', beats: [inverse('DEADLINE'), deadline, pause]},
    right: {theme: 'red', beats: ['OUR', 'WINDOW', 'OF', double('HOPE'), spaceAfter(''), pause, 'LET\'S', '#ActInTime', 'TO STAY', 'BELOW', '1.5° C']}
  }
];

for (var i = 0; i < 4; i++) {
  slides = slides.concat(loop);
}
