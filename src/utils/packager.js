import moment from 'moment';

export default (currentEntry, currentCategory) => (`---
title: ${currentEntry.title}
date: ${moment(currentEntry.date).format('YYYY-MM-DD')}
category: "${currentCategory.name}"
---

${currentEntry.markdown}
`);
