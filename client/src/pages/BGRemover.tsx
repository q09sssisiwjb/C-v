const BGRemover = () => {
  return (
    <div className="h-full w-full flex flex-col" style={{ margin: 0, padding: 0, border: "none", outline: "none" }}>
      <div className="flex-1" style={{ margin: 0, padding: 0 }}>
        <iframe
          src="https://wiuhh-new-bg.hf.space"
          width="100%"
          height="100%"
          title="Background Remover Tool"
          style={{ border: "none", margin: 0, padding: 0, display: "block" }}
        />
      </div>
    </div>
  );
};

export default BGRemover;
