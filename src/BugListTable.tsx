import { IBug } from "./IBug";
import "./style.css"

const BugListTable = (props: {bugs: IBug[], onDeleteBug: Function, PriorityColor: String}) => {
    
    let {bugs, onDeleteBug} = props;

    bugs.forEach((bug, index) => {
        console.log(bug.color);
    });

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
                    <tr key = {bug.id}>
                        <td> {bug.description} </td>
                        <td style = {{color: bug.color}}> {bug.priority} </td>
                        <td> {bug.assignee} </td>
                        <td> <button onClick = {() => resolvePressed(bug.id)}> Resolved Bug </button></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};

export default BugListTable;