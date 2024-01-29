import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'

import styles from './Default.module.scss'

export function DefaultLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  )
}
