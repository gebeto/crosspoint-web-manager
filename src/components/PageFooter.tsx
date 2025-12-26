import { useRouter } from "./Router";

export const PageFooter = () => {
  const { setRoute } = useRouter();
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
          <a onClick={() => setRoute("status")}>Home</a>
          <a onClick={() => setRoute("files")}>File Manager</a>
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
