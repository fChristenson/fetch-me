export interface IEmails {
  emails: string[];
  url: string;
}

export function Emails(emails: string[], url: string): IEmails {
  return {
    emails,
    url,
  };
}
