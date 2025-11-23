import React from "react";
import PratyushPhoto from "../Team/Pratyush.jpeg";

const AboutMe = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      {/* BIG WHITE OUTER BOX */}
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "1100px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* SMALL WHITE BOX — ABOUT ME */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "15px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            About Me
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "12px",
                width: "220px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <img
                src={PratyushPhoto}
                alt="Pratyush"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
                Pratyush Dalmia
              </p>
            </div>
          </div>
        </div>

        {/* SMALL WHITE BOX — STORY + FEATURES */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "15px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        >
          <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>
            My name is Pratyush, a student at Mayo College Ajmer who loves
            technology, robotics, AI, and innovation. My dream is to build
            solutions that create real impact and leave a mark that lasts for
            generations.
            <br /><br />
            MEDIREADY originally started as an idea for WRO, but over time it
            evolved into a full-fledged AI-powered medical system that is
            capable of:
            <br /><br />
            <strong>• Analysing symptoms</strong>
            <br />
            <strong>• Detecting injuries</strong>
            <br />
            <strong>• Monitoring vital signs</strong>
            <br />
            <strong>• Analysing radiology reports</strong>
            <br />
            <strong>• Voice-based medical assistance</strong>
            <br />
            <strong>• Chat-based medical assistance</strong>
          </p>

          <p
            style={{
              marginTop: "1rem",
              lineHeight: "1.6",
              fontSize: "1.1rem",
            }}
          >
            This project represents my passion for building real-world solutions.
            And none of this would have been possible without the support of my
            mentors: <strong>Mr. Akash Deep Rawat</strong> and{" "}
            <strong>Mr. Chirag Saraswat</strong>.
          </p>
        </div>

        {/* SMALL WHITE BOX — MY MENTORS */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "15px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            My Mentors
          </h2>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            I sincerely thank  
            <strong> Mr. Akash Deep Rawat </strong>  
            and  
            <strong> Mr. Chirag Saraswat </strong>  
            for their constant support, guidance, and motivation in turning this
            vision into reality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

