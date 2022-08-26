import React from 'react'
import {
    Link
} from "react-router-dom";

function SubjectList({ setSubject }) {
    return (
        <>
            <div className='container mt-4'>
                <div className="d-flex justify-content-center">
                    <p className="text-white fs-3 font-monospace">Tap on any button to add notes in that category</p></div>

                <div className="d-flex justify-content-around flex-wrap">
                    <Link to="/math"><button type="button" className="btn btn-light mt-2 font-monospace" onClick={() => { setSubject('Math') }}>Math</button></Link>
                    <Link to="/english"><button type="button" className="btn btn-light mt-2 font-monospace" onClick={() => { setSubject('English') }}>English</button></Link>
                    <Link to="/science"><button type="button" className="btn btn-light mt-2 font-monospace" onClick={() => { setSubject('Science') }}>Science</button></Link>
                    <Link to="/history"><button type="button" className="btn btn-light mt-2 font-monospace" onClick={() => { setSubject('History') }}>History</button></Link>
                </div>
            </div>
        </>
    )
}

export default SubjectList