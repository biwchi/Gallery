import styles from './Default.module.scss'

import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export function DefaultLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
}
