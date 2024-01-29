export type * from './AuthService/types'
export type * from './GalleryService/types'

export type Paginate<T> = {
  count: number
  next: boolean
  previous: boolean
  result: T[]
}

export type PaginateParams = {
  offset?: number
  limit?: number
}
