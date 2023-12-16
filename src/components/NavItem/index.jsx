import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./NavItem.module.css";
import { useEffect } from "react";

function NavItem({ categories, showCategories, setShowCategories }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const handleShowCategories = () => {
    if (window.innerWidth <= 1025) {
      setShowCategories(!showCategories);
    }
  };

  //Thực hiện thay đổi path sẽ setShowCategories === false, thuộc tính lấy query parameters
  useEffect(() => {
    setShowCategories(false);
  }, [router.asPath]);

  return (
    <li onClick={categories.id === 3 ? handleShowCategories : null}>
      <Link
        className={
          currentPath === categories.path ||
          (currentPath.includes("/thuc-don/") &&
            categories.path.includes("/thuc-don/"))
            ? styles.current
            : ""
        }
        href={categories.path}
      >
        {categories.label}
      </Link>
      {categories.child && categories.child.length > 0 && (
        <div
          className={`${styles.nav_child} ${
            showCategories ? styles.showChild : ""
          }`}
        >
          {categories.child.map((child) => (
            <Link
              key={`NavItem_${child.id}`}
              href={`/thuc-don/${child.path}`}
              className={styles.item_child}
            >
              <div className={styles.nav_child_item}>
                <div>
                  <Image
                    width={80}
                    height={50}
                    src={child.media.coverImageUrl}
                    alt="Gà cay thơm ngon"
                  />
                </div>
                <div>{child.name}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export default NavItem;
