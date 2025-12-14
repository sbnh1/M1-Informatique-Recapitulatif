import { useEffect, useState } from "react";
import LetterChecker from "./components/letterChecker.jsx";

export default function FileReader({ fileNames = [] }) {
    const [contents, setContents] = useState([]);
    const [listesLines, setListesLines] = useState([]);
    const [value, setValue] = useState("");
    const [randomedLineIndex, setRandomedLineIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showNext, setShowNext] = useState(false);

    useEffect(() => {
        async function fetchFiles() {
            try {
                const allContents = await Promise.all(
                    fileNames.map(fileName =>
                        fetch(`/M1-Informatique-Recapitulatif/notes/${fileName}`).then(res => res.text())
                    )
                );
                console.log(allContents);


                // Stockage brut (optionnel)
                setContents(allContents);

                // Extraire lignes avec leur fichier
                setListesLines(extractListesLines(fileNames, allContents));

            } catch (err) {
                console.error('error', err);
            }
        }

        if (fileNames.length > 0) fetchFiles();
    }, [fileNames]);

    useEffect(() => {
        if (listesLines.length > 0) {
            setRandomedLineIndex(randomInt(0, listesLines.length - 1));
        }
    }, [listesLines]);

    function extractEnglishNotes(text) {
        const startMarker = "## Paroles Anglaises";
        const endMarker = "## Traduction des paroles";
        const startIndex = text.indexOf(startMarker);
        const endIndex = text.indexOf(endMarker);
        if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
            return text.substring(startIndex + startMarker.length, endIndex).trim();
        }
        return "";
    }

    function extractListesLines(fileNames, contentsArray) {
        let all = [];

        contentsArray.forEach((text, idx) => {
            const englishNotes = extractEnglishNotes(text);
            const file = fileNames[idx];
            const lines = englishNotes
                .split("\n")
                .filter(line => line.trim() !== "");

            lines.forEach(line => {
                all.push({
                    file: file,
                    line: line
                });
            });
        });

        return all;
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function verifyInput() {
        if (
            value.trim().toLowerCase() ===
            listesLines[randomedLineIndex].line.trim().toLowerCase()
        ) {
            setShowNext(true);
        } else {
            setShowAnswer(true);
        }
    }

    function reload() {
        setValue("");
        setShowNext(false);
        setShowAnswer(false);
        setRandomedLineIndex(randomInt(0, listesLines.length - 1));
    }

    function next() {
        setValue("");
        setShowNext(false);
        setShowAnswer(false);
        setRandomedLineIndex(randomInt(0, listesLines.length - 1));
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                if (showAnswer || showNext) {
                    next();
                } else {
                    verifyInput();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Nettoyage lors du démontage
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [verifyInput, next]);

    useEffect(() => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }, []);


    return (
        <div className="music-container">
            <div className="card">

                {listesLines.length > 0 && (
                    <>
                        <div className="lyric-line">
                            <pre>{listesLines[randomedLineIndex].line}</pre>
                            <button
                                className="tts-btn"
                                onClick={() => {
                                    if (!("speechSynthesis" in window)) {
                                        console.warn("Speech Synthesis non supportée");
                                        return;
                                    }

                                    const text = listesLines[randomedLineIndex]?.line;
                                    if (!text) {
                                        console.warn("Texte vide");
                                        return;
                                    }

                                    // Créer l'utterance
                                    const utter = new SpeechSynthesisUtterance(text);
                                    utter.lang = "en-US";
                                    utter.rate = 1;   // vitesse (0.1 → 10)
                                    utter.pitch = 1;  // tonalité (0 → 2)
                                    utter.volume = 1; // volume (0 → 1)

                                    // Sélection d'une voix (Chromium les charge correctement)
                                    const voices = window.speechSynthesis.getVoices();
                                    if (voices.length > 0) {
                                        utter.voice =
                                            voices.find(v => v.lang === "en-US" && v.name.includes("Google"))
                                            || voices.find(v => v.lang === "en-US")
                                            || voices[0];
                                    }

                                    // Stoppe une lecture en cours et lance la nouvelle
                                    window.speechSynthesis.cancel();
                                    window.speechSynthesis.speak(utter);
                                }}
                                aria-label="Lire le texte à voix haute"
                                title="Lire à voix haute"
                            >
                                🔊
                            </button>

                        </div>

                        {/* 🔥 Ici on affiche le fichier d’origine */}
                        <div className="file-origin">
                            <small>
                                Fichier : <strong>{listesLines[randomedLineIndex].file}</strong>
                            </small>
                        </div>
                    </>
                )}

                <div className="input-container">
                    <input
                        className="answer-input"
                        type="text"
                        value={value}
                        placeholder="Tape le texte ici..."
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button className={"reloadbtn"} onClick={() => reload()}>Reload</button>
                </div>

                {!showAnswer && !showNext && (
                    <button className="check-btn" onClick={verifyInput}>
                        Vérifier
                    </button>
                )}

                {showAnswer && (
                    <div className="alert">
                        <button className="close" onClick={() => setShowAnswer(false)}>×</button>
                        <h4>Réponse</h4>

                        <LetterChecker
                            correct={listesLines[randomedLineIndex].line}
                            wrong={value}
                        />

                        <button className="check-btn" onClick={next}>Next !</button>
                    </div>
                )}

                {showNext && (
                    <div className="alert">
                        <button className="close" onClick={() => setShowNext(false)}>×</button>
                        <h4>Correct !</h4>
                        <button className="check-btn" onClick={next}>Next !</button>
                    </div>
                )}
            </div>
        </div>
    );
}
