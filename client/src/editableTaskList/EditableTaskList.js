import { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import {
  useCreateTasklistMutation,
  useGetEditableTasksQuery,
  useUpdateTasklistMutation,
  useGetOneTaskQuery
} from "../state/tasksApiSlice";
import { useNavigate } from "react-router-dom";
import { setUpdatedTaskList } from "../state/tasksSlice";
import { useDispatch } from "react-redux";
import { setEditableTask } from "../state/editableTaskSlice";

export function EditableTaskList() {
  const [sumOfPoints, setSumOfPoints] = useState(0);
  const [id, setId] = useState(0);
  const [data, setData] = useState({
    title: "title1",
    status: "draft",
    description: "desc1",
    numberOfTasks: 1,
    createdAt: "createdAt1",
    updatedAt: "updateAt1",
    sumOfPoints: 1,
    tasks: [
      {
        id: 1,
        title: "task1",
        description: "desc1",
        notes: "note1",
        points: 1,
      },
      {
        id: 2,
        title: "task2",
        description: "desc1",
        notes: "note1",
        points: 1,
      },
      {
        id: 3,
        title: "task3",
        description: "desc1",
        notes: "note1",
        points: 1,
      },
    ],
  });

  const [createTask] = useCreateTasklistMutation();
  const [updateTask, result] = useUpdateTasklistMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("editableTaskList") !== null) {
      let localStorageTasklist = JSON.parse(window.localStorage.getItem("editableTaskList"))
      setData(localStorageTasklist)
      setId(localStorageTasklist.id);
    }
    

  }, [])
  

  let errors = {
    username: "",
    emailAddress: "",
    password: "",
  };

  const { isLoading, data: queryData } = useGetEditableTasksQuery(id);
  const { data: taskData } = useGetOneTaskQuery(1);

  useEffect(() => {
    if (queryData !== undefined) {
      setData(queryData);
      let sumHelper = 0;
      for (let index = 0; index < data.tasks.length; index++) {
        if (data.tasks[index].points !== "") {
          sumHelper += parseInt(data.tasks[index].points);
        }
      }
      setSumOfPoints(sumHelper);
    }

  }, [queryData, taskData]);

  const handleSaveChanges = async (e) => {
    
    let saveChanges = {
      id: data.id,
      title: data.title,
      status: data.status,
      description: data.description,
      numberOfTasks: data.numberOfTasks,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      tasks: data.tasks,
      sumOfPoints: sumOfPoints
    }

    let result = await updateTask(saveChanges).unwrap()

    if(result !== undefined){
      dispatch(setUpdatedTaskList(result))
      window.localStorage.removeItem("selectedTask")
      window.localStorage.setItem("result", JSON.stringify(result))
      dispatch(setEditableTask(false))
      navigate("/usertasks", {replace: true})
    }

    window.localStorage.removeItem("selectedTask")
    window.localStorage.removeItem("editableTaskList")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask({
      title: data.title,
      description: data.description,
      status: data.status,
      tasks: data.tasks,
    });

    window.localStorage.removeItem("selectedTask")
    window.localStorage.removeItem("editableTaskList")
    dispatch(setEditableTask(false))
    navigate("/usertasks", {replace: true})
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeOnSingleTask = (e, el) => {
    let helperObject = {...data}
    let helperArray = [...helperObject.tasks]
    for (let index = 0; index < data.tasks.length; index++) {
      if(e.target.name === data.tasks[index].title)
      {
        let copyOfData = {...helperArray[index]}
        copyOfData.points = e.target.value
        helperArray[index] = copyOfData
      }
    }

    let sumHelper = 0;
    for (let index = 0; index < helperArray.length; index++) {
      if (helperArray[index].points !== "") {
        sumHelper += parseInt(helperArray[index].points);
      }
    }
    setData({ ...data, ["tasks"]: helperArray });
    setSumOfPoints(sumHelper);
  };

  const handleChangeOnSingleTaskNotes = (e, el) => {
    let helperObject = {...data}
    let helperArray = [...helperObject.tasks]
    for (let index = 0; index < data.tasks.length; index++) {
      if(e.target.name === data.tasks[index].title)
      {
        let copyOfData = {...helperArray[index]}
        copyOfData.notes = e.target.value
        helperArray[index] = copyOfData
      }
    }
    setData({ ...data, ["tasks"]: helperArray });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Editable TaskList</h1>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Title: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="text"
          name="title"
          value={data.title}
          autoFocus
          onChange={handleChange}
          required
          placeholder={data.title}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFullName" required>
        <Form.Label>Status: </Form.Label>
        <Form.Select
          aria-label="Default select example"
          required
          name="status"
          onChange={handleChange}
          value={data.status}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Description: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="text"
          name="description"
          value={data.description}
          autoFocus
          onChange={handleChange}
          required
          placeholder={data.description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Created Date</Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="text"
          autoFocus
          placeholder={data.createdAt}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Last modified date: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          type="text"
          autoFocus
          placeholder={data.updatedAt}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Sum of points: </Form.Label>
        <Form.Control
          variant="standard"
          //inputRef={usernameRef}
          name="sumOfPoints"
          value={sumOfPoints}
          autoFocus
          required
          placeholder={sumOfPoints}
        />
      </Form.Group>
      <Form.Label>Tasks</Form.Label>
      <Table>
        {data.tasks.map((el) => {
          return (
            <tr>
              <td>{el.title}</td>
              <td>{el.description}</td>
              <td>
                <Form.Group className="mb-3" controlId="formBasicFullName">
                  <Form.Label>Task Note</Form.Label>
                  <Form.Control
                    variant="standard"
                    //inputRef={usernameRef}
                    type="text"
                    name={el.title}
                    placeholder={el.notes}
                    autoFocus
                    onChange={(e) => handleChangeOnSingleTaskNotes(e, el)}
                    required
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group className="mb-3" controlId="formBasicFullName">
                  <Form.Label>Task Points</Form.Label>
                  <Form.Control
                    variant="standard"
                    //inputRef={usernameRef}
                    type="number"
                    name={el.title}
                    autoFocus
                    placeholder={el.points}
                    onChange={(e) => handleChangeOnSingleTask(e, el)}
                    required
                  />
                </Form.Group>
              </td>
            </tr>
          );
        })}
      </Table>
      <hr />
      <Button variant="success" type="submit">
        Create
      </Button>{" "}
      <Button variant="warning" onClick={() => handleSaveChanges()}>
        Save changes
      </Button>
    </Form>
  );
}
