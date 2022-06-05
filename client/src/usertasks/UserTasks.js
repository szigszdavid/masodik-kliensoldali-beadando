import { useState, useEffect } from "react";
import { Table, Accordion, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../state/authSlice";
import { Login } from "../login/Login";
import { useGetTaskListsQuery } from "../state/tasksApiSlice";
import { useNavigate } from "react-router-dom";
import { selectUpdatedTaskList, selectUpdatedTaskListId } from "../state/tasksSlice";

export function UserTasks() {
  const [tasksLists, setTasksLists] = useState([
    {
      title: "title1",
      status: "status1",
      description: "desc1",
      numberOfTasks: 1,
      createdAt: "createdAt1",
      updatedAt: "updateAt1",
      sumOfPoints: 1,
      tasks: [
        {
          title: "task1",
          description: "desc1",
          notes: "note1",
          points: 1,
        },
        {
          title: "task2",
          description: "desc1",
          notes: "note1",
          points: 1,
        },
        {
          title: "task3",
          description: "desc1",
          notes: "note1",
          points: 1,
        },
      ],
    },
    {
      title: "title2",
      status: "status2",
      description: "desc2",
      numberOfTasks: 2,
      createdAt: "createdAt2",
      updatedAt: "updateAt2",
      sumOfPoints: 1,
      tasks: [],
    },
    {
      title: "title3",
      status: "status3",
      description: "desc3",
      numberOfTasks: 3,
      createdAt: "createdAt3",
      updatedAt: "updateAt3",
      sumOfPoints: 1,
      tasks: [],
    },
  ]);

  const user = useSelector(selectLoggedInUser);
  const { isLoading, data } = useGetTaskListsQuery();
  const navigate = useNavigate();
  const result = useSelector(selectUpdatedTaskList)

  const { userTask } = useGetTaskListsQuery(undefined, {
    selectFromResult: ({ data: inputTasks }) => ({
      userTask: inputTasks?.filter((task) => task.userId === 1),
    }),
  });

  console.log("Result state: ", result);
  

  useEffect(() => {
    if (data !== undefined && userTask !== undefined) {
      console.log("A user taskjai: ", userTask);
      setTasksLists(userTask);
    }
  }, [data]);

  // if(!user) {
  //   return <Login />;
  // }

  const editTaskListOnClick = (tasklist) => {
    window.localStorage.setItem("editableTaskList", JSON.stringify(tasklist))
    navigate("/editabletasklist", {replace: true})
  }

  let tasksTable = (
    <Table striped bordered>
      <thead>
        <th>Title</th>
        <th>Status</th>
        <th>Description</th>
        <th>Number of tasks</th>
        <th>Created Date</th>
        <th>Last modified Date</th>
      </thead>
      <tbody>
        {tasksLists.map((tasksList, i) => {
          return (
            <tr>
              <td>
                <Accordion className="btn btn-light" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{tasksList.title}</Accordion.Header>
                    <Accordion.Body>
                      <Table>
                        <tr>
                          <td>Title</td>
                          <td>{tasksList.title}</td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td>{tasksList.status}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{tasksList.description}</td>
                        </tr>
                        <tr>
                          <td>Created Date</td>
                          <td>{tasksList.createdAt}</td>
                        </tr>
                        <tr>
                          <td>Last Modification Date</td>
                          <td>{tasksList.updatedAt}</td>
                        </tr>
                        <tr>
                          <td>Sum of points</td>
                          <td>{tasksList.sumOfPoints}</td>
                        </tr>
                        <tr>
                          <td>Tasks:</td>
                          <td>
                            <Table>
                              {tasksList.tasks.map((task) => {
                                return (
                                  <tr>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.notes}</td>
                                    <td>{task.points}</td>
                                  </tr>
                                );
                              })}
                            </Table>
                          </td>
                        </tr>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
              <td>{tasksList.status}</td>
              <td>{tasksList.description}</td>
              <td>{tasksList.numberOfTasks}</td>
              <td>{tasksList.createdAt}</td>
              <td>{tasksList.updatedAt}</td>
              {window.localStorage.getItem("editableTaskList") === null ? <td>
                <Button className="btn btn-warning" onClick={() => editTaskListOnClick(tasksList)}>Edit</Button>
              </td> : <></>}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <div className="container">
      <h1>My TaskList</h1>
      <br />
      <Button variant="success" onClick={() => editTaskListOnClick(0)}>
        Create new TaskList
      </Button>
      <br />
      {tasksTable}
    </div>
  );
}
