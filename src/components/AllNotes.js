import React, { useEffect, useState,useRef } from 'react'
import NotesCard from './NotesCard'
import { db } from '../firebase'
import {
  collection,
  query,
  onSnapshot, doc, updateDoc,
} from 'firebase/firestore'

function AllNotes() {
  let refr = useRef()
  const [currid, setcurrid] = useState(null)
  const [notesarr, setnotesarr] = useState([])
  const [editnotes, seteditnotes] = useState({
    subject: '',
    title: '',
    body: ''
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

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      setnotesarr(notesArray);
    });
    return () => unsub();
  }, [])

  console.log(notesarr);

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
      {notesarr.map((note) => {
        return <NotesCard note={note} key={note.id} updateNote={updateNote} />
      })}
    </>
  )
}

export default AllNotes