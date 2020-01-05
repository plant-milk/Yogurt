export const isAbsoluteUrl = (url) => {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }
  if (/^[a-zA-Z]:\\/.test(url)) {
    return false;
  }
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
};
