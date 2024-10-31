import Image from "next/image";
import styles from "./page.module.css";
import Main from "./main";

export default function Home() {
  return (
    <>
      <Main />
    </>
    // <div className={styles.page}>
    //   {/* <main className={styles.main}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //   </main>
    //   <footer className={styles.footer}>
    //   </footer> */}
    // </div>
  );
}
