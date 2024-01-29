import { join } from 'path';

export const getViewUrl = (
  endpoint: string = 'file',
  url: string,
  fileName: string,
  additionalPath?: string,
) => `${url}/${endpoint}/${join(fileName, additionalPath || '')}`;
