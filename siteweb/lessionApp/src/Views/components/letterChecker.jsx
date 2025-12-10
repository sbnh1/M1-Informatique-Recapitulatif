import React from "react";
import "../../styles/letterChecker.css";
function getDiff(correct, wrong) {
    const m = correct.trim().length;
    const n = wrong.trim().length;

    // DP pour distance d'édition
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Initialisation
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Remplissage DP
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (correct[i - 1] === wrong[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // match
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1] + 1, // substitution
                    dp[i - 1][j] + 1,     // suppression
                    dp[i][j - 1] + 1      // insertion
                );
            }
        }
    }

    // Reconstruction
    const result = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && correct[i - 1] === wrong[j - 1]) {
            result.push({ char: wrong[j - 1], type: "match" });
            i--; j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            // substitution → afficher la lettre fausse
            result.push({ char: wrong[j - 1], type: "diff" });
            i--; j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            // suppression → caractère manquant
            result.push({ char: " ", type: "diff" });
            i--;
        } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            // insertion → caractère supplémentaire
            result.push({ char: wrong[j - 1], type: "diff" });
            j--;
        }
    }

    return result.reverse();
}





export default function LetterChecker({ correct = "", wrong = "" }) {
    const diffChars = getDiff(correct, wrong);

    const diffCount = diffChars.filter(c => c.type !== "match").length;

    return (
        <div className="lc-container">
            <div className="lc-column">
                <div className="lc-header">Version correcte</div>
                <div className="lc-line">{correct}</div>
                <div className="lc-line">
                    {diffChars.map((c, i) => (
                        <span
                            key={i}
                            className={
                                c.type === "match" ? "lc-match" :
                                    c.type === "diff" ? "lc-diff" :
                                        "lc-extra"
                            }
                        >
              {c.char === " " && c.type === "diff" ? "␣" : c.char}
            </span>
                    ))}
                </div>
                <div className="lc-footer">Longueur : {correct.length}</div>
                <div className="lc-footer">
                    Différences : <strong>{diffCount}</strong>
                </div>
            </div>
        </div>
    );
}
