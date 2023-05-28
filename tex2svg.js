const {mathjax} = require('mathjax-full/js/mathjax.js');
const {TeX} = require('mathjax-full/js/input/tex.js');
const {SVG} = require('mathjax-full/js/output/svg.js');
const {jsdomAdaptor} = require('mathjax-full/js/adaptors/jsdomAdaptor.js');
const {RegisterHTMLHandler} = require('mathjax-full/js/handlers/html.js');
const {AssistiveMmlHandler} = require('mathjax-full/js/a11y/assistive-mml.js');

const {AllPackages} = require('mathjax-full/js/input/tex/AllPackages.js');

const {JSDOM} = require('jsdom');

const CSS = [
  'svg a{fill:blue;stroke:blue}',
  '[data-mml-node="merror"]>g{fill:red;stroke:red}',
  '[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}',
  '[data-frame],[data-line]{stroke-width:70px;fill:none}',
  '.mjx-dashed{stroke-dasharray:140}',
  '.mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}',
  'use[data-c]{stroke-width:3px}'
].join('');

const adaptor = jsdomAdaptor(JSDOM);
const handler = RegisterHTMLHandler(adaptor);


const tex = new TeX({packages: AllPackages});
const svg = new SVG({fontCache: 'none'});
const html = mathjax.document('', {InputJax: tex, OutputJax: svg});


export default function tex2svg(string, display = true) {
    const node = html.convert(string, {
        display: true,
        em: 16,
        ex: 8,
        containerWidth: 80 * 16
      });
      
      let mhtml = false ? adaptor.outerHTML(node) : adaptor.innerHTML(node);
      return mhtml.replace(/<defs>/, `<defs><style>${CSS}</style>`);
}