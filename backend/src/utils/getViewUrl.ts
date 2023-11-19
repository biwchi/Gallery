import { join } from 'path';

export const getViewUrl = (
  url: string,
  fileName: string,
  additionalPath?: string,
) => `${url}/file/${join(fileName, additionalPath || '')}`;
