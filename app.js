import express from 'express';
const app = express()
const PORT = process.env.PORT || 8080
import { getNotes, getNote, createNote } from './database.js';

// middleware parse json
app.use(express.json())

app.get('/notes', async (req,res)=>{
    const notes = await getNotes()
    res.send(notes)
})

app.get('/notes/:id', async (req,res)=>{
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post('/notes', async (req,res)=>{
    const {title, contents} = req.body 
    const note = await createNote(title, contents)
    res.statusCode(201).send(note)
})

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Somthong broke')
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})