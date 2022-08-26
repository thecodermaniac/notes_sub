import React, { useEffect, useState, useRef } from 'react'
import NotesCard from './NotesCard'
import { db } from '../firebase'
import {
  collection,
  query,
  onSnapshot, doc, updateDoc,
} from 'firebase/firestore'

function AllNotes() {
  let refr = useRef()
  const [load, setload] = useState(true)
  const [currid, setcurrid] = useState(null)
  const [notesarr, setnotesarr] = useState([])
  const [editnotes, seteditnotes] = useState({
    subject: '',
    title: '',
    body: ''
  })
  const updateNote = (curnote) => {
    // console.log(curnote.id);
    setcurrid(curnote.id)
    seteditnotes({ title: curnote.title, subject: curnote.subject, body: curnote.body })
    refr.current.click()
  }

  const handleupdate = async () => {

    await updateDoc(doc(db, "notes", currid), { title: editnotes.title, body: editnotes.body, subject: editnotes.subject })
  
  }

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      setnotesarr(notesArray);
      setload(true)
    });
    return () => unsub();
  }, [])

  // console.log(notesarr);

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
      {notesarr.length === 0 ? <div className="container mt-4">
        <p className="text-white fs-5 font-monospace">Empty...</p></div> : <div className="container mt-4">
        <p className="text-white fs-5 font-monospace">Notes of all Subjects.</p></div>}
      {!load ? <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-light" role="status">
        <span className="sr-only"></span>
      </div></div> : notesarr.map((note) => {
        return <NotesCard note={note} key={note.id} updateNote={updateNote} />
      })}

    </>
  )
}

export default AllNotes