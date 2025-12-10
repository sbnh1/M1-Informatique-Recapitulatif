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
                        fetch(`/notes/${fileName}`).then(res => res.text())
                    )
                );

                // Stockage brut (optionnel)
                setContents(allContents);

                // Extraire lignes avec leur fichier
                setListesLines(extractListesLines(fileNames, allContents));

            } catch (err) {
                console.error(err);
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


    return (
        <div className="music-container">
            <div className="card">

                {listesLines.length > 0 && (
                    <>
                        <div className="lyric-line">
                            <pre>{listesLines[randomedLineIndex].line}</pre>
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
