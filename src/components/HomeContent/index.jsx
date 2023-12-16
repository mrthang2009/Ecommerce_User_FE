import React from "react";

import styles from "./HomeContent.module.css";
import SwiperHome from "../SwiperHome";
import HomeWidgetMenu from "../HomeWidgetMenu";
import WidgetService from "../WidgetService";
import BannerWelcome from "../BannerWelcome";

function HomeContent() {
  return (
    <>
      <div>
        <div>
          <SwiperHome/>
        </div>
        <div>
          <HomeWidgetMenu/>
        </div>
        <div>
          <WidgetService/>
        </div>
        <div>
          <BannerWelcome/>
        </div>
      </div>
    </>
  );
}

export default HomeContent;
