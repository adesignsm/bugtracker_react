import React from "react";
import "./style.css";
import { useState } from "react";
import { IBug } from "./IBug";

const App = () => {
    const [bugDescription, setBugDescription] = useState<string>("");
    const [bugPriority, setBugPriority] = useState<string>("Medium");
    const [bugList, setBugList] = useState<IBug[]>([]);

    const AddBug = () => {
        
    }

    const DeleteBug = () => {

    }

    return (
        <>
            <h1> 🖥 Bugtracker </h1>

            <div id = "bug-form">
                <form onSubmit = {AddBug}>
                    <label htmlFor = "bugDescription"> New bug discription: </label>
                    <input type = "text" id = "bugDescription" value = {bugDescription} onChange = {
                        event => setBugDescription(event.target.value)
                    } />

                    <label htmlFor = "bugPriority"> Priority Level: </label>
                    <select id = "bugPriority" value = {bugPriority} onChange = {event => setBugPriority(event.target.value)}>
                        <option value = "LOW"> Low </option>
                        <option value = "MEDIUM"> Medium </option>
                        <option value = "HIGH"> High </option>
                    </select>

                    <button type = "submit"> Add this bug </button>
                </form>
            </div>
        </>    
    )
}

export default App;