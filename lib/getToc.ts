export interface TocItem {
  name: string;
  level: number;
  children: Array<TocItem>;
}

export default function getToc([first, ...headings]: Array<string>) {
  const level = first.indexOf(" ");
  const name = first.substring(level + 1);

  let cursor: TocItem = { name, level, children: [] };
  const root: Array<TocItem> = [cursor];

  for (const heading of headings) {
    const level = heading.indexOf(" ");
    const name = heading.substring(level + 1);

    const toc: TocItem = { name, level, children: [] };

    if (cursor?.level < level) {
      cursor.children.push(toc);
    } else {
      root.push(toc);
    }

    cursor = toc;
  }

  return root;
}
