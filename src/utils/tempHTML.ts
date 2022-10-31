export default function tempHTML(html: string) {
  return `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Solid App</title>
</head>

<body>
  ${html}
</body>

</html>
  `
}
