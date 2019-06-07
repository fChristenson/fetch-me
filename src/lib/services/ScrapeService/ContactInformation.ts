export interface IContactInformationSearchResult {
  emails: string[];
  url: string;
  links: string[];
}

export function ContactInformationSearchResult(
    emails: string[],
    url: string,
    links: string[]): IContactInformationSearchResult {
  return {
    links,
    emails,
    url,
  };
}
