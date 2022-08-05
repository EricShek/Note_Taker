const router=require("express").Router()
const fs=require("fs")
const db=require("../db/db.json")
const path=require("path")

router.get("/api/notes",(req,res)=>{
     res.json(db.slice(1))
})

const createNote = (body, notesArr) =>{
    const newNote = body;
    if (!Array.isArray (notesArr)){
        notesArr = []
    }
    if (notesArr.length === 0 ){
        notesArr.push(0)
    }
    body.id = notesArr.length
    notesArr[0]++
    notesArr.push(newNote)
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesArr, null, 2) 
    );

        return newNote
}

router.post("/api/notes", (req, res)=>{
    
     const newNote = createNote(req.body, db) 
     res.json(newNote)   
})

const deleteNote = (id, notesArr)=>{
    for (let i = 0; i < notesArr.length; i++) {
        let note = notesArr[i]
        if (note.id == id ){
            notesArr.splice(i, 1)
            
            fs.writeFileSync(
                path.join(__dirname, "../db/db.json"),
                JSON.stringify(notesArr, null, 2) 
            );
                    break
        }
    }
}

router.delete("/api/notes/:id", (req, res)=> {
    deleteNote (req.params.id, db)
    res.json(true)

})

module.exports=router