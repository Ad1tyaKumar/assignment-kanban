import React from 'react'
import './index.css'
import { ReactComponent as DoneIcon } from "src/assets/icons_FEtask/Done.svg";
import { ReactComponent as CancelledIcon } from "src/assets/icons_FEtask/Cancelled.svg";
import { ReactComponent as TodoIcon } from "src/assets/icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "src/assets/icons_FEtask/in-progress.svg";
import { ReactComponent as BacklogIcon } from "src/assets/icons_FEtask/Backlog.svg";
import { ReactComponent as HighPriorityIcon } from "src/assets/icons_FEtask/Img - High Priority.svg";
import { ReactComponent as LowPriorityIcon } from "src/assets/icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "src/assets/icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as NoPriorityIcon } from "src/assets/icons_FEtask/No-priority.svg";
import { ReactComponent as UrgentIcon } from "src/assets/icons_FEtask/SVG - Urgent Priority grey.svg";
interface Props {
    id: string;
    title: string;
    status: "backlog" | "todo" | "in progress" | "done" | "cancelled";
    priority: number;
    tags: string[];
}

const statusIcons = {
    "done": <DoneIcon />,
    "cancelled": <CancelledIcon />,
    "todo": <TodoIcon />,
    "in progress": <InProgressIcon />,
    "backlog": <BacklogIcon />
}

const prioritiesIcon: { [key: number]: JSX.Element } = {
    4: <UrgentIcon />,
    3: <HighPriorityIcon />,
    2: <MediumPriorityIcon />,
    1: <LowPriorityIcon />,
    0: <NoPriorityIcon />
}

const index = ({ id, title, tags, status, priority }: Props) => {
    const lowerCaseStatus: string = status.toLowerCase();
    return (
        <div className='ticket-main'>
            <div className='ticket-header'>
                <div className='ticket-id'>{id}</div>
                <div className='profileCircle' />
            </div>
            <div className='ticket-content'>
                <div className='ticket-content-title'>
                    <div>
                        {statusIcons[lowerCaseStatus as "backlog" | "todo" | "in progress" | "done" | "cancelled"]}
                    </div>

                    <div className='ticket-title'>{title}</div>
                </div>
            </div>
            <div className='ticket-metadata'>
                <div className='ticket-tags'>
                    <div className="ticket-tag">
                        {prioritiesIcon[priority]}
                    </div>
                    {tags.map((tag, key) => {
                        return (
                            <div key={key} className='ticket-tag'>
                                <div className='greyDot' />
                                <div>
                                    {tag}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default index