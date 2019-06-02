(async () => {
  const foo = /url\(["'](.+)["']\)/.exec("url(\"https://en.wikipedia.org/static/images/project-logos/enwiki-2x.png\")");
  console.log(foo);
  console.log('--------------------------');
})();
