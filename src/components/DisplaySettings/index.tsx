import React, { SetStateAction } from 'react'
import { ReactComponent as DownIcon } from 'src/assets/icons_FEtask/down.svg';
import { ReactComponent as DisplayIcon } from 'src/assets/icons_FEtask/Display.svg';
import "./index.css"

interface PropType {
    setDropDownVisible: React.Dispatch<SetStateAction<boolean>>,
}

const index = ({ setDropDownVisible }: PropType) => {
    return (
        <div onClick={() => setDropDownVisible((state) =>
            !state
        )} className="settingsDropDownButton">
            <DisplayIcon />
            Display
            <DownIcon />
        </div>
    )
}

export default index