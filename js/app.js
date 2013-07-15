var marked = require('marked');

var gui = require('nw.gui'),
    win = gui.Window.get();

var opt = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  silent: false,
  langPrefix: 'language-'
};

marked.setOptions(opt);

var renderer = new marked.Renderer();

var parse = function(src, options) {
  options = options || opt;
  return marked.parser(marked.lexer(src, options), options, renderer);
}

function tokenize(md) {
	var tokens = md.split('===');
	return tokens;
}

function convert(md) {
	var tokens, md, steps = [];

  tokens = tokenize(md);

  tokens.forEach(function(item, idx) {
    steps.push('<section class="slide"><div>\n\t' + parse(item) + '\n</div></section>');
  });

  return steps.join('\n\n');
}

win.on('update', function(md) {
  // var isSlideMode = shower.isSlideMode();
  shower.enterListMode();
  shower.slideList.length = 0;

  document.body.innerHTML = '<header class="caption">'
    + '  <h1>Presentation Title</h1>'
    + '  <p><a href="">a Day</a>, Haroo studio.</p>'
    + '</header>'
    + convert(md) 
    + '<div class="progress"><div></div></div>';

  location.hash = '';
  shower.init();
});

