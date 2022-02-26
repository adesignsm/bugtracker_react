import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { BugPriority, IBug } from "./IBug";
import { v4 as uuid } from "uuid";
import {Route, Routes} from "react-router-dom";
import { useNavigate } from "react-router";
import BugListTable from "./BugListTable.tsx";

import "./style.css";

const App = () => {
    const navigate = useNavigate();

    const [BugDescription, setBugDescription] = useState<string>("");
    const [BugPriority, setBugPriority] = useState<string>();
    const [Assignee, setAssignee] = useState<string>("");
    const [Color, setColor] = useState<string>("");
    const [BugList, setBugList] = useState<IBug[]>([]);

    const AddBug = async (event: FormEvent) => {

        event.preventDefault();

        const newBug: IBug = {
            id: uuid(),
            description: BugDescription,
            priority: BugPriority as BugPriority,
            assignee: Assignee,
            color: Color
        } 

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newBug),
        
        }).catch(error => {

            console.log(error);
            return;
        }); 
    
        setBugList([
            ...BugList,
            newBug,
        ]);

        setBugDescription("");
        setAssignee("");
        setBugPriority("DEFAULT");

        navigate("/");

        //work around
        localStorage.setItem(newBug.id, JSON.stringify(newBug));
    }

    useEffect(() => {
        console.log(localStorage);

        BugListTable
    }, []);

    const PriorityFuncs = (event) => {

        let priorityValue = event.target.value;

        setBugPriority(event.target.value);

        if (priorityValue === "LOW") {
            console.log("low detect");
            setColor("#77DD77");
        
        } else if (priorityValue === "MEDIUM") {
            console.log("medium detect");
            setColor("#FDFD96");
        
        } else if (priorityValue === "HIGH") {
            console.log("high detect");
            setColor("#FF6961");
        }
 
    }

    const DeleteBug = (id: string) => {

        localStorage.removeItem(id);

        const bugs = BugList.filter(bug => bug.id !== id);
        setBugList(bugs);
    }

    return (
        <div>
            <div id = "bug-form">
                <h1 style = {{color: "#fff"}}> 🖥 ADM Bugtracker. </h1>
                <form onSubmit = {AddBug}>
                    <label htmlFor = "bugDescription"> 📝 New bug description </label>
                    <input required type = "text" id = "bugDescription" value = {BugDescription} onChange = {
                        event => setBugDescription(event.target.value)
                    } />

                    <label htmlFor = "bugAssignee"> 👤 Assigned to </label>
                    <input required type = "text" id = "bugAssignee" value = {Assignee} onChange = {
                        event => setAssignee(event.target.value)
                    } />

                    <label htmlFor = "bugPriority"> 📈 Priority Level </label>
                    <select required id = "bugPriority" value = {BugPriority} onChange = {event => PriorityFuncs(event)}>
                        <option value = "DEFAULT"> Select a level </option>
                        <option value = "LOW"> Low </option>
                        <option value = "MEDIUM"> Medium </option>
                        <option value = "HIGH"> High </option>
                    </select>

                    <button id = "submit-button" type = "submit"> Add this bug </button>
                </form>
            </div>

            <div id = "table-container">
                <h1> 👾 Bug List Table. </h1>
                <BugListTable bugs = {BugList} onDeleteBug = {(id: string) => DeleteBug(id)} />
            </div>
        </div>    
    )
}

export default App;