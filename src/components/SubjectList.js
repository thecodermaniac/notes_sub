import React from 'react'
import {
    Link
} from "react-router-dom";

function SubjectList({setSubject}) {
    return (
        <>
            <div className='container'>
                <div class="d-flex justify-content-around">
                    <Link to="/math"><button type="button" class="btn btn-primary btn-lg" onClick={()=>{setSubject('Math')}}>Math</button></Link>
                    <Link to="/english"><button type="button" class="btn btn-secondary btn-lg" onClick={()=>{setSubject('English')}}>English</button></Link>
                    <Link to="/science"><button type="button" class="btn btn-secondary btn-lg" onClick={()=>{setSubject('Science')}}>Science</button></Link>
                    <Link to="/history"><button type="button" class="btn btn-secondary btn-lg" onClick={()=>{setSubject('History')}}>History</button></Link>
                </div>
            </div>
        </>
    )
}

export default SubjectList