interface urlResultInterface {
  'link': string,
  'title': string,
  'progress'?: number,
  'duration'?: number,
}
const urlResultObject:urlResultInterface = {
  'link': '',
  'title': '',
  'progress': 0,
  'duration': 0,
}

export {urlResultObject};
export type {urlResultInterface}
