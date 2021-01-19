import sampleData from "./allregions";
export default function Footer() {
  return (
    <div>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          bottom: 0,
          left: "0%",
          marginBottom: "100px",
        }}
      >
        <h4
          style={{
            color: "#300D4F",
            width: "100%",
            fontFamily: "Maison Neue",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "34px",
            margin: "0px",
            marginTop: "24px",
          }}
        >
          Available regions
        </h4>
        <div className="" style={{ display: "flex", flexDirection: "row" }}>
          {sampleData.map((navigation) => {
            return (
              <h4
                style={{
                  fontStyle: "normal",
                  fontSize: "20px",
                  lineHeight: "34px",
                  fontWeight: "500",
                  margin: "2px",
                  fontFamily: "Maison Neue",
                  color: "#8282AE",
                }}
              >
                {navigation},
              </h4>
            );
          })}
        </div>
      </main>
    </div>
  );
}
