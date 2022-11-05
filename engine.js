var si = -1;
var startFrameMillis = 0;
var nextFrameMillis = 0;
var bi = 0;
var panels = {
  left: {
    node: $('#lower-left'),
    rows: [],
  },
  right: {
    node: $('#lower-right'),
    rows: [],
  }
};

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    $(document.body).removeClass('fullscreen');
  } else {
    document.body.requestFullscreen();
    $(document.body).addClass('fullscreen');
  }
}

function restart() {
  si = slides.length - 1;
  nextFrameMillis = Date.now();
}

function previousSlide() {
  si = (si + slides.length - 2) % slides.length;
  nextFrameMillis = Date.now();
}

function holdCurrentSlide() {
  nextFrameMillis = Date.now() + 3600*1000;
}

function nextSlide() {
  nextFrameMillis = Date.now();
}

function formatBeats(beats) {
  var parts = [];
  for (var beat of beats) {
    parts.push(typeof beat == 'function' ? beat.repr : beat);
  }
  return parts.join(',');
}

function getDuration(slide) {
  return (slide.duration * 1000) || (
    (
      (slide.left.beats.length ? 1 : 0) + slide.left.beats.length +
      (slide.right.beats.length ? 1 : 0) + slide.right.beats.length 
    ) * 500 +
    (slide.hold || DEFAULT_HOLD) * 1000
  );
}

var totalDuration = 0;
for (var slide of slides) {
  totalDuration += getDuration(slide);
}

function tick() {
  var now = Date.now();
  var slide = slides[si];
  if (now > nextFrameMillis) {
    si = (si + 1) % slides.length;
    slide = slides[si];
    duration = getDuration(slide);
    startFrameMillis = (nextFrameMillis > now - 1000) ? nextFrameMillis : now;
    nextFrameMillis = startFrameMillis + duration;

    panels.left.node.attr('theme', slide.left.theme);
    panels.right.node.attr('theme', slide.right.theme);
    for (var ri = 0; ri < panels.left.rows.length; ri++) {
      panels.left.rows[ri].empty();
      panels.left.rows[ri].removeClass().addClass('row');
    }
    for (var ri = 0; ri < panels.right.rows.length; ri++) {
      panels.right.rows[ri].empty();
      panels.right.rows[ri].removeClass().addClass('row');
    }

    status = 'Slide ' + (si + 1) + ' of ' + slides.length + ' (' + duration/1000 + ' s of ' + totalDuration/1000 + ' s): ';
    console.log(status, slide.left.beats, slide.right.beats);
    $('#status').text(status + '\n    ' + formatBeats(slide.left.beats) + '\n    ' + formatBeats(slide.right.beats));

    if (slide.media) {
      $('#upper .media').empty();
      $('#lower .media').empty();
      if (slide.media.upper) {
        $('#upper .media').append(slide.media.upper);
        playVideo(slide.media.upper);
      }
      if (slide.media.lower) {
        $('#lower .media').append(slide.media.lower);
        playVideo(slide.media.lower);
      }
    }
  }
  bi = (slide.left.beats.length ? 1 : 0);
  drawPanel(panels.left, slide.left.beats, now - startFrameMillis);
  bi += (slide.right.beats.length ? 1 : 0);
  drawPanel(panels.right, slide.right.beats, now - startFrameMillis);
  setTimeout(tick, 20);
}

function playVideo(media) {
  if (media.prop('tagName') == 'VIDEO') {
    media.get(0).currentTime = 0;
    media.get(0).play();
  }
}

function drawPanel(panel, beats, millis) {
  while (panel.rows.length < beats.length) {
    panel.rows.push($('<div>').addClass('row').appendTo(panel.node));
  }
  var revealed = millis / 500;  /* each beat is 500 ms */
  for (var ri = 0; ri < panel.rows.length; ri++) {
    var content = beats[ri];
    if (typeof content == 'function') {
      content(panel.rows[ri]);
    } else {
      panel.rows[ri].empty();
      panel.rows[ri].text(content || ' ');
    }
    panel.rows[ri].toggleClass('hidden', bi >= revealed);
    if (ri < beats.length) bi++;
  }
}

tick();
