import React, { useRef, useState } from 'react'
import { db } from '../firebase'
import {
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'

function NotesCard(props) {

    let refr = useRef()
    const { note } = props
    const [notes, setnotes] = useState({
        subject: note.subject,
        title: note.title,
        body: note.body
    })
    const handledelete = async () => {
        await deleteDoc(doc(db, "notes", note.id));
    }
    const handleupdate = () => {
        setnotes({ subject: note.subject, title: note.title, body: note.body })
        refr.current.click()
    }
    const handleclick = async() => {
        console.log(note.id);
        await updateDoc(doc(db, "notes", note.id), { title: notes.title, body: notes.body, subject: notes.subject });
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
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">New Title</label>
                                <input type="text" class="form-control" placeholder="Generic subject title" onChange={(e) => { setnotes({ ...notes, title: e.target.value }) }}  />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Full Notes...</label>
                                <textarea class="form-control" rows="3" onChange={(e) => { setnotes({ ...notes, body: e.target.value }) }}  />
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-outline-secondary" onClick={handleclick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-3'>
                <div class="card w-100">
                    <div class="card-body">
                        <span class="badge rounded-pill bg-primary">{note.subject}</span>
                        <h5 class="card-title">{note.title}</h5>
                        <p class="card-text">{note.body}</p>
                        <button className='btn btn-outline-success' onClick={handleupdate}>Edit</button>
                        <button className='btn btn-outline-warning' onClick={handledelete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesCard