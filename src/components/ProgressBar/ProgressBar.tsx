import "./ProgressBar.css";

export type ProgressBarColor = "success" | "error";

export const ProgressBar: React.FC<
  React.PropsWithChildren<{
    progress: number;
    color: ProgressBarColor;
  }>
> = (props) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: props.progress + "%",
            backgroundColor:
              {
                success: "#27ae60",
                error: "#e74c3c",
              }[props.color] || undefined,
          }}
        />
      </div>
      {props.children && <div className="progress-text">{props.children}</div>}
    </div>
  );
};
