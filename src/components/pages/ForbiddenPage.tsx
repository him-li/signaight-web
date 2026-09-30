import type { NextPage } from "next";

const ForbiddenPage: NextPage = () => {
  return (
    <main
      className="forbidden"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gridRowStart: 1,
        gridRowEnd: 13,
        gridColumnStart: 1,
        gridColumnEnd: 12,
        width: "100%",
      }}
    >
      <section>
        <h1>Sorry, you are not authorized to access this page.</h1>
      </section>
    </main>
  );
};

export default ForbiddenPage;
