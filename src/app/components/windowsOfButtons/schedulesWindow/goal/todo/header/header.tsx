import styles from "./header.module.css";
import { useState } from "react";

//미사용 
export default function TodoHeader() {
  const filters: string[] = ["모두 보기", "진행 중", "완 료"];
  const [filter, setFilter] = useState<string>(filters[0]);
  return (
    <header className={styles.todoHeader}>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              onClick={()=>setFilter(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
