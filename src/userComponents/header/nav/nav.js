export default function Nav() {
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "0%",
          width: "106px",
          height: "28px",
          border: "none",
          borderRadius: "31px",
          backgroundColor: "#EBEAF4",
        }}
      >
        <h4
          style={{
            fontFamily: "Maison Neue",
            fontSize: "16px",
            fontWeight: "600",
            color: "#300D4F",
            marginTop: "4px",
          }}
        >
          Polling app
        </h4>
      </div>
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          fontFamily: "Maison Neue",
          fontSize: "46px",
          color: "#300D4F",
          fontWeight: "500",
          marginTop: "13px",
        }}
      >
        Pusher Tutorial
      </span>
    </main>
  );
}
