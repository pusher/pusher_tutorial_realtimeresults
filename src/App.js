import { useState, useEffect } from "react";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import Pusher from "pusher-js";

import states from "./userComponents/states/states";

import Nav from "./userComponents/header/nav/nav";
import States from "./userComponents/states/index";
import Details from "./userComponents/details";
import Footer from "./userComponents/footer/footer";

import icon from "./images/pusher-logo.svg";

function App() {
  const sampleData = [
    [1, "Alabama", 0, 0, 0, 0, 0, 0, 0, 0, "inprogress"],
    [1, "Delaware", 0, 0, 0, 0, 0, 0, 0, 0, "inprogress"],
    [1, "Florida", 0, 0, 0, 0, 0, 0, 0, 0, "inprogress"],
    [1, "Hawaii", 0, 0, 0, 0, 0, 0, 0, 0, "inprogress"],
    [1, "Idaho", 0, 0, 0, 0, 0, 0, 0, 0, "inprogress"],
    [1, "Kentucky", 0, 0, 0, 0, 0, 0, 0, 0, "inprogress"],
  ];
  const [data, updateData] = useState(sampleData);
  const [total, updateTotal] = useState({ message: sampleData[0] });
  const [subStatus, updateSubStatus] = useState("subscribe");

  const pusher = new Pusher(process.env.REACT_APP_KEY, {
    //
    cluster: process.env.REACT_APP_CLUSTER,
  });
  const channel = pusher.subscribe("votes");

  channel.bind("vote-event", function (dataFromServer) {
    updateData((data) => {
      data.splice(
        Number(dataFromServer.message[11]),
        1,
        dataFromServer.message
      );
      const arr = [...data];
      return arr;
    });

    updateTotal(dataFromServer);
  });
  useEffect(async () => {
    const res = await fetch("https://cryptic-lake-12063.herokuapp.com/"); //https://cryptic-lake-12063.herokuapp.com/
    const json = await res.json();
    updateTotal(json);
    updateData((data) => {
      data.splice(Number(json.message[11]), 1, json.message);
      const arr = [...data];
      return arr;
    });
  }, []);
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: process.env.REACT_APP_INSTANCEID,
  });

  beamsClient
    .start()
    .then(() => beamsClient.getDeviceId())
    .then((deviceId) => {
      console.log(deviceId); // Will log something like web-1234-1234-1234-1234
    })
    .catch((e) => console.error("Could not get device id", e));

  function sub() {
    if (subStatus === "unsubscribe") {
      beamsClient
        .start()
        .then(() => beamsClient.removeDeviceInterest("hello"))
        .then(() => {
          // Build something beatiful 🌈
          alert("You will not be notified when voting is completed");
          updateSubStatus("subscribe");
        });
    }
    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest("vote-event"))
      .then(() => {
        // Build something beatiful 🌈
        alert("You will notified when voting is completed");
        updateSubStatus("unsubscribe");
      });
  }

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ display: " flex", flexDirection: "row", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "104px",
          backgroundColor: "#F2F1F9",
          paddingTop: "32px",
          flexShrink: "0",
        }}
      >
        <img
          src={icon}
          alt="Pusher"
          width="40px"
          height="40px"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <div
        style={{
          width: "100%",
          marginLeft: "65px",
          marginRight: "65px",
          maxWidth: "1208px",
          paddingRight: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            backgroundColor: "",
            marginTop: "100px",
            minWidth: "539px",
          }}
        >
          <Nav />
          <button
            onClick={() => sub()}
            style={{
              color: "white",
              backgroundColor: "#7F7FA3",
              borderRadius: "4px",
              fontSize: "16px",
              lineHeight: "28px",
              fontWeight: 600,
              padding: "4px 16px",
              border: "none",
              alignSelf: "flex-end",
              cursor: "pointer",
              marginBottom: "12px",
            }}
          >
            {subStatus}
          </button>
        </div>
        <div
          style={{
            width: "100%",
            height: "2px",
            marginTop: "12px",
            backgroundColor: "#EEEBFF",
            minWidth: "539px",
          }}
        />
        <div>
          {showDetails !== false ? (
            <Details
              index={showDetails}
              regions={data}
              src={states[showDetails].src}
              col={states[showDetails].color}
              candidate={states[showDetails].name}
              setShowDetails={setShowDetails}
            />
          ) : (
            <>
              <States
                total={total}
                data={data}
                states={states}
                setShowDetails={setShowDetails}
              />
              <div>
                <Footer />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
