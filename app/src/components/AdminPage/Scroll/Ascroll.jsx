import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";

const AdminScroll = () => {
  const containerRef = useRef(null);
  let scroll = null;

  useEffect(() => {
    scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1,
    });
    scroll.init();
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} data-scroll-container>
      <section className="scroll-section" data-scroll-section>
        <h1>First Section</h1>
        <p style={{ color: "white" }}>
          The CSS code you have provided looks good for creating a fixed
          background image that remains in place as you scroll. The
          background-attachment
        </p>
      </section>

      <section className="scroll-section" id="my-section" data-scroll-section>
        <h1>Second Section</h1>
        <p
          data-scroll-class="scroll-class"
          data-scroll
          data-scroll-speed="1"
          style={{ color: "white" }}
        >
          The CSS code you have provided looks good for creating a fixed
          background image.
        </p>
      </section>
      {/* <div className="Ap3">
        <div>
          <h3
            style={{
              color: "white",
              fontFamily: "Lexend Deca",
              textTransform: "uppercase",
              wordSpacing: "5px",
              fontSize: "36px",
              textAlign: "center",
              margin: "auto",
              width: "80%",
            }}
          >
            SecureKloud Platform: Streamline Your Manufacturing, Boost Your
            Security
          </h3>
          <br />
          <h5
            style={{
              color: "white",
              fontFamily: "Gothic A1",
              fontSize: "20px",
              textAlign: "center",
              width: "60%",
              margin: "auto",
            }}
          >
            The use of cryptocurrency tokens suggests that the platform employs
            the latest technology and provides an innovative solution to the
            challenges of secure manufacturing processes.
          </h5>
        </div>

        <div className="Ap4">
          <button class="Ap5">Add Manufacture</button>
        </div>
      </div>
      <br />
      <br />
      <AdminTable />
      <br /> */}
    </div>
  );
};

export default AdminScroll;
