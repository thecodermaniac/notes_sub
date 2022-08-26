import React, { useRef, useState } from 'react'
import { db } from '../firebase'
import {
    collection, addDoc, where, onSnapshot, query, doc, updateDoc,
} from 'firebase/firestore'
import NotesCard from './NotesCard'


function NotesTake({ Subject }) {
    let refr = useRef()
    const [load, setload] = useState(true)
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
        setload(false)
        var notearr = []
        snapshot.docs.forEach((doc) => {
            notearr.push({ ...doc.data(), id: doc.id })
        })
        setcatNotes(notearr)
        setload(true)
    })
    const updateNote = (curnote) => {
        console.log(curnote.id);
        setcurrid(curnote.id)
        seteditnotes({ title: curnote.title, subject: curnote.subject, body: curnote.body })
        refr.current.click()
    }
    const handleupdate = async () => {
        setload(true)
        await updateDoc(doc(db, "notes", currid), { title: editnotes.title, body: editnotes.body, subject: editnotes.subject });
        setload(false)
    }

    const handleclick = async (e) => {
        e.preventDefault()
        console.log(Subject);
        setload(false)
        await addDoc(collection(db, "notes"), {
            subject: notes.subject,
            title: notes.title,
            body: notes.body

        })
        console.log(notes);
        setload(true)
    }
    return (
        <>
            <button ref={refr} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update your note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">New Title</label>
                                    <input type="text" className="form-control" placeholder="Generic subject title" onChange={(e) => { seteditnotes({ ...editnotes, title: e.target.value }) }} value={editnotes.title} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Full Notes...</label>
                                    <textarea className="form-control" rows="3" onChange={(e) => { seteditnotes({ ...editnotes, body: e.target.value }) }} value={editnotes.body} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-outline-secondary" onClick={handleupdate}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <p className="text-white fs-3 font-monospace">Add {localStorage?.getItem('subject')} Notes</p></div>
            <form className='container'>
                <div className="mt-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label text-white fs-4 font-monospace">Topic</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Generic subject title" onChange={(e) => { setnotes({ ...notes, title: e.target.value }) }} required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label text-white fs-4 font-monospace">Full Notes...</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setnotes({ ...notes, body: e.target.value }) }} required={true} />
                </div>
                <button type="submit" className="btn btn-light" onClick={handleclick}>Add Notes</button>
            </form>
            {categorynotes.length === 0 ? <div className="container mt-4">
                <p className="text-white fs-5 font-monospace">Empty...</p></div> : <div className="container mt-4">
                <p className="text-white fs-5 font-monospace">Notes of {localStorage?.getItem('subject')}</p></div>}
            {/* categorywise show of notes */}
            {!load ? <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-light" role="status">
                <span className="sr-only"></span></div></div> :
                categorynotes.map((note) => {
                    return <NotesCard note={note} key={note.id} updateNote={updateNote} />
                })
            }

        </>
    )
}

export default NotesTake