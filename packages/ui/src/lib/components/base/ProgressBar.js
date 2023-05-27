function ProgressBar() {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: "33.33%" }}
        aria-valuenow={25}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

export default ProgressBar;
