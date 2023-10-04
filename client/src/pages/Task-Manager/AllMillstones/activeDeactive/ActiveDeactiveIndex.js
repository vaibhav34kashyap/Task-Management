import React, { useState } from 'react'
import DeactivatedMilstoneTable from './deactivated/DeactivatedMilstoneTable'
import ActiveMilstoneTable from './activeMilstone/ActiveMilstoneTable'
const ActiveDeactiveIndex = () => {
    const [connectActive, setConnectActive] = useState(false)
    const connectMilstone = () => {
        setConnectActive(!connectActive)
    }

    return (
        <div>
            <div className='d-flex mt-2'>
                <div><button className={!connectActive ? 'btn btn-primary active' : "btn"} onClick={() => { connectMilstone() }}>
                    Active
                </button></div>
                <div className='ms-2 '><button className={!connectActive ? 'btn' : "btn btn-primary active"} onClick={() => { connectMilstone() }}>
                    Deactive
                </button></div>
            </div>
            {connectActive ? <div>
                <DeactivatedMilstoneTable />
            </div> : <div>
                <ActiveMilstoneTable />
            </div>}


        </div>
    )
}

export default ActiveDeactiveIndex