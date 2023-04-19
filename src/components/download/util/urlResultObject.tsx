interface urlResultInterface {
  'link': string,
  'title': string,
  'progress'?: number,
  'duration'?: number,
  'status:': string
}
const urlResultObject:urlResultInterface = {
  'link': '',
  'title': '',
  'progress': 0,
  'duration': 0,
  'status:': ''
}

export {urlResultObject};
export type {urlResultInterface}
