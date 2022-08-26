import React from 'react'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'

function NotesCard(props) {

    const { note, updateNote } = props
    const handledelete = async () => {
        await deleteDoc(doc(db, "notes", note.id));
    }
    return (
        <>

            <div className='container mt-4'>
                <div className="card w-100" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", backdropFilter:"blur(20px)",border:"4px",borderStyle:"solid", borderColor: "rgba(255, 255, 255, 0.1)",color:"rgba(255, 255, 255, 0.8)", borderRadius:"5px"}}>
                <div className="card-body">
                    <span className="badge rounded-pill bg-light text-danger font-monospace">{note.subject}</span>
                    <h4 className="card-title font-monospace">Topic:- {note.title}</h4>
                    <p className="card-text font-monospace">Content:- <br/> {note.body}</p>
                    <div className="d-flex justify-content-around">
                        <button className='btn btn-light font-monospace' onClick={() => { updateNote(note) }}>Edit</button>
                        <button className='btn btn-light font-monospace' onClick={handledelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default NotesCard