import State from "../state/index";
export default function States(props) {
  return (
    <main style={{ width: "539px", marginTop: "70px", paddingRight: "24px" }}>
      {props.states.map((state, i) => {
        return (
          <State
            index={i}
            key={i}
            src={state.src}
            desc={state.desc}
            name={state.name}
            total={props.total}
            data={props.data}
            color={state.color}
            setShowDetails={props.setShowDetails}
          />
        );
      })}
    </main>
  );
}
