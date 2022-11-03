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

function tick() {
  var now = Date.now();
  var slide = slides[si];
  if (now > nextFrameMillis) {
    si = (si + 1) % slides.length;
    slide = slides[si];
    duration = (slide.duration * 1000) || (
        (1 + slide.left.beats.length + 1 + slide.right.beats.length) * 500 +
        (slide.hold || DEFAULT_HOLD) * 1000
    );
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

    console.log('slide (' + duration/1000 + ' s):', slide.left.beats, slide.right.beats);
    if (slide.video) {
      $('#upper .video').empty();
      $('#lower .video').empty();
      if (slide.video.upper) {
        $('#upper .video').append(slide.video.upper);
        slide.video.upper.get(0).currentTime = 0;
        slide.video.upper.get(0).play();
      }
      if (slide.video.lower) {
        $('#lower .video').append(slide.video.lower);
        slide.video.lower.get(0).currentTime = 0;
        slide.video.lower.get(0).play();
      }
    }
  }
  bi = 1;
  drawPanel(panels.left, slide.left.beats, now - startFrameMillis);
  bi++;
  drawPanel(panels.right, slide.right.beats, now - startFrameMillis);
  setTimeout(tick, 20);
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
