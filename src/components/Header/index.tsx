import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import DisplaySettings from 'src/components/DisplaySettings'
import DropDown from 'src/components/DropDown'
import "./index.css"

interface PropTypes {
    setGrouping: React.Dispatch<SetStateAction<string>>,
    setOrdering: React.Dispatch<SetStateAction<string>>,
}

const Header = ({
    setGrouping,
    setOrdering
}: PropTypes) => {

    const [dropDownVisible, setDropDownVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdownElement = document.querySelector('.dropDownContent');
            if (event.target === document.querySelector('.settingsDropDownButton')) return;
            console.log(dropdownElement, 38);

            if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
                setDropDownVisible(false);
            }
        };

        if (dropDownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropDownVisible]);


    return (
        <nav>
            <DisplaySettings setDropDownVisible={setDropDownVisible} />
            {
                dropDownVisible ?
                    <DropDown setGrouping={setGrouping} setOrdering={setOrdering} />
                    : <></>
            }
        </nav>
    )
}

export default Header