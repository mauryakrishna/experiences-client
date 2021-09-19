import React, { useState } from "react"
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
    const languageList = [
        { key: "english", value: "English" },
        { key: "hindi", value: "हिन्दी" },
        { key: "marathi", value: "मराठी" }
    ]
    const [chosenLanguage, setChosenLanguage] = useState("english")
    const handleLanguageChange = (lang) => {
        setChosenLanguage(lang)
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
                            return <MenuItemOption key={lang.key} value={lang.key}>{lang.value}</MenuItemOption>
                        })
                    }
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default ChooseLanguage