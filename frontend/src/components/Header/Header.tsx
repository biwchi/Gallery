import { Icon } from "@iconify-icon/react/dist/iconify.js";
import styles from "./Header.module.scss";

export function Header() {
  const links = [
    { icon: "mdi:github", link: "https://github.com/biwchi/Gallery" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.headerBody}>
        <h1 className={styles.title}>Gallery</h1>

        <div className={styles.links}>
          {links.map((link, idx) => {
            return (
              <a key={idx} href={link.link} target='_blank'> 
                <Icon key={idx} icon={link.icon} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
