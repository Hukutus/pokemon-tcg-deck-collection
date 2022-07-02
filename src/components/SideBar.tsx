import { ComponentStyle } from "../types";

const styles: ComponentStyle = {
  container: {
    width: 300,
    height: "100vh",
    background: "darkgray",
    padding: "2rem 1rem",
    marginRight: 10,
  },
};

export const SideBar = () => {
  return (
    <nav style={styles.container}>
      <div>Test</div>
    </nav>
  );
};
