export function uniq(val: any, index: number, self: any[]) {
  return self.indexOf(val) === index;
}

export function trim(val: string) {
  return val.trim();
}

export function truthy(val: any) {
  return !!val;
}
