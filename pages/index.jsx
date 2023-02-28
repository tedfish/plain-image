import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiProbot } from "react-icons/si";
// import { Inter } from "@next/font/google";
import styles from "../styles/index.module.scss";
// import Signup from "./Signup";
import Header from "./Header";
import LoginButton from "../components/LoginBtn";

//  const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [selectSubject, setSelectSubject] = useState("");
  const [selectRace, setSelectRace] = useState("");
  const [selectAge, setSelectAge] = useState("");
  const [promptText, setPromptText] = useState("");
  const [result, setResult] = useState([]);
  const [clicked, setClicked] = useState();
  const [rangeval, setRangeval] = useState(null);

  useEffect(() => {
    setPromptText(selectAge + " year old " + selectRace + " " + selectSubject);
  }, [selectSubject, selectRace, selectAge]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setClicked(1);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptText: promptText }),
      });
      const data = await response.json();
      if (data.result != "") {
        setClicked();
      }
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      promptText &&
        setResult([{ prompt: promptText, imageUrl: data.result }, ...result]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  const subjectMinAge = { Woman: 18, Man: 18, Dog: 1, Cat: 1 };
  const subjectMaxAge = { Woman: 99, Man: 99, Dog: 20, Cat: 20 };
  return (
    <div>
      <Head>
        <title>Plain AI</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <Header />
        {/* <Signup /> */}
        <LoginButton />
        {result[0] && (
          <div
            className="hero min-h-screen bg-base-200"
            style={{
              backgroundImage: `url(${result[0].imageUrl})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Human AI Ranking</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        )}
        {!result[0] && (
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <Image
                src="https://source.unsplash.com/random"
                className="max-w-sm rounded-lg shadow-2xl"
                width={500}
                height={500}
              />
              <div>
                <h1 className="text-5xl font-bold">Box Office News!</h1>
                <p className="py-6">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        )}
        <div className="container text-center">
          <div>
            {result[0] && (
              <div>
                <Image
                  className="mx-auto w-auto object-fit mt-10"
                  src={result[0].imageUrl}
                  width={500}
                  height={500}
                  alt="Generated image"
                />
              </div>
            )}

            {promptText && <div className="font-bold">{promptText}</div>}
          </div>
          <ul className="steps">
            <li data-content={selectSubject} className="step step-neutral">
              Subject
            </li>
            <li data-content={selectAge} className="step step-neutral">
              Age
            </li>
            <li data-content={selectRace} className="step step-neutral">
              Step 3
            </li>
            <li data-content="✕" className="step step-neutral">
              Step 4
            </li>
          </ul>
          <form onSubmit={onSubmit}>
            {rangeval}
            <input
              name="selectAge"
              value={selectAge}
              onChange={(e) => setSelectAge(e.target.value)}
              type="range"
              min="1"
              max="100"
              // value={rangeval}
              className="range"
              step="1"
              // onChange={(event) => setRangeval(event.target.value)}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>

            <select
              className="form-select px-4 py-3"
              name="selectSubject"
              value={selectSubject}
              onChange={(e) => setSelectSubject(e.target.value)}
            >
              <option>Woman</option>
              <option>Man</option>
              <option>Dog</option>
              <option>Cat</option>
            </select>
            <select
              className="form-select px-4 py-3"
              name="selectRace"
              value={selectRace}
              onChange={(e) => setSelectRace(e.target.value)}
            >
              <option>American</option>
              <option>African</option>
              <option>Asian</option>
            </select>
            {/* <select
              className="form-select px-4 py-3"
              name="selectAge"
              value={selectAge}
              onChange={(e) => setSelectAge(e.target.value)}
            >
              {rangeval > 0 && <option>{rangeval}</option>}
              <option>18</option>
              <option>28</option>
              <option>38</option>
              <option>48</option>
              <option>58</option>
              <option>68</option>
              <option>78</option>
              <option>88</option>
              <option>98</option>
            </select> */}
            {clicked && <div className={styles.thinking}>thinking...</div>}

            <input type="submit" value="Generate image" />
          </form>
        </div>
        <ul className={styles.resultList}>
          {result.map((e, idx) => (
            <li key={idx} className={styles.shadow}>
              <div className={styles.resultListImage}>
                <Image width={500} height={500} src={e.imageUrl} />
              </div>
              <h4>{e.prompt}</h4>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <div className={styles.logo}>
            <SiProbot />
            <h2>
              Pl<em>ai</em>n
            </h2>
          </div>
          <div className={styles.copyright}>
            <small>All rights reserved.</small>
          </div>
        </div>
      </main>
    </div>
  );
}
