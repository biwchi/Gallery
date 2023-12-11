import { BaseService } from '@/services/BaseService'

import { Paginate } from '../types'
import { AppFile, GalleryServiceParams } from './types'

class GalleryService extends BaseService {
  public getAll(params?: GalleryServiceParams) {
    return this.instance.get<Paginate<AppFile>>('gallery', { params: params })
  }

  public createFiles(data: FormData) {
    return this.instance.post('gallery', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
}

export default new GalleryService()
