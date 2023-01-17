const express = require("express");
const router = express.Router();
const { Process } = require("../models/ProcessModel");

router.get("/:id", (req,res) => {
    (async () => {
        let id = parseInt(req.params.id);
        if(Number.isNaN(id)){
            res.status(400)
            res.send("Please check your request, id should be number")
            return;
        }

        let result = await Process.getFavProcesses(id);

        if(!result){
            res.status(501);
            res.send("Problems with server .Please try again later.");
        }
        res.send(result);

    })();
})

router.get("/user/:userid", (req,res) => {
    (async () => {

        let userId=parseInt(req.params.userid);

        if(Number.isNaN(userId)){
            res.status(400)
            res.send("Please check your request, id should be number")
            return;
        }

        let result = await Process.getUserFavProcess(userId);
        console.log(result);
        if(!result){
            res.status(501);
            res.send("Server error. Try again later");
            return;
        }

        res.send(result);

    })();
});

router.post("/", (req,res) => {
    (async () => {
        let processId = req.body.processId;
        let userId = req.body.userId;

        if(processId === undefined || userId === undefined){
            res.status(501);
            res.send("Something went wrong");
            return;
        }

        let result = Process.saveFav(processId,userId);

        if(result) res.send("ok");
        else{
            res.status(501);
            res.send("Problems with server. Try again later");
        }

    })();
});

router.delete("/", (req,res) => {
    (async () => {
        let processId = req.body.processId;
        let userId = req.body.userId;

        let result = Process.deleteFav(processId,userId);

        if(result) res.send("Favourites successfully removed");
        else{
            res.status(501);
            res.send("Problems with server. Try again later");
        }

    })();
});


module.exports = router;
