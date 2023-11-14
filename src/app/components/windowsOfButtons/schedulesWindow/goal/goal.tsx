import styles from "./Goal.module.css";
import CurrentDate from "./currentDate";
import Image from "next/image";
import leftarrow from "../../../../../../public/images/icons/leftarrow.png";
import rightarrow from "../../../../../../public/images/icons/rightarrow.png";
import TodoList from "./todo/todoList/todoList";

export default function Goal() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>일정 관리</h3>
      <div className={styles.calendar}>
        <Image src={leftarrow} alt="yesterday" width={20} height={16} />
        <div>
          <CurrentDate />
        </div>
        <Image src={rightarrow} alt="tommorow" width={20} height={16} />
      </div>
      <div className={styles.todo}>
        {/* <TodoHeader /> */}
        <TodoList />
      </div>
    </div>
  );
}
