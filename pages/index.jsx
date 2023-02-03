import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { SiProbot } from "react-icons/si";
import { Inter } from "@next/font/google";
import styles from "../styles/index.module.scss";
import Header from "./Header";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [selectSubject, setSelectSubject] = useState("");
  const [selectRace, setSelectRace] = useState("");
  const [selectAge, setSelectAge] = useState("");
  const [textInput, setTextInput2] = useState("");
  // const [textInput2, setTextInput2] = useState("");
  const [promptText, setPromptText] = useState("");
  // const [promptArray, setPromptArray] = useState([]);
  const [result, setResult] = useState([]);
  const [clicked, setClicked] = useState();
  const [focused, setFocused] = useState();
  const inputRef = useRef(null);
  useEffect(() => {
    console.log("result", result);
  }, [result]);
  // async function handleChange(event) {
  //   event.preventDefault();
  //   try {
  //     setSelectSubject(event.target.value);
  //     setPromptText(selectAge + " year old " + selectSubject);

  //     // const form = event.target;
  //     // const formData = new FormData(form);
  //     // setPromptText(
  //     //   formData.get("selectAge") + " year old " + formData.get("selectSubject")
  //     // );
  //     // setTextInput(event.target.value);
  //     // setPromptText((promptText) => promptText + textInput + " ");
  //     // setPromptText(
  //     //   (promptText) => textInput2 + " year old " + textInput + " "
  //     // );
  //     // setTextInput("");
  //     // setFocused(1);
  //   } catch (error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  async function handleBlur() {
    try {
      // setFocused();
      setPromptText(
        selectAge + " year old " + selectRace + " " + selectSubject
      );
      // const form = event.target;
      // const formData = new FormData(form);
      // setPromptText(
      //   formData.get("selectAge") + " year old " + formData.get("selectSubject")
      // );
      // setTextInput(event.target.value);
      // setPromptText((promptText) => promptText + textInput + " ");
      // setPromptText(
      //   (promptText) => textInput2 + " year old " + textInput + " "
      // );
      // setTextInput("");
      // setFocused(1);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  async function onSubmit(event) {
    event.preventDefault();
    try {
      setClicked(1);
      const form = event.target;
      const formData = new FormData(form);
      // setPromptText(
      //   formData.get("selectAge") + " year old " + formData.get("selectSubject")
      // );

      // setPromptText((promptText) => promptText + textInput + " ");
      // console.log([...formData.entries()]);

      // console.log("formData", formData.get("selectSubject"));
      const generateText =
        formData.get("selectAge") +
        " year old " +
        formData.get("selectSubject");
      console.log("generateText", generateText);

      setPromptText(generateText);
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
      // inputRef.current.focus();
      // setFocused();
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <div>
      <Head>
        <title>Plain AI</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <Header />
        <div className="container text-center">
          <div>
            {!textInput && result[0] && (
              <div>
                <img
                  className="mx-auto w-auto h-96 object-fit"
                  src={result[0].imageUrl}
                />
              </div>
            )}
            {textInput && (
              <div>
                <img src="/dog.png" />
              </div>
            )}
            {promptText && <div className="font-bold">{promptText}</div>}
          </div>
          <form onSubmit={onSubmit}>
            <select
              className="form-select px-4 py-3"
              name="selectSubject"
              value={selectSubject}
              onChange={(e) => setSelectSubject(e.target.value)}
              onBlur={(e) => handleBlur()}
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
              onBlur={(e) => handleBlur()}
            >
              <option>American</option>
              <option>African</option>
              <option>Asian</option>
            </select>
            <select
              className="form-select px-4 py-3"
              name="selectAge"
              value={selectAge}
              onChange={(e) => setSelectAge(e.target.value)}
              onBlur={(e) => handleBlur()}
            >
              <option>18</option>
              <option>28</option>
              <option>38</option>
              <option>48</option>
              <option>58</option>
              <option>68</option>
              <option>78</option>
              <option>88</option>
              <option>98</option>
            </select>
            {clicked && <div className={styles.thinking}>thinking...</div>}

            <input type="submit" value="Generate image" />
          </form>
        </div>
        <ul className={styles.resultList}>
          {result.map((e, idx) => (
            <li key={idx} className={styles.shadow}>
              <div className={styles.resultListImage}>
                <img width="100%" src={e.imageUrl} />
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
