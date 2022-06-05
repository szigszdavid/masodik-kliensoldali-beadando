import { useState, useEffect } from "react";
import { Table, Accordion, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../state/authSlice";
import { Login } from "../login/Login";
import { useGetTaskListsQuery } from "../state/tasksApiSlice";
import { useNavigate } from "react-router-dom";
import { selectUpdatedTaskList, selectUpdatedTaskListId } from "../state/tasksSlice";

export function UserTasks() {
  const [tasksLists, setTasksLists] = useState([]);
  const [userId, setUserId] = useState(0)
  const [sumOfPoints, setSumOfPoints] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const { isLoading, data } = useGetTaskListsQuery(pageNumber * 5);
  const navigate = useNavigate();
  const result = useSelector(selectUpdatedTaskList)

  const { userTask } = useGetTaskListsQuery(pageNumber * 5, {
    selectFromResult: ({ data: inputTasks }) => ({
      userTask: inputTasks?.filter((task) => task.userId === userId),
    }),
  });
 
  useEffect(() => {
    if(window.localStorage.getItem("user") !== null)
    {
      const  localStorageUser = JSON.parse(window.localStorage.getItem("user"))
      setUserId(localStorageUser.user.id)
    }
  },[])

  useEffect(() => {
    if (data !== undefined && userTask !== undefined) {
      let points = 0
      let userTaskPoints = []
      for (let index = 0; index < userTask.length; index++) {
        points = 0
        for (let j = 0; j < userTask[index].tasks.length; j++) {
          points += userTask[index].tasks[j].points
        }
        userTaskPoints.push({ title: userTask[index].title, sumOfPoints: points })
        setSumOfPoints(userTaskPoints)
      }
      setTasksLists(userTask);
    }
  }, [data]);

  const editTaskListOnClick = () => {
    window.localStorage.setItem("editableTaskList", JSON.stringify({
      title: "",
      status: "draft",
      description: "",
      numberOfTasks: 0,
      createdAt: "",
      updatedAt: "",
      sumOfPoints: 0,
      tasks: []
    }))
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
                          <td>{sumOfPoints.find(task => task.title === tasksList.title).sumOfPoints}</td>
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
              <td>{tasksList.tasks.length}</td>
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
      <br/>
      <Button
            onClick={() => {
              setPageNumber(pageNumber !== 0 ? pageNumber - 1 : 0);
            }}
          >
            Previous
          </Button>
          {" Page: " + pageNumber + " "}
          <Button
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
          >
            Next
          </Button>      
    </div>
  );
}
