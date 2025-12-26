import { useNavigate } from "react-router";

export const PageFooter = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="nav-links"
        >
          <a onClick={() => navigate("/")}>Home</a>
          <a onClick={() => navigate("/files")}>File Manager</a>
        </div>
        <p style={{ textAlign: "center", color: "#95a5a6", margin: 0 }}>
          <a
            href="https://github.com/daveallie/crosspoint-reader"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            CrossPoint E-Reader
          </a>{" "}
          • Open Source
        </p>
      </div>
    </>
  );
};
