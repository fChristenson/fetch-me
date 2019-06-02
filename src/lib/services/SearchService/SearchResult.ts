export interface ISearchResult {
  title: string|null;
  description: string|null;
  href: string|null;
}

export function SearchResult(
  title: string|null,
  description: string|null,
  href: string|null): ISearchResult {
  return {
    title,
    description,
    href,
  };
}
