const showdown = require('showdown');
const converter = new showdown.Converter();

export default (list, project, currentEntry) => {
    return (`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${project.title}</title>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.kokush.in/uny/1.0.0/uny.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css" rel="stylesheet">
  </head>
  <body>    
    <header class="header is-small">
        <div class="logo is-small">
          <a href="./">${project.title}</a>
        </div>
    </header>
    <main class="main has-sidebar">
        <div class="sidebar">
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
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
  </body>
</html>`);
}