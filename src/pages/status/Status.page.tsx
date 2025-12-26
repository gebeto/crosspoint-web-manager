import { PageFooter } from "@/components/PageFooter";
import "./index.css";
import { useStatusQuery } from "@/queries/status.query";

export const StatusPage = () => {
  const { data } = useStatusQuery();

  return (
    <>
      <div className="page-header">
        <h1 className="page-header-title">📚 CrossPoint Reader</h1>
      </div>

      <div className="card">
        <h2>Device Status</h2>
        <div className="info-row">
          <span className="label">Version</span>
          <span className="value" id="version">
            {data?.version ?? "N/A"}
          </span>
        </div>
        <div className="info-row">
          <span className="label">WiFi Status</span>
          <span className="status">Connected</span>
        </div>
        <div className="info-row">
          <span className="label">IP Address</span>
          <span className="value" id="ip-address">
            {data?.ip || "N/A"}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Free Memory</span>
          <span className="value" id="free-heap">
            {data?.freeHeap ? data.freeHeap.toLocaleString() + " bytes" : "N/A"}
          </span>
        </div>
      </div>

      <PageFooter />
    </>
  );
};
