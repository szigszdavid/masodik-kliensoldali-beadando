import { React } from "react";
import { ListGroup, Tab, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useGetTasksQuery, useGetTenDataQuery } from "../state/tasksApiSlice";

export function TaskBank() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [choosenTask, setChoosenTask] = useState(null)
  const [tasksHook, setTasks] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const {isLoading, data} = useGetTenDataQuery(pageNumber * 10)
  console.log(data);

  // const { oneTask } = useGetTasksQuery(undefined, {
  //   selectFromResult: ( {data: inputTasks}) => ({
  //     oneTask: inputTasks?.find((oneTask) => oneTask.id === 3)
  //   }),
  // })

  // const { oneTask } = useGetTasksQuery(undefined, {
  //   selectFromResult: ( {data: inputTasks}) => ({
  //     oneTask: inputTasks?.slice(pageNumber * 10, (pageNumber + 1) * 10)
  //   }),
  // })

  // if(isLoading)
  // {
  //   return "Loading";
  // }

  // const tasks = [
  //   {
  //     id: 1,
  //     name: "taks1",
  //   },
  //   {
  //     id: 2,
  //     name: "taks2",
  //   },
  //   {
  //     id: 3,
  //     name: "taks3",
  //   },
  //   {
  //     id: 4,
  //     name: "taks4",
  //   },
  // ];

  useEffect(() => {
    setTasks([])
  }, [])


  useEffect(() => {
    if(data !== undefined)
    {
      console.log("data is set");
      setTasks(data)
    }
    
  }, [data])

  useEffect(() => {
    if(data !== undefined)
    {
      console.log("data is set");
      setTasks(data)
    }
    
  }, [pageNumber])


  const tabePaneElementOnClick = () => {
      if(!selectedTasks.some(task => task.id === choosenTask.id))
      {
        window.localStorage.setItem("selectedTask", JSON.stringify(choosenTask.id))
        setSelectedTasks([...selectedTasks, choosenTask]);
      }
  };

  let tasksTabPanes = [];
  if(choosenTask !== null)
  {
      tasksTabPanes.push(
        <div>
        <h3>{choosenTask.title}</h3>
        <span>{choosenTask.description}</span>
        <br></br>
        {
        JSON.parse(window.localStorage.getItem("user")) !== null ? (
        !selectedTasks.some(task => task.id === choosenTask.id) ? 
        <button
          className="btn btn-primary"
          onClick={() => tabePaneElementOnClick()}
        >
          Select
        </button> : <button
          className="btn btn-light"
          disabled
        >
          Selected
        </button>) : <div></div>}
      </div>
      )
  }

  const tasksListGroupItemsOnClick = (task) => {
    setChoosenTask(task)
  }

  let selectedTasksList = <ul>
      {
          selectedTasks.map((task) => {
              return(
                  <li>
                      {task.id}
                  </li>
              )
          })
      }
  </ul>

let tasksListGroupItems = tasksHook.map((task) => {
  return (
    <ListGroup.Item action onClick={() => tasksListGroupItemsOnClick(task)} variant="info">
      {task.title}
      {" "}
      {task.description.substring(0,10) + "..."}
    </ListGroup.Item>
  );})



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
              <Col sm={8}>
                {tasksTabPanes}
              </Col>
            </Row>
          </Tab.Container>
          <br/>
          <Button onClick={() => {setPageNumber(pageNumber !== 0 ? pageNumber-1 : 0);setChoosenTask(null)}}>Previous</Button>
          {" Page: " + pageNumber + " "}
          <Button onClick={() => {setPageNumber(pageNumber+1); setChoosenTask(null)}}>Next</Button>
          {selectedTasksList}
        </div>
      </div>
    </>
  );
}
