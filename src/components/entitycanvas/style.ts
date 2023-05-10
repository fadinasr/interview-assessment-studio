import { CSSProperties } from "react";

const entityContainerStyle: CSSProperties = {
  position: "absolute" as const,
  minWidth: 200,
  minHeight: 100,
};

const entityBaseStyle: CSSProperties = {
  backgroundColor: "#DCEEFE",
  borderRadius: 10,
  marginBottom: 5,
  boxShadow: "1px 1px 10px rgb(0 0 0 / 20%)",
};

const entityHeaderStyle: CSSProperties = {
  borderBottom: "2px solid cornflowerblue",
  marginBottom: 5,
  fontSize: 14,
  fontWeight: "bold",
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  color: "#073055",
};

const attributesContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
  padding: 10,
};

const attributesRowStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "row" as const,
  justifyContent: "space-between",
  paddingBottom: 5,
};

const attributesNameStyle: CSSProperties = {
  fontSize: 12,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#5C5C5C",
};

const attributesTypeStyle: CSSProperties = {
  fontSize: 12,
  color: "#A6A6A6",
};

const attributesRemoveButtonStyle: CSSProperties = {
  background: "none",
  border: "1px solid cornflowerblue",
  borderRadius: 5,
  cursor: "pointer",
};

const entityButtonsContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const entityButtonStyle: CSSProperties = {
  background: "cornflowerblue",
  borderRadius: 4,
  borderWidth: 0,
  textAlign: "center" as const,
  padding: 5,
  boxShadow: "1px 1px 10px rgb(0 0 0 / 20%)",
  margin: 10,
  marginBottom: 5,
  marginTop: 5,
  color: "#F3F9FF",
  cursor: "pointer",
};

const modalStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "#FFF",
  width: "40rem",
  height: "20rem",
  padding: 20,
  borderRadius: 20,
};

const modalHeaderStyle: CSSProperties = {
  borderBottom: "2px solid cornflowerblue",
  fontSize: 14,
  fontWeight: "bold",
  color: "#073055",
};

const modalButtonContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const modalRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  paddingBottom: 10,
  alignItems: "center",
};

const formLabelStyle: CSSProperties = {
  fontWeight: "bold",
  color: "#073055",
  flex: 1,
};

const formInputStyle: CSSProperties = {
  padding: 10,
  border: "2px solid #A6A6A6",
  borderRadius: 5,
  color: "#073055",
  backgroundColor: "#F3F9FF",
  flex: 3,
};

const modalColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const modalButtonStyle: CSSProperties = {
  background: "cornflowerblue",
  borderRadius: 4,
  borderWidth: 0,
  textAlign: "center" as const,
  padding: 10,
  boxShadow: "1px 1px 10px rgb(0 0 0 / 20%)",
  margin: 10,
  marginBottom: 5,
  marginTop: 5,
  color: "#F3F9FF",
  cursor: "pointer",
  width: "75%",
  fontSize: 14,
};

export {
  entityContainerStyle,
  entityBaseStyle,
  entityHeaderStyle,
  attributesContainerStyle,
  attributesRowStyle,
  attributesNameStyle,
  attributesTypeStyle,
  attributesRemoveButtonStyle,
  entityButtonsContainerStyle,
  entityButtonStyle,
  modalStyle,
  modalHeaderStyle,
  modalRowStyle,
  modalColumnStyle,
  formLabelStyle,
  formInputStyle,
  modalButtonContainerStyle,
  modalButtonStyle,
};
