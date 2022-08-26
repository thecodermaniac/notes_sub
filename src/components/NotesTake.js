import React, { useRef, useState } from 'react'
import { db } from '../firebase'
import {
    collection, addDoc, where, onSnapshot, query, doc, updateDoc,
} from 'firebase/firestore'
import NotesCard from './NotesCard'


function NotesTake({ Subject }) {
    let refr = useRef()
    localStorage.setItem('subject', Subject)
    const [currid, setcurrid] = useState(null)
    const notesdb = collection(db, 'notes')
    const [categorynotes, setcatNotes] = useState([])
    const [notes, setnotes] = useState({
        subject: localStorage?.getItem('subject'),
        title: "",
        body: ""
    })

    const [editnotes, seteditnotes] = useState({
        subject: '',
        title: '',
        body: ''
    })

    const q = query(notesdb, where("subject", "==", localStorage?.getItem('subject')))
    onSnapshot(q, (snapshot) => {
        var notearr = []
        snapshot.docs.forEach((doc) => {
            notearr.push({ ...doc.data(), id: doc.id })
        })
        setcatNotes(notearr)
    })
    const updateNote = (curnote) => {
        console.log(curnote.id);
        setcurrid(curnote.id)
        seteditnotes({ title: curnote.title, subject: curnote.subject, body: curnote.body })
        refr.current.click()
    }
    const handleupdate = async () => {
        await updateDoc(doc(db, "notes", currid), { title: editnotes.title, body: editnotes.body, subject: editnotes.subject });
    }

    const handleclick = async (e) => {
        e.preventDefault()
        console.log(Subject);
        await addDoc(collection(db, "notes"), {
            subject: notes.subject,
            title: notes.title,
            body: notes.body

        })
        console.log(notes);
        setnotes({title:'',body:''})
    }
    return (
        <>
            <button ref={refr} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update your note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">New Title</label>
                                    <input type="text" class="form-control" placeholder="Generic subject title" onChange={(e) => { seteditnotes({ ...editnotes, title: e.target.value }) }} value={editnotes.title} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Full Notes...</label>
                                    <textarea class="form-control" rows="3" onChange={(e) => { seteditnotes({ ...editnotes, body: e.target.value }) }} value={editnotes.body} />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-outline-secondary" onClick={handleupdate}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <form className='container'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Generic subject title" onChange={(e) => { setnotes({ ...notes, title: e.target.value }) }} value={notes.title}/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Full Notes...</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setnotes({ ...notes, body: e.target.value }) }} value={notes.body}/>
                </div>
                <button type="submit" class="btn btn-outline-secondary" onClick={handleclick}>Add Notes</button>
            </form>

            {/* categorywise show of notes */}
            {
                categorynotes.map((note) => {
                    return <NotesCard note={note} key={note.id} updateNote={updateNote} />
                })
            }

        </>
    )
}

export default NotesTake