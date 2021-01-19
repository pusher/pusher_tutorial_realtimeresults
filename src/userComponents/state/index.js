export default function State(props) {
  return (
    <main style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F7F5FF",
          marginBottom: "24px",
          padding: "9px 16px 8px 28px",
        }}
      >
        <div>
          <h4
            style={{
              color: "#300D4F",
              fontFamily: "Maison Neue",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "34px",
              letterSpacing: "0.5px",
              margin: "0px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-11px",
                top: "4px",
                backgroundColor: props.color,
                height: "24px",
                width: "4px",
              }}
            />
            {props.name}
          </h4>
          <div>
            <p
              style={{
                fontFamily: "Maison Neue",
                color: "#300D4F",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0px",
                marginTop: "1px",
              }}
            >
              Total votes: {props.total.message[props.index + 6]}{" "}
            </p>
          </div>
        </div>
        <div>
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
            }}
            onClick={() => props.setShowDetails(props.index)}
          >
            More
          </button>
        </div>
      </div>
    </main>
  );
}
