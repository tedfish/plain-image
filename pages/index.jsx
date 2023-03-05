import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiProbot } from "react-icons/si";
// import { Inter } from "@next/font/google";
import styles from "../styles/index.module.scss";
// import Signup from "./Signup";
import Header from "./Header";
// import LoginButton from "../components/LoginBtn";

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
    selectAge &&
      setPromptText(
        selectAge + " year old " + selectRace + " " + selectSubject
      );
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
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>
      <main className={styles.main}>
        <div className="min-h-screen flex items-center	justify-center bg-white">
          <div className=" border-8 bg-white rounded-full overflow-hidden">
            <a className="btn btn-ghost normal-case text-xl">
              PL<em className="not-italic text-rose-700	">AI</em>N
            </a>
          </div>
        </div>
        <Header />

        {/* <Signup /> */}
        {/* <LoginButton />
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
        )} */}
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse bg-slate-300">
            {!clicked && (
              <>
                {result[0] && (
                  <div>
                    <Image
                      src={result[0].imageUrl}
                      width={500}
                      height={500}
                      alt="Generated image"
                    />
                    <div className="font-bold text-center text-xs p-2 text-slate-500">
                      {promptText}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="max-w-lg p-10 bg-slate-100">
              <h2 className="text-md uppercase text-rose-700 font-semibold mb-5">
                Human-Powered AI Marketing
              </h2>
              <h1 className="text-5xl font-bold">
                What is PL<em className="not-italic text-rose-700	">AI</em>N?
              </h1>
              <p className="py-5">
                Our mission is to connect human ingenuity with AI to create
                effective, scalable, and ethical solutions for modern day
                marketing teams.
              </p>
              <div className="divider text-rose-500 font-semibold mb-5">
                Landing Page Builder
              </div>
              <div className="divider text-rose-500 font-semibold mb-5">
                Copy Writer
              </div>

              <div className="divider text-rose-500 font-semibold mb-5">
                Person Generator
              </div>

              <ul className="steps w-full">
                <li
                  data-content={selectAge && "★"}
                  className="step step-neutral"
                >
                  {selectAge && selectAge + " year old"}
                </li>{" "}
                <li
                  data-content={selectRace && "★"}
                  className="step step-neutral"
                >
                  {selectRace}
                </li>
                <li
                  data-content={selectSubject && "★"}
                  className="step step-neutral"
                >
                  {selectSubject}
                </li>
              </ul>
              <form onSubmit={onSubmit} className="my-5 max-w-lg">
                {/* {rangeval} */}
                <input
                  name="selectAge"
                  value={selectAge}
                  onChange={(e) => setSelectAge(e.target.value)}
                  type="range"
                  min="18"
                  max="88"
                  // value={rangeval}
                  className="range my-5"
                  step="7"
                  // onChange={(event) => setRangeval(event.target.value)}
                />
                <div className="w-full flex justify-between text-xs mb-5">
                  <span>18</span>
                  <span>25</span>
                  <span>32</span>
                  <span>39</span>
                  <span>46</span>
                  <span>53</span>
                  <span>60</span>
                  <span>67</span>
                  <span>74</span>
                  <span>81</span>
                  <span>88</span>
                </div>

                {selectAge && (
                  <>
                    <select
                      className="select w-full max-w-lg select-ghost"
                      name="selectRace"
                      value={selectRace}
                      onChange={(e) => setSelectRace(e.target.value)}
                    >
                      {" "}
                      <option disabled selected>
                        Race
                      </option>
                      <option>Any</option>
                      <option>Chinese</option>
                      <option>Indian</option>
                      <option>American</option>
                      <option>Indonesian</option>
                      <option>Brazilian</option>
                      <option>Pakistani</option>
                      <option>Nigerian</option>
                      <option>Bangladeshi</option>
                      <option>Russian</option>
                      <option>Mexican</option>
                      <option>Japanese</option>
                      <option>Ethiopian</option>
                      <option>Philippine</option>
                      <option>Vietnamese</option>
                      <option>Egyptian</option>
                      <option>German</option>
                      <option>Iranian</option>
                      <option>Turkish</option>
                      <option>Congolese</option>
                      <option>Thai</option>
                      <option>French</option>
                      <option>South African</option>
                      <option>Colombian</option>
                      <option>Ukrainian</option>
                      <option>Spanish</option>
                      <option>Maroccan</option>
                      <option>Italian</option>
                      <option>Tanzania</option>
                      <option>Burmese</option>
                      <option>Sudanese</option>
                      <option>Korean</option>
                      <option>Argentine</option>
                      <option>Algerian</option>
                      <option>Polish</option>
                      <option>Ugandan</option>
                      <option>Australian</option>
                      <option>Malaysian</option>
                      <option>Kazakhstani</option>
                      <option>Cameroonian</option>
                      <option>Nepalese</option>
                      <option>Afghan</option>
                      <option>Iraqi</option>
                      <option>Peruvian</option>
                    </select>
                    <select
                      className="select w-full max-w-lg select-ghost"
                      name="selectSubject"
                      value={selectSubject}
                      onChange={(e) => setSelectSubject(e.target.value)}
                    >
                      <option disabled selected>
                        Subject
                      </option>

                      <option>Any</option>
                      <option>Woman</option>
                      <option>Man</option>
                    </select>

                    {!clicked && (
                      <button
                        type="submit"
                        className="btn btn-primary block w-full mt-5"
                      >
                        Generate image
                      </button>
                    )}
                  </>
                )}
              </form>
              {clicked && <div className={styles.thinking}>thinking...</div>}
            </div>
          </div>
        </div>

        <ul className={styles.resultList}>
          {result.map((e, idx) => (
            <li key={idx} className={styles.shadow}>
              <div className={styles.resultListImage}>
                <Image width={500} height={500} src={e.imageUrl} alt="text" />
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
