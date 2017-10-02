const showdown = require('showdown');
const converter = new showdown.Converter();

export default (list, project, currentEntry) => {
    return (`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${project.title}</title>
    <meta name="description" content="This is the document of ${project.title}.">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.kokush.in/uny/0.1.0/uny.min.css">
    <link rel="stylesheet" href="https://cdn.kokush.in/uny/0.1.0/uny-docs.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github-gist.min.css">
  </head>
  <body>
    <header class="header is-small">
      <div class="logo is-small">
        <a href="./">${project.title}</a>
      </div>
      <button class="button is-burger hide-on-medium hide-on-large offcanvas-open">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
    <main class="main">
      <div class="sidebar hide-on-small">
        <div class="sidebar-inner">
          <div style="margin-bottom: 2rem;">
          ${list.map(item => (`
            <div class="type-h3">
              <span>${item.name}</span>
            </div>
            <div class="tree">
              <ul>
              ${item.entries.map(entry => (`
                ${entry.id === currentEntry.id ? `
                <li class="is-current">
                  <a href="${entry.title}.html">${entry.title}</a>
                </li>
                ` : `
                <li>
                  <a href="${entry.title}.html">${entry.title}</a>
                </li>
                `}
              `)).join('')}
              </ul>
            </div>
          `)).join('')}
          </div>
        </div>
      </div>
      <div class="content">
        <section class="section">
          <div class="inner is-small">
            ${converter.makeHtml(currentEntry.markdown)}
          </div>
        </section>
      </div>
    </main>
    <div class="offcanvas">
    <div class="offcanvas-overlay offcanvas-close"></div>
      <div class="offcanvas-content">
        <button class="button is-close offcanvas-close">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="inner">
        ${list.map(item => (`
          <div class="type-h3">
            <span>${item.name}</span>
          </div>
          <div class="tree">
            <ul>
            ${item.entries.map(entry => (`
              ${entry.id === currentEntry.id ? `
              <li class="is-current">
                <a href="${entry.title}.html">${entry.title}</a>
              </li>
              ` : `
              <li>
                <a href="${entry.title}.html">${entry.title}</a>
              </li>
              `}
            `)).join('')}
            </ul>
          </div>
        `)).join('')}
        </div>
      </div>
    </div>
    <script src="https://cdn.kokush.in/uny/0.1.0/uny.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
  </body>
</html>`);
}
