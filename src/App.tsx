import React, { FormEvent } from "react";
import "./style.css";
import { useState, useEffect } from "react";
import { BugPriority, IBug } from "./IBug";
import { v4 as uuid } from "uuid";
import BugListTable from "./BugListTable.tsx";

const App = () => {
    const [BugDescription, setBugDescription] = useState<string>("");
    const [BugPriority, setBugPriority] = useState<string>();
    const [Assignee, setAssignee] = useState<string>("");
    const [Color, setColor] = useState<string>("");
    const [BugList, setBugList] = useState<IBug[]>([]);

    const AddBug = (event: FormEvent) => {

        event.preventDefault();

        const newBug: IBug = {
            id: uuid(),
            description: BugDescription,
            priority: BugPriority as BugPriority,
            assignee: Assignee,
            color: Color
        }

        setBugList([
            ...BugList,
            newBug,
        ]);

        setBugDescription("");
        setAssignee("");
    }

    const PriorityFuncs = (event) => {

        let priorityValue = event.target.value;

        setBugPriority(event.target.value);

        if (priorityValue == "LOW") {
            console.log("low detect");
            setColor("green");
        
        } else if (priorityValue == "MEDIUM") {
            console.log("medium detect");
            setColor("yellow");
        
        } else if (priorityValue == "HIGH") {
            console.log("high detect");
            setColor("red");
        }
 
    }

    const DeleteBug = (id: string) => {

        const bugs = BugList.filter(bug => bug.id !== id);
        setBugList(bugs);
    }

    return (
        <div>
            <div id = "table-container">
                <BugListTable bugs = {BugList} onDeleteBug = {(id: string) => DeleteBug(id)} />
            </div>

            <div id = "bug-form">
                <h1 style = {{color: "#fff"}}> 🖥 Bugtracker 🖥 </h1>
                <form onSubmit = {AddBug}>
                    <label htmlFor = "bugDescription"> 📝 New bug description </label>
                    <input required type = "text" id = "bugDescription" value = {BugDescription} onChange = {
                        event => setBugDescription(event.target.value)
                    } />

                    <label htmlFor = "bugAssignee"> 👤 Assigned to </label>
                    <input required type = "text" id = "bugAssignee" value = {Assignee} onChange = {
                        event => setAssignee(event.target.value)
                    } />

                    <label htmlFor = "bugPriority"> 🪲 Priority Level </label>
                    <select required id = "bugPriority" value = {BugPriority} onChange = {event => PriorityFuncs(event)}>
                        <option value = "DEFAULT"> Select a level </option>
                        <option value = "LOW"> Low </option>
                        <option value = "MEDIUM"> Medium </option>
                        <option value = "HIGH"> High </option>
                    </select>

                    <button id = "submit-button" type = "submit"> Add this bug </button>
                </form>
            </div>
        </div>    
    )
}

export default App;