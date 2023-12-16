import { useEffect, useCallback, useState } from "react";
import slugify from "slugify";

import NavItem from "../NavItem";
import { navList } from "../../datas/navList";
import styles from "./NavigationBar.module.css";
import axiosClient from "@/libraries/axiosClient";

import React from "react";

function NavigationBar() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/categories/all");
      setCategories(res.data?.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <ul className={styles.main_navigation}>
        {resultsNavList?.map((item) => (
          <NavItem key={item.id} categories={item}  showCategories = {showCategories} setShowCategories = {setShowCategories}/>
        ))}
      </ul>
    </>
  );
}

export default NavigationBar;
