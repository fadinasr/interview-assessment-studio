import { CSSProperties } from "react";

const entityContainerStyle: CSSProperties = {
  position: "absolute" as const,
};

const entityBaseStyle: CSSProperties = {
  border: "1px solid cornflowerblue",
  borderRadius: 4,
  padding: 5,
  marginBottom: 5,
};

const attributesContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
  paddingTop: 5,
};

const attributesRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row" as const,
  justifyContent: "space-between",
};

const entityButtonStyle: CSSProperties = {
  background: "cornflowerblue",
  borderRadius: 4,
  borderWidth: 0,
  textAlign: "center" as const,
  padding: 5,
};

const modalStyle: CSSProperties = {
  background: "#fff",
  width: "50rem",
  height: "20rem",
  padding: 20,
  borderRadius: 20,
};

export {
  entityContainerStyle,
  entityBaseStyle,
  attributesContainerStyle,
  attributesRowStyle,
  entityButtonStyle,
  modalStyle,
}
