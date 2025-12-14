import { useEffect, useState } from 'react'
import './App.css'
import FileReader from "./Views/FileReader.jsx";
import Menu from "./Views/components/Menu.jsx";

function App() {

    const [listesFiles, setListesFiles] = useState([
        { id: 0, file: "Can\'tHelpFallingInLove.md", checked: true },
        { id: 1, file: "EnolaGay.md", checked: false },
        { id: 2, file: "IfICould.md", checked: false },
        { id: 3, file: "IfIWereABoy.md", checked: false },
        { id: 4, file: "whenImSixtyFour.md", checked: false },
    ]);

    // fichiers sélectionnés
    const selectedFiles = listesFiles
        .filter(item => item.checked)
        .map(item => item.file);

    function updateFileCheck(id) {
        setListesFiles(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    }

    useEffect(() => {
        console.log("Fichiers sélectionnés :", selectedFiles);
    }, [selectedFiles])

    return (
        <>
            <Menu items={listesFiles} update={updateFileCheck} />
            <FileReader fileNames={selectedFiles} />
        </>
    )
}

export default App
