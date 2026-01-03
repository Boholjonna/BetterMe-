import React from "react";

const Logo = () => {
  return (
    <div style={styles.container}>
      <span style={styles.welcome}>Welcome to</span>
      <span style={styles.brand}>BetterMe</span>
    </div>
  );
};

const styles = {
  container: {
    width: "89vw",              // 89% of viewport width
    height: "15vh",             // 15% of viewport height
    borderRadius: "20px",       // corner radius
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(225,255,209,1) 100%)",
  },
  welcome: {
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#7EDF00",
  },
  brand: {
    fontFamily: "Arial, sans-serif",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#33DB00",
  },
};

export default Logo;
