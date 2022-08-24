import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import NotesCard from './NotesCard'

function NotesTake({ Subject }) {
    const [notes, setnotes] = useState({
        subject: Subject,
        title: "",
        body: ""
    })
    const handleclick = (e) => {
        e.preventDefault()
        console.log(Subject);

        console.log(notes);
    }
    return (
        <>
            <form className='container' onSubmit={handleclick}>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Generic subject title" onChange={(e) => { setnotes({ ...notes, title: e.target.value }) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Full Notes...</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setnotes({ ...notes, body: e.target.value }) }} />
                </div>
                <button type="submit" class="btn btn-outline-secondary">Add Notes</button>
            </form>

            {/* categorywise show of notes */}
            <NotesCard />
        </>
    )
}

export default NotesTake