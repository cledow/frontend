"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./sideList.module.css";

export type Props = {
  category: string;
  index: number;
  address: string;
};

export default function SideList({ category, index, address }: Props) {
  return (
    <li key={index} className={styles.list} style={{ fontFamily: "IBM" }}>
      <Link href={address==="home" ? '/' : `/${address}`}>{category}</Link>
      {/* <Image src={""} alt={""} width={40} height={40} /> //새 게시물 new 아이콘 */}
    </li>
  );
}

