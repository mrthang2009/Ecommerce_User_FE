import { useEffect, useCallback, useState } from "react";
import slugify from "slugify";
import Link from "next/link";
import Image from "next/image";
import { navList } from "../../datas/navList";
import styles from "./NavigationBar.module.css";
import axiosClient from "@/libraries/axiosClient";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function NavCategories({ id, path, coverImage, name }) {
  return (
    <>
      <Link
        key={`NavItem_${id}`}
        href={`/thuc-don/${path}`}
        className={`${styles.item_child} flex-basis-1/6 hover:opacity-50`}
      >
        <div className="flex flex-col items-center w-full">
          <Image
            width={80}
            height={50}
            src={coverImage}
            alt="Gà cay thơm ngon"
          />
          <p>{name}</p>
        </div>
      </Link>
    </>
  );
}
function NavigationBar() {
  const router = useRouter();
  const [navListWithCurrent, setNavListWithCurrent] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Kiểm tra đường dẫn hiện tại và cập nhật trạng thái current
    const currentPath = router.asPath;
    const updatedNavList = navList.map((item) => ({
      ...item,
      current: currentPath === item.href,
    }));
    setNavListWithCurrent(updatedNavList);
  }, [router.asPath]);

  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/categories/all");
      setCategories(res.data?.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const convertToEnglishAndSlug = (name) => {
    const slug = slugify(name, {
      lower: true,
      strict: true,
      remove: /[^A-Za-z0-9-\s]+/g,
      replacement: "-",
    });

    return slug;
  };
  const categoriesConvert = categories?.map((item) => ({
    ...item,
    path: `${convertToEnglishAndSlug(item.name)}`,
  }));
  const resultsNavList = navList.map((item) => {
    if (item.id === 3) {
      return {
        ...item,
        child: categoriesConvert,
      };
    }
    return item;
  });
  console.log("««««« resultsNavList »»»»»", resultsNavList);

  const [isHovered, setIsHovered] = useState(false);
  console.log("««««« isHovered »»»»»", isHovered);
  return (
    <Disclosure>
      {({ open }) => (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mt-8">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-28">
                {navListWithCurrent.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-[#F3D2D6] text-[#e31837] " : "",
                      "text-white rounded-tl-xl rounded-tr-xl font-bold text-xl px-3 pt-1 uppercase hover:bg-[#F3D2D6] hover:text-[#e31837]"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden ">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navList.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

          {isHovered && (
            <div
              className={classNames(
                "z-10 bg-[#F3D2D6] space-y-1 px-2 pb-3 pt-2 flex absolute rounded-bl-xl rounded-br-xl"
              )}
            >
              {resultsNavList[2].child.map((child) => (
                <NavCategories
                  key={child.id}
                  id={child.id}
                  path={child.path}
                  coverImage={child.media.coverImageUrl}
                  name={child.name}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Disclosure>
  );
}
export default NavigationBar;
