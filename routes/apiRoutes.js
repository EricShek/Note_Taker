const router=require("express").Router()
const fs=require("fs")
const db=require("../db/db.json")

router.get("/api/notes",(req,res)=>{
     res.json(db)
})


router.post("/api/notes", (req, res)=>{
    db
    .getNotes()
    .then(notes => res.json(notes))

    console.log(req.body)



    //db is array, think about array function to add new element or value of an array
    //think about update the revised db with new data into the db.json file
    
})

module.exports=router