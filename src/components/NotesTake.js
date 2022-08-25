import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, where, onSnapshot, query } from 'firebase/firestore'
import NotesCard from './NotesCard'

function NotesTake({ Subject }) {
    localStorage.setItem('subject', Subject)
    const notesdb = collection(db, 'notes')
    const [categorynotes, setcatNotes] = useState([])
    const [notes, setnotes] = useState({
        subject: localStorage?.getItem('subject'),
        title: "",
        body: ""
    })

    const q = query(notesdb, where("subject", "==", localStorage?.getItem('subject')))
    onSnapshot(q, (snapshot) => {
        var notearr = []
        snapshot.docs.forEach((doc) => {
            notearr.push({ ...doc.data(), id: doc.id })
        })
        setcatNotes(notearr)
    })


    const handleclick = async (e) => {
        e.preventDefault()
        console.log(Subject);
        await addDoc(collection(db, "notes"), {
            subject: notes.subject,
            title: notes.title,
            body: notes.body

        })
        setnotes({ subject: Subject, title: "", body: "" })
        console.log(notes);
    }
    return (
        <>
            <form className='container'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Generic subject title" onChange={(e) => { setnotes({ ...notes, title: e.target.value }) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Full Notes...</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setnotes({ ...notes, body: e.target.value }) }} />
                </div>
                <button type="submit" class="btn btn-outline-secondary" onClick={handleclick}>Add Notes</button>
            </form>

            {/* categorywise show of notes */}
            {
                categorynotes.map((note) => {
                    return <NotesCard note={note} key={note.id} />
                })
            }

        </>
    )
}

export default NotesTake