import { IBug } from "./IBug";
import "./style.css"

const BugListTable = (props: {bugs: IBug[], onDeleteBug: Function}) => {
    
    const {bugs, onDeleteBug} = props;

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
                {bugs.length === 0 && <tr><td> No bugs have been picked out...</td></tr>}
                {bugs.length > 0 && bugs.map(bug => 
                    <tr key = {bug.id}>
                        <td> {bug.description} </td>
                        <td> {bug.priority} </td>
                        <td> {bug.assignee} </td>
                        <td> <button onClick = {() => resolvePressed(bug.id)}> Resolved Bug </button></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
};

export default BugListTable;