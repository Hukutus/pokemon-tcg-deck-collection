import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { CardList } from "./components/CardList";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon TCG Deck Collection</title>
        <meta
          name="description"
          content="Keep up with your cards that are in use"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Pokemon TCG Deck Collection</h1>

        <CardList />
      </main>

      <footer className={styles.footer}>Work in progress</footer>
    </div>
  );
};

export default Home;
