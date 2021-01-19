import arrow from "../../images/arrow-left.svg";

export default function Modal(props) {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div style={{}}>
        <button
          style={{
            color: "white",
            backgroundColor: "#7F7FA3",
            borderRadius: "4px",
            fontSize: "16px",
            lineHeight: "28px",
            fontWeight: 600,
            padding: "4px 16px",
            border: "none",
            cursor: "pointer",
            marginBottom: "12px",
            marginTop: "16px",
          }}
          onClick={() => props.setShowDetails(false)}
        >
          <img src={arrow} alt="" /> Back
        </button>
        <h3
          style={{
            position: "relative",
            fontWeight: 500,
            fontSize: "34px",
            lineHeight: "48px",
            fontFamily: "Maison Neue",
            color: "#300D4F",
            marginTop: "40px",
            marginBottom: "32px",
            paddingLeft: "16px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              backgroundColor: props.col,
              height: "48px",
              width: "4px",
            }}
          />
          {props.candidate}
        </h3>

        <table
          style={{
            textAlign: "left",
            width: "727px",
            borderCollapse: "collapse",
            marginBottom: "24px",
          }}
        >
          <thead
            style={{
              color: "#300D4F",
              fontSize: "20px",
              lineHeight: "34px",
              fontFamily: "Maison Neue",
            }}
          >
            <tr
              style={{
                backgroundColor: "#F7F5FF",
                padding: "11px 16px",
                height: "56px",
              }}
            >
              <th
                style={{ paddingLeft: "16px", fontWeight: 500, width: "241px" }}
              >
                Region Name
              </th>
              <th style={{ fontWeight: 500, width: "250px" }}>Votes</th>
              <th style={{ fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.regions.map((region, i) => {
              return (
                <tr
                  style={{
                    backgroundColor: i % 2 === 0 ? "white" : "#F7F5FF",
                    color: "#6A52FF",
                    height: "40px",
                    fontFamily: "Maison Neue",
                    fontSize: "20px",
                    lineHeight: "34px",
                  }}
                >
                  <td style={{ paddingLeft: "16px", fontWeight: 500 }}>
                    {region[1]}
                  </td>
                  <td style={{ fontWeight: 500 }}>{region[props.index + 2]}</td>
                  <td style={{ fontWeight: 500 }}>{region[10]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
