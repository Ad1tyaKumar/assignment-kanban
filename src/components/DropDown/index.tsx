import React, { SetStateAction } from 'react'
import './index.css'

interface PropTypes {
    setGrouping: React.Dispatch<SetStateAction<string>>,
    setOrdering: React.Dispatch<SetStateAction<string>>,
}

let groupingOptions = ['Status', 'User', 'Priority']
let orderingOptions = ['Title', 'Priority']

const index = ({
    setGrouping,
    setOrdering
}: PropTypes) => {
    return (
        <div className='dropDownContent'>
            <div>
                Grouping
                <select id='grouping' onChange={e => { localStorage.setItem("grouping", e.target.value); setGrouping(e.target.value) }}>
                    {localStorage.getItem('grouping') && <option>{localStorage.getItem('grouping')}</option>}
                    {groupingOptions.map((group, key) => {
                        return localStorage.getItem('grouping') !== group && <option key={key} value={group}>{group}</option>
                    })}
                </select>
            </div>
            <div>
                Ordering
                <select id="ordering" onChange={e => {localStorage.setItem("ordering", e.target.value );setOrdering(e.target.value)}}>
                  {localStorage.getItem('ordering') && <option>{localStorage.getItem('ordering')}</option>}
                  {orderingOptions.map((order, key) => {
                    return localStorage.getItem('ordering') !== order && <option key={key} value={order}>{order}</option>
                  })}
                </select>
            </div>
        </div>
    )
}

export default index