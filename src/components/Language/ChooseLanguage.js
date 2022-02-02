import React, { useState } from "react"
import localStorage from 'local-storage';
import { EXPERIENCE_EDITOR_LANG } from "../../ConfigConstants"
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
} from "@chakra-ui/core";
import find from "lodash/find";

const ChooseLanguage = () => {
    // enDisplay - for dispalying the english phonetics of corresponding language
    const languageList = [
        { key: "english", value: "English", enDisplay: "English" },
        { key: "hindi", value: "हिन्दी", enDisplay: "Hindi" },
        { key: "marathi", value: "मराठी", enDisplay: "Marathi" },
        { key: "gujarati", value: "ગુજરાતી", enDisplay: "Gujarati" },
        { key: "kannada", value: "ಕನ್ನಡ", enDisplay: "Kannada" },
        { key: "punjabi", value: "ਪੰਜਾਬੀ", enDisplay: "Punjabi" },
        { key: "bengali", value: "বাঙ্গালী", enDisplay: "Bengali" },
        { key: "tamil", value: "தமிழ்", enDisplay: "Tamil" },
        { key: "telugu", value: "తెలుగు", enDisplay: "Telugu" },
        { key: "nepali", value: "नेपाली", enDisplay: "Nepali" },
    ]
    const chosenLang = localStorage.get(EXPERIENCE_EDITOR_LANG)
    const [chosenLanguage, setChosenLanguage] = useState(chosenLang || "english")
    const handleLanguageChange = (lang) => {
        plausible('ChooseLanguage', { props: { lang } })
        setChosenLanguage(lang)
        localStorage.set(EXPERIENCE_EDITOR_LANG, lang)
    }

    return (
        <Menu closeOnSelect={true}>
            <MenuButton as={Button} rightIcon="chevron-down">
                {find(languageList, { key: chosenLanguage }).value}
            </MenuButton>
            <MenuList minWidth="150px">
                <MenuOptionGroup onChange={handleLanguageChange} value={chosenLanguage} type="radio">
                    {
                        languageList.map((lang) => {
                            return <MenuItemOption key={lang.key} value={lang.key}>{lang.value} - {lang.enDisplay}</MenuItemOption>
                        })
                    }
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default ChooseLanguage