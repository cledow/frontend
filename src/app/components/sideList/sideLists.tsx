//프로필, 자기소개 변경
'use client'

import SideList from "./sideList";
import styles from "./sideList.module.css";
import Image from "next/image";
import profile from "../../../../public/images/profile.jpg";

const categories = [
  { address: "home", name: "홈 화면" },
  { address: "together", name: "그룹스터디" },
  { address: "schedules", name: "일정 공유" },
  // { address: "memo", name: "메모노트" },
  { address: "Library", name: "서 재" },
  { address: "store",  name: "스토어" },
];


export default function SideLists() {
  return (  
    <div className={styles.side}>
      <div className={styles.profile}>
        <Image src={profile} alt={"profile"} />
        <p>닉네임을 알려주세요</p>
        <p>자신을 소개해주세요</p>
      </div>
      <ul className={styles.preList}>
        {categories.map((category, index) => (
          <SideList
            address={category.address}
            category={category.name}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
}

//onClick={sidemenuToggle}
//const [side] useState(true)