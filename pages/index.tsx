import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { CardList } from "../src/components/CardList";
// import { SideBar } from "../src/components/SideBar";
import { useInitCardStore } from "../src/store/useInitCardStore";

const Home: NextPage = () => {
  // useClearCardStorage();
  useInitCardStore();

  return (
    <div className={styles.container}>
      {/*<SideBar />*/}

      <main className={styles.main}>
        <Head>
          <title>Pokemon TCG Deck Collection</title>
          <meta
            name="description"
            content="Keep up with your cards that are in use"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={styles.title}>Pokemon TCG Deck Collection</h1>

        <CardList />
        <footer className={styles.footer}>Work in progress</footer>
      </main>
    </div>
  );
};

export default Home;
