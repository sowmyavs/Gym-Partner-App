import "antd/dist/antd.css";

import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Timeline } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      const response = await fetch("/tasks");
      const fetchedTasks = await response.json();
      setTasks(fetchedTasks);
    };

    const interval = setInterval(fetchAllTasks, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timelineItems = tasks.reverse().map((task) => {
      return task.is_finished ? (
        <Timeline.Item
          onClick={() => completeTask(task._id)}
          key={task._id}
          dot={<CheckCircleOutlined />}
          color="green"
          style={{ textDecoration: "line-through", color: "green" }}
        >
          {task.name} <small>({task._id})</small>
        </Timeline.Item>
      ) : (
        <Timeline.Item
          onClick={() => completeTask(task._id)}
          key={task._id}
          dot={<MinusCircleOutlined />}
          color="blue"
          style={{ textDecoration: "initial" }}
        >
          {task.name} <small>({task._id})</small>
        </Timeline.Item>
      );
    });

    setTimeline(timelineItems);
  }, [tasks]);

  async function completeTask(id) {
    let response = await fetch("/task/" + id);
    let task = await response.json();
    task.is_finished = !task.is_finished;
    const updatedTask = JSON.stringify({
      name: task.name,
      description: task.description,
      is_finished: task.is_finished,
    });

    await fetch("/task/" + id, {
      method: "PUT",
      body: updatedTask,
      headers: { "content-type": "application/json" },
    });

    response = await fetch("/tasks");
    const fetchedTasks = await response.json();
    setTasks(fetchedTasks);
  }

  return (
    <>
      <Row style={{ marginTop: 50 }}>
        <Col span={14} offset={5}>
          <Timeline mode="alternate">{timeline}</Timeline>
        </Col>
      </Row>
    </>
  );
}

export default App;
