import { IBug } from "./IBug";
import { useEffect, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

import "./style.css"

const BugListTable = (props: {bugs: IBug[], onDeleteBug: Function}) => {
    
    const [bugList, setBugList] = useState({});
    let {bugs, onDeleteBug} = props;

    const resolvePressed = (id: string) => {
        onDeleteBug(id);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th> Description: </th>
                    <th> Priority: </th>
                    <th> Assignee: </th>
                </tr>
            </thead>

            <tbody>
                {bugs.length === 0 && <tr><td></td></tr>}
                {bugs.length > 0 && bugs.map(bug => 
                    <tr key = {bug.id} style = {{borderBottom: "1px solid #fff"}}>
                        <td style = {{borderBottom: "1px solid #fff", paddingRight: "100px"}}> {bug.description} </td>
                        <td style = {{borderBottom: "1px solid #fff", color: bug.color, paddingRight: "100px"}}> {bug.priority} </td>
                        <td style = {{borderBottom: "1px solid #fff"}}> {bug.assignee} </td>
                        <td> <CheckIcon cursor = "pointer" marginLeft = "5vw" onClick = {() => resolvePressed(bug.id)} /> </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};

export default BugListTable;