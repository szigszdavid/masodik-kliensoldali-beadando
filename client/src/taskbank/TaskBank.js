import { React } from "react";
import { ListGroup, Tab, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useGetTasksQuery, useGetTenDataQuery } from "../state/tasksApiSlice";
import { setEditableTask } from "../state/editableTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectEditableTaskList } from "../state/editableTaskSlice";

export function TaskBank() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [choosenTask, setChoosenTask] = useState(null);
  const [tasksHook, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const { isLoading, data } = useGetTenDataQuery(pageNumber * 10);
  const dispatch = useDispatch()
  const editableSelector = useSelector(selectEditableTaskList)
  
  useEffect(() => {
    setTasks([]);

    if (JSON.parse(window.localStorage.getItem("selectedTask")) !== null) {
      let localStorageSelectedTasks = JSON.parse(
        window.localStorage.getItem("selectedTask")
      );
      setSelectedTasks(localStorageSelectedTasks);
    }
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setTasks(data);
    }
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      setTasks(data);
    }
  }, [pageNumber]);

  const tabePaneElementOnClick = () => {
    if (!selectedTasks.some((task) => task.id === choosenTask.id)) {
      let localStorageSelectedTasks = [];

      if (JSON.parse(window.localStorage.getItem("selectedTask")) !== null) {
        localStorageSelectedTasks = JSON.parse(
          window.localStorage.getItem("selectedTask")
        );

        if (!localStorageSelectedTasks.includes(choosenTask.id)) {
          let copyOfChoosenTask = {
            createdAt: choosenTask.createdAt,
            description: choosenTask.description,
            id: choosenTask.id,
            title: choosenTask.title,
            updatedAt: choosenTask.updatedAt,
            points: 0,
            notes: "",
          };
          localStorageSelectedTasks.push(copyOfChoosenTask);
          window.localStorage.setItem(
            "selectedTask",
            JSON.stringify(localStorageSelectedTasks)
          );
          window.localStorage.setItem(
            "editableTaskList",
            JSON.stringify({
              id: 0,
              title: "",
              description: "",
              status: "",
              createdAt: "",
              updatedAt: "",
              userId: 0,
              tasks: localStorageSelectedTasks,
            })
          );
        }
      } else {
        let copyOfChoosenTask = {
          createdAt: choosenTask.createdAt,
          description: choosenTask.description,
          id: choosenTask.id,
          title: choosenTask.title,
          updatedAt: choosenTask.updatedAt,
          points: 0,
          notes: "",
        };
        localStorageSelectedTasks.push(copyOfChoosenTask);
        window.localStorage.setItem(
          "selectedTask",
          JSON.stringify(localStorageSelectedTasks)
        );
        window.localStorage.setItem(
          "editableTaskList",
          JSON.stringify({
            id: 0,
            title: "",
            description: "",
            status: "draft",
            createdAt: "",
            updatedAt: "",
            userId: 0,
            tasks: localStorageSelectedTasks,
          })
        );
      }
      setSelectedTasks(localStorageSelectedTasks);
    }
    dispatch(setEditableTask(true))
  };

  let tasksTabPanes = [];
  if (choosenTask !== null) {
    tasksTabPanes.push(
      <div>
        <h3>{choosenTask.title}</h3>
        <span>{choosenTask.description}</span>
        <br></br>
        {console.log(selectedTasks)}
        {JSON.parse(window.localStorage.getItem("user")) !== null ? (
          selectedTasks.length === 0 ||
          selectedTasks.filter((task) => task.id === choosenTask.id).length ===
            0 ? (
            <button
              className="btn btn-primary"
              onClick={() => tabePaneElementOnClick()}
            >
              Select
            </button>
          ) : (
            <button className="btn btn-light" disabled>
              Selected
            </button>
          )
        ) : (
          <div></div>
        )}
      </div>
    );
  }

  const tasksListGroupItemsOnClick = (task) => {
    setChoosenTask(task);
  };

  let tasksListGroupItems = tasksHook.map((task) => {
    return (
      <ListGroup.Item
        action
        onClick={() => tasksListGroupItemsOnClick(task)}
        variant="info"
      >
        {task.title} {task.description.substring(0, 10) + "..."}
      </ListGroup.Item>
    );
  });

  return (
    <>
      <h1>TaskBank</h1>
      <div className="container">
        <div>
          <Tab.Container
            id="list-group-tabs-example"
            defaultActiveKey="#link1"
            variant="info"
          >
            <Row>
              <Col sm={4}>
                <ListGroup>{tasksListGroupItems}</ListGroup>
              </Col>
              <Col sm={8}>{tasksTabPanes}</Col>
            </Row>
          </Tab.Container>
          <br />
          <Button
            onClick={() => {
              setPageNumber(pageNumber !== 0 ? pageNumber - 1 : 0);
              setChoosenTask(null);
            }}
          >
            Previous
          </Button>
          {" Page: " + pageNumber + " "}
          <Button
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setChoosenTask(null);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
