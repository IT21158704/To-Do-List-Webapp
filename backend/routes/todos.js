const router = require("express").Router();
const { response } = require("express");
let ToDo = require("../models/todo");

router.route("/add").post((req,res)=>{

    const todo = req.body.item;

    const newTodo = new ToDo({
        todo,
    })

    newTodo.save().then(()=>{
        res.json("Item Aded")
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/").get((req,res)=>{

    ToDo.find().then((todos)=>{
        res.json(todos)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req, res) =>{
    let todoId = req.params.id;
    const {todo} = req.body;

    const updateToDo = {
        todo
    }

    const update = await ToDo.findByIdAndUpdate(todoId, updateToDo)
    .then(()=>{
        res.status(200).send({status: "Item Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data",error:err.message});
    })
})

//Delete User by ID
router.route("/delete/:id").delete(async (req, res) => {
    let todoId = req.params.id;

    await ToDo.findByIdAndDelete(todoId)
    .then(() => {
        res.status(200).send({status: "Item deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete item",error:err.message})
    })
})


router.route("/get/:id").get(async(req, res) =>{
    let todoId = req.params.id;
    const todo = await ToDo.findById(todoId)
    .then((todo)=>{
        res.status(200).send({status: "Item fetched", todo})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Item",error:err.message})
    })
})

module.exports = router;