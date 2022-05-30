import { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import {
  useCreateTasklistMutation,
  useGetEditableTasksQuery,
  useUpdateTasklistMutation,
} from "../state/tasksApiSlice";
import { useNavigate } from "react-router-dom";
import { setUpdatedTaskList } from "../state/tasksSlice";
import { useDispatch } from "react-redux";

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
    if (window.localStorage.getItem("selectedTask") !== null) {
      console.log(
        "Van task: ",
        JSON.parse(window.localStorage.getItem("selectedTask"))
      );
      setId(parseInt(JSON.parse(window.localStorage.getItem("selectedTask"))));
    }
  }, [])
  

  let errors = {
    username: "",
    emailAddress: "",
    password: "",
  };

  const { isLoading, data: queryData } = useGetEditableTasksQuery(id);

  useEffect(() => {
    if (queryData !== undefined) {
      console.log("QueryData: ", queryData);
      setData(queryData);
      let sumHelper = 0;
      for (let index = 0; index < data.tasks.length; index++) {
        if (data.tasks[index].points !== "") {
          sumHelper += parseInt(data.tasks[index].points);
        }
      }
      setSumOfPoints(sumHelper);
    }
  }, [queryData]);

  const handleSaveChanges = async (e) => {
    
    let saveChanges = {
      id: data.id,
      title: data.title,
      status: data.status,
      description: data.description,
      numberOfTasks: data.numberOfTasks,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      sumOfPoints: 1,
      tasks: data.tasks 
    }

    console.log("Before update: ",saveChanges);

    let result = await updateTask(saveChanges).unwrap()

    if(result !== undefined){
      dispatch(setUpdatedTaskList(result))
      console.log("result ",result);
      window.localStorage.removeItem("selectedTask")
      window.localStorage.setItem("result", JSON.stringify(result))
      navigate("/usertasks", {replace: true})
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data.tasks);

    await createTask({
      title: data.title,
      description: data.description,
      status: data.status,
      tasks: data.tasks,
    });

    
    window.localStorage.removeItem("selectedTask")
    navigate("/usertasks", {replace: true})
  };

  const handleChange = (e) => {
    console.log("Change", e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeOnSingleTask = (e, el) => {
    let newTasks = []
    for (let index = 0; index < data.tasks.length; index++) {
      newTasks.push({ 
        title: data.tasks[index].title,
        description: data.tasks[index].description,
        notes: data.tasks[index].notes,
        points: data.tasks[index].points,
    })
    }
    
    for (let index = 0; index < data.tasks.length; index++) {
      if(data.tasks[index].title === el.title)
      {
        newTasks[index].notes = e.target.value
      }
    }

    setData({
      id: data.id,
      title: data.title,
      status: data.status,
      description: data.description,
      numberOfTasks: data.numberOfTasks,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      sumOfPoints: 1,
      tasks: newTasks
    });
    console.log(e.target.value);
    let sumHelper = 0;
    for (let index = 0; index < data.tasks.length; index++) {
      if (data.tasks[index].points !== "") {
        sumHelper += parseInt(data.tasks[index].points);
      }
    }
    setSumOfPoints(sumHelper);
  };

  const handleChangeOnSingleTaskNotes = (e, el) => {
    let newTasks = []
    for (let index = 0; index < data.tasks.length; index++) {
      newTasks.push({ 
        id: data.tasks[index].id,
        title: data.tasks[index].title,
        description: data.tasks[index].description,
        notes: data.tasks[index].notes,
        points: data.tasks[index].points,
    })
    }
    
    for (let index = 0; index < data.tasks.length; index++) {
      if(data.tasks[index].title === el.title)
      {
        newTasks[index].notes = e.target.value
      }
    }

    setData({
      id: data.id,
      title: data.title,
      status: data.status,
      description: data.description,
      numberOfTasks: data.numberOfTasks,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      sumOfPoints: 1,
      tasks: [...newTasks]
    });
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
                    name="notes"
                    value={el.notes}
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
                    name="points"
                    value={el.points}
                    autoFocus
                    onChange={(e) => handleChangeOnSingleTask(e, el)}
                    required
                    placeholder={JSON.stringify(el.points)}
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
