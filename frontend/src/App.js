import "antd/dist/antd.css";

import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Col, Row, Timeline } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch("/users");
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    };

    const interval = setInterval(fetchAllUsers, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timelineItems = users.reverse().map((user) => {
      return user.is_finished ? (
        <Timeline.Item
          key={user._id}
          dot={<CheckCircleOutlined />}
          color="green"
          style={{ textDecoration: "line-through", color: "green" }}
        >
          {user.name} <small>({user._id})</small>
        </Timeline.Item>
      ) : (
        <Timeline.Item
          key={user._id}
          dot={<MinusCircleOutlined />}
          color="blue"
          style={{ textDecoration: "initial" }}
        >
          {user.name} <small>({user._id})</small>
        </Timeline.Item>
      );
    });

    setTimeline(timelineItems);
  }, [users]);

  async function completeUser(id) {
    let response = await fetch("/user/" + id);
    let user = await response.json();
    const updatedUser = JSON.stringify({
      name: user.name,
    });

    await fetch("/user/" + id, {
      method: "PUT",
      body: updatedUser,
      headers: { "content-type": "application/json" },
    });

    response = await fetch("/users");
    const fetchedUsers = await response.json();
    setUsers(fetchedUsers);
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
