export function uniq(val: any, index: number, self: any[]) {
  return self.indexOf(val) === index;
}

export function truthy(val: any) {
  return !!val;
}
