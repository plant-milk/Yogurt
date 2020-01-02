import moment from 'moment';

export default (_list, _project, currentEntry) => (`---
title: ${currentEntry.title}
date: ${moment(currentEntry.date).format('YYYY-MM-DD')}
---

${currentEntry.markdown}
`);
