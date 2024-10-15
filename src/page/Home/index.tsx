import React, { useEffect, useState } from 'react';
import "./index.css";
import TaskCard from 'src/components/TaskCard';
import { ReactComponent as DoneIcon } from "src/assets/icons_FEtask/Done.svg";
import { ReactComponent as CancelledIcon } from "src/assets/icons_FEtask/Cancelled.svg";
import { ReactComponent as TodoIcon } from "src/assets/icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "src/assets/icons_FEtask/in-progress.svg";
import { ReactComponent as BacklogIcon } from "src/assets/icons_FEtask/Backlog.svg";
import { ReactComponent as AddIcon } from "src/assets/icons_FEtask/add.svg";
import { ReactComponent as MenuIcon } from "src/assets/icons_FEtask/3 dot menu.svg";
import { ReactComponent as HighPriorityIcon } from "src/assets/icons_FEtask/Img - High Priority.svg";
import { ReactComponent as LowPriorityIcon } from "src/assets/icons_FEtask/Img - Low Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "src/assets/icons_FEtask/Img - Medium Priority.svg";
import { ReactComponent as NoPriorityIcon } from "src/assets/icons_FEtask/No-priority.svg";
import { ReactComponent as UrgentIcon } from "src/assets/icons_FEtask/SVG - Urgent Priority colour.svg";

import { cmpPriority, cmpTitle } from 'src/utils/Helper';

interface PropTyes {
    grouping: string;
    ordering: string;
}

let priorities: { [key: number]: string } = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
}

let priorityLevels = [4, 3, 2, 1, 0]

const allStatus: ("Backlog" | "Todo" | "In Progress" | "Done" | "Cancelled")[] = ["Backlog", "Todo", "In Progress", "Done", "Cancelled"];
const statusIcons = {
    "Done": <DoneIcon />,
    "Cancelled": <CancelledIcon />,
    "Todo": <TodoIcon />,
    "In Progress": <InProgressIcon />,
    "Backlog": <BacklogIcon />
}

const prioritiesIcon: { [key: number]: JSX.Element } = {
    4: <UrgentIcon />,
    3: <HighPriorityIcon />,
    2: <MediumPriorityIcon />,
    1: <LowPriorityIcon />,
    0: <NoPriorityIcon />
}

