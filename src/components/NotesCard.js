import React, { useRef, useState } from 'react'
import { db } from '../firebase'
import {doc,deleteDoc} from 'firebase/firestore'

function NotesCard(props) {

    const { note,updateNote } = props
    const handledelete = async () => {
        await deleteDoc(doc(db, "notes", note.id));
    }
    return (
        <>

            <div className='container mt-3'>
                <div class="card w-100">
                    <div class="card-body">
                        <span class="badge rounded-pill bg-primary">{note.subject}</span>
                        <h5 class="card-title">{note.title}</h5>
                        <p class="card-text">{note.body}</p>
                        <button className='btn btn-outline-success' onClick={() => { updateNote(note) }}>Edit</button>
                        <button className='btn btn-outline-warning' onClick={handledelete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesCard