// Next JS Components
import Link from "next/link";

// Custom Components
import Grid from "./components/Grid";

// Styles
import styles from "./styles/index/page.module.css";

// Services
import { getWord } from "./services/word";

// Utils
import { createMatrix } from "./utils/arrays";

export default async function Home() {
  let word = await getWord();
  const attempts = 6;

  // Set static word
  if (!word) {
    word = "hello";
  }

  console.log("word =>", word);

  const gridMatrix = createMatrix(attempts, word?.length);

  return (
    <>
      {/* <header>

      </header> */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wordle by
          <Link
            href="https://github.com/RubenChirino"
            className={styles.titleLink}
          >
            RubenChirino
          </Link>
          !
        </h1>
        <Grid matrix={gridMatrix} word={word} />
      </main>
    </>
  );
}