const Home = ({ grouping, ordering }: PropTyes) => {

    const [data, setData] = useState<Data | null>(null);
    const [ticketMap, setTicketMap] = useState<Ticket[][]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(response => {
                setData(response);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const statusTicketMapTitle = () => {
        let obj: Ticket[][] = [];
        allStatus.forEach(status => {
            let tmp = data?.tickets.filter(ticket => ticket.status.toLowerCase() === status.toLowerCase());
            tmp?.sort(cmpTitle);
            obj.push(tmp!);
        });
        setTicketMap(obj);
    };

    const statusTicketMapPriority = () => {
        let obj: Ticket[][] = [];
        allStatus.forEach(status => {
            let tmp = data?.tickets.filter(ticket => ticket.status.toLowerCase() === status.toLowerCase());
            tmp?.sort(cmpPriority);
            obj.push(tmp!);
        });
        setTicketMap(obj);
    };

    const userTicketMapTitle = () => {
        let obj: Ticket[][] = [];
        data?.users.forEach(user => {
            let tmp = data?.tickets.filter(ticket => ticket.userId === user.id);
            tmp?.sort(cmpTitle);
            obj.push(tmp);
        });
        setTicketMap(obj);
    };

    const userTicketMapPriority = () => {
        let obj: Ticket[][] = [];
        data?.users.forEach(user => {
            let tmp = data?.tickets.filter(ticket => ticket.userId === user.id);
            tmp?.sort(cmpPriority);
            obj.push(tmp);
        });
        setTicketMap(obj);
    };

    const priorityTicketMapTitle = () => {
        let obj: Ticket[][] = [];
        priorityLevels.forEach(priority => {
            let tmp = data?.tickets.filter(ticket => ticket.priority === priority);
            tmp?.sort(cmpTitle);
            obj.push(tmp!);
        });
        setTicketMap(obj);
    };

    const priorityTicketMapPriority = () => {
        let obj: Ticket[][] = [];
        priorityLevels.forEach(priority => {
            let tmp = data?.tickets.filter(ticket => ticket.priority === priority);
            tmp?.sort(cmpPriority);
            obj.push(tmp!);
        });
        setTicketMap(obj);
    };

    useEffect(() => {
        if (grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority();
        } else if (grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle();
        } else if (grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority();
        } else if (grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle();
        } else if (grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority();
        } else if (grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle();
        }
    }, [grouping, ordering]);

    // Initial render based on data
    useEffect(() => {
        if (grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority();
        } else if (grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle();
        } else if (grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority();
        } else if (grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle();
        } else if (grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority();
        } else if (grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle();
        }
    }, [data]);
    useEffect(() => {
        console.log(ticketMap)
    }, [ticketMap])
    if (isLoading) {
        return (<div className='loader' />
        )
    }

    return (
        ticketMap && ticketMap.length && ticketMap[0] ?
            <div className='dashboard-main'>
                {grouping === "Status" ?
                    ticketMap.map((ticketList, key) => {
                        return (
                            <div className='dashboard-list' key={key}>
                                <div className='dashboard-list-header-controls'>
                                    <div className='dashboard-list-header-controls-info'>
                                        {statusIcons[allStatus[key]]}
                                        <p className='dashboard-list-header'>{allStatus[key]}</p>
                                    </div>
                                    {(
                                        <div>
                                            <AddIcon />
                                            <MenuIcon />
                                        </div>
                                    )}
                                </div>
                                <div className='list-main'>
                                    {ticketList.map((ticket, key) => {
                                        return <TaskCard key={key} title={ticket.title} id={ticket.id} status={ticket.status} priority={ticket.priority} tags={ticket.tag ? ticket.tag : []} />
                                    })}
                                </div>
                            </div>
                        )
                    }) :
                    grouping === 'User' ?
                        ticketMap.map((ticketList, key) => (
                            <div className='dashboard-list' key={key}>
                                <div className='dashboard-list-header-controls'>
                                    <div className='dashboard-list-header-controls-info'>
                                        <div className='profileOutline' />
                                        <p className='dashboard-list-header'>{data?.users[key].name}</p>
                                        <div className='dashboard-list-items-count'>{ticketList.length}</div>
                                    </div>
                                    {(
                                        <div>
                                            <AddIcon />
                                            <MenuIcon />
                                        </div>
                                    )}
                                </div>
                                <div className='list-main'>
                                    {ticketList.map((ticket, key) => {
                                        return <TaskCard key={key} title={ticket.title} id={ticket.id} status={ticket.status} priority={ticket.priority} tags={ticket.tag ? ticket.tag : []} />
                                    })}
                                </div>
                            </div>
                        )) :
                        grouping === 'Priority' ?
                            ticketMap.map((ticketList, key) => (
                                <div className='dashboard-list' key={key}>
                                    <div className='dashboard-list-header-controls'>
                                        <div className='dashboard-list-header-controls-info'>
                                            {prioritiesIcon[priorityLevels[4 - key]]}
                                            <p className='dashboard-list-header'>{priorities[key]}</p>
                                            <div className='dashboard-list-items-count'>{ticketList.length}</div>
                                        </div>
                                        {(
                                            <div>
                                                <AddIcon />
                                                <MenuIcon />
                                            </div>
                                        )}
                                    </div>
                                    <div className='list-main'>
                                        {ticketList.map((ticket, key) => {
                                            return <TaskCard key={key} title={ticket.title} id={ticket.id} status={ticket.status} priority={ticket.priority} tags={ticket.tag ? ticket.tag : []} />
                                        })}
                                    </div>
                                </div>
                            )) : <span></span>
                }
            </div> : <></>
    );
}

export default Home