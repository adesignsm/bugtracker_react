import React, { FormEvent } from "react";
import "./style.css";
import { useState } from "react";
import { BugPriority, IBug } from "./IBug";
import { v4 as uuid } from "uuid";
import BugListTable from "./BugListTable.tsx";

const App = () => {
    const [BugDescription, setBugDescription] = useState<string>("");
    const [BugPriority, setBugPriority] = useState<string>("Medium");
    const [Assignee, setAssignee] = useState<string>("");
    const [BugList, setBugList] = useState<IBug[]>([]);

    const AddBug = (event: FormEvent) => {

        event.preventDefault();

        const newBug: IBug = {
            id: uuid(),
            description: BugDescription,
            priority: BugPriority as BugPriority,
            assignee: Assignee
        }

        console.log(newBug.id, newBug.description, newBug.priority, newBug.assignee);

        setBugList([
            ...BugList,
            newBug
        ]);

        setBugDescription("");
        setBugPriority("Medium");
    }

    const DeleteBug = (id: string) => {

        const bugs = BugList.filter(bug => bug.id !== id);
        setBugList(bugs);
    }

    return (
        <div>
            <BugListTable bugs = {BugList} onDeleteBug = {(id: string) => DeleteBug(id)} />

            <div id = "bug-form">
                <h1> 🖥 Bugtracker 🖥 </h1>
                <form onSubmit = {AddBug}>
                    <label htmlFor = "bugDescription"> New bug discription: </label>
                    <input type = "text" id = "bugDescription" value = {BugDescription} onChange = {
                        event => setBugDescription(event.target.value)
                    } />

                    <label htmlFor = "bugPriority"> Priority Level: </label>
                    <select id = "bugPriority" value = {BugPriority} onChange = {event => setBugPriority(event.target.value)}>
                        <option value = "LOW"> Low </option>
                        <option value = "MEDIUM"> Medium </option>
                        <option value = "HIGH"> High </option>
                    </select>

                    <label htmlFor = "bugAssignee"> Assigned to: </label>
                    <input type = "text" id = "bugAssignee" value = {Assignee} onChange = {
                        event => setAssignee(event.target.value)
                    } />

                    <button id = "submit-button" type = "submit"> Add this bug </button>
                </form>
            </div>
        </div>    
    )
}

export default App;