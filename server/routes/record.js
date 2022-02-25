const express = require("express");
const recordRoutes = express.Router(); //middleware
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//get all data from db
recordRoutes.route("/record").get((req, res) => {
    
    let db_connect = dbo.getDb("bugs");
    
    db_connect
      .collection("records")
      .find({})
      .toArray((error, result) => {
        if (error) throw error;
        res.json(result);
      });
  });

//get data by its id
recordRoutes.route("/record/:id").get((req, res) => {
    
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    
    db_connect.collection("records").findOne(myquery, (error, result) => {
        if (error)throw error;
        res.json(result);
    });
});

//post data to the db
recordRoutes.route("/record/add").post((req, response) => {
    
    let db_connect = dbo.getDb();

    let bug_obj = {
        bugDescription: req.body.bug_description,
        bugAssignee: req.body.bug_assignee,
        bugPriority: req.body.bug_priority
    };
    
    db_connect.collection("records").insertOne(bug_obj, (error, res) => {

        if (error) throw error;
        response.json(res);
    });
});

//update data by its id
recordRoutes.route("/update/:id").post((req, response) => {

    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };

    let newvalues = {
        $set: {
            bug_description: req.body.bug_description,
            bug_assignee: req.body.bug_assignee,
            bug_priority: req.body.bug_priority,
        },
    };

    db_connect.collection("records").updateOne(myquery, newvalues, (error, res) => {
        if (error) throw error;
        console.log("1 document updated");
        response.json(res);
    });
});

//delete data
recordRoutes.route("/:id").delete(function (req, response) {

    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
        
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;