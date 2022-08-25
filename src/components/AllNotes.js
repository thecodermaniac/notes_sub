import React, { useEffect, useState } from 'react'
import NotesCard from './NotesCard'
import { db } from '../firebase'
import {
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore'

function AllNotes() {
  const [notesarr, setnotesarr] = useState([])
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
    notesarr.map((note) => {
      return <NotesCard note={note} key={note.id}/>
    })

  )
}

export default AllNotes