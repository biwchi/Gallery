import { useEffect, useState } from 'react'

import { GalleryCard } from '@/components/Gallery/GalleryCard'

import { useRouteQuery } from '@/hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppDispatch } from '@/hooks/useStore'
import { ActionLayout } from '@/layouts/ActionLayout'
import GalleryService from '@/services/GalleryService'
import { AppFile } from '@/services/types'
import { audioPlayerActions } from '@/store/audioPlayerSlice'
import { mediaViewerActions } from '@/store/mediaViewerSlice'

import styles from './Media.module.scss'

export function Media() {
  const dispatch = useAppDispatch()

  const [appFiles, setAppFiles] = useState<AppFile[]>([])
  const [reloadCount, setReloadCount] = useState(0)

  const [filter] = useRouteQuery('filterBy')
  const [sorting] = useRouteQuery('sorting')
  const [search] = useRouteQuery('search')

  const debouncedSearch = useDebounce(search, 400)

  const { toggleMediaViewer, setFiles, setCurrentFileIndex } = mediaViewerActions
  const { setCurrentIndex, setFiles: setAudioFiles } = audioPlayerActions

  function handleOpenFile(idx: number) {
    const file = appFiles[idx]

    if (file.type === 'audio') {
      const files = appFiles.filter((file) => file.type === 'audio')
      dispatch(setAudioFiles(files))
      dispatch(setCurrentIndex(files.findIndex((soundFile) => soundFile.id === file.id)))
      return
    }

    const files = appFiles.filter((file) => file.type !== 'audio')
    dispatch(toggleMediaViewer(true))
    dispatch(setCurrentFileIndex(files.findIndex((soundFile) => soundFile.id === file.id)))
    dispatch(setFiles(files))
  }

  async function getFiles() {
    const filesResponse = await GalleryService.getAll({
      type: filter || undefined,
      sorting: sorting || undefined,
      search: debouncedSearch || undefined,
    })
    setAppFiles(filesResponse.data.result)
  }

  useEffect(() => {
    getFiles()
  }, [sorting, filter, debouncedSearch, reloadCount])

  return (
    <ActionLayout triggerUpdate={() => setReloadCount((v) => v + 1)}>
      <div className={styles.wrapper}>
        {appFiles.map((file, idx) => {
          return <GalleryCard key={file.id} file={file} onClick={() => handleOpenFile(idx)} />
        })}
      </div>
    </ActionLayout>
  )
}
