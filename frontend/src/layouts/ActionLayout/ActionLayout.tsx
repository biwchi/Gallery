import { FilesUploadModal } from '@/components/Modals/FilesUploadModal'
import { Modal } from '@/components/Modals/Modal'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { Select } from '@/components/UI/Select'

import { useRouteQuery, useToggle } from '@/hooks'

import styles from './ActionLayout.module.scss'

type BaseLayoutProps = {
  children: JSX.Element
  triggerUpdate?: () => void
}

const sortOptions = [
  { label: 'By date', value: 'dateUploaded' },
  { label: 'By file size', value: 'size' },
]

const filterOptions = [
  { label: 'Audio', value: 'audio' },
  { label: 'Video', value: 'video' },
  { label: 'Image', value: 'image' },
]

export function ActionLayout({ children, triggerUpdate }: BaseLayoutProps) {
  const [isFileModal, toggleFileModal] = useToggle(false)

  const [sorting, setSorting] = useRouteQuery('sorting')
  const [filter, setFilter] = useRouteQuery('filterBy')
  const [search, setSearch] = useRouteQuery('search')

  return (
    <>
      <Modal title="Upload files" isModal={isFileModal} toggleModal={toggleFileModal}>
        <FilesUploadModal
          triggerUpdate={triggerUpdate ? triggerUpdate : () => {}}
          toggleFileModal={toggleFileModal}
        />
      </Modal>

      <div className={styles.actions}>
        <div className={styles.inputs}>
          <Input
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />

          <Select
            placeholder="Select sort method"
            value={sorting || null}
            options={sortOptions}
            optionLabel="label"
            optionValue="value"
            clearable
            onChange={(value) => {
              setSorting(value)
            }}
          />

          <Select
            placeholder="Filter by type"
            value={filter || null}
            options={filterOptions}
            optionLabel="label"
            optionValue="value"
            clearable
            onChange={(value) => {
              setFilter(value)
            }}
          />
        </div>

        <Button onClick={() => toggleFileModal()} text="Upload new files" leftIcon="ph:upload" />
      </div>

      <div className={styles.content}>{children}</div>
    </>
  )
}
