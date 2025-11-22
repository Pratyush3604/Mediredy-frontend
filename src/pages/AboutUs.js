import React from "react";
import NavanshPhoto from "../Team/Navansh.jpg";
import PratyushPhoto from "../Team/Pratyush.jpeg";
import AdheeyaanPhoto from "../Team/Adheeyaan.jpg";

const AboutUs = () => {
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
        {/* SMALL WHITE BOX — MEET THE TEAM */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "15px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Meet the Team
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {/* Navansh */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "12px",
                width: "200px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <img
                src={NavanshPhoto}
                alt="Navansh"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
                Navansh Goel
              </p>
            </div>

            {/* Pratyush */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "12px",
                width: "200px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <img
                src={PratyushPhoto}
                alt="Pratyush"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
                Pratyush Dalmia
              </p>
            </div>

            {/* Adheeyaan */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "12px",
                width: "200px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <img
                src={AdheeyaanPhoto}
                alt="Adheeyaan"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
              <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
                Adheeyaan Pareek
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
            We are a group of students who study at Mayo College Ajmer and love
            technology. We aim to lead the world and make a mark that will be
            remembered for centuries to come. This project originally started as
            just an idea for WRO, and over time it transformed into a full
            software system with AI and ML implemented into it, capable of:
            <br />
            <br />
            <strong>• Analysing symptoms</strong>  
            <br />
            <strong>• Detectig various injuries</strong>  
            <br />
            <strong>• Monitoring vital signs</strong>  
            <br />
            <strong>• Analysing radiology reports</strong>  
            <br />
            <strong>• Voice-based medical assistantance</strong>  
            <br />
            <strong>• Chat-based medical assistantance</strong>
          </p>

          <p style={{ marginTop: "1rem", lineHeight: "1.6", fontSize: "1.1rem" }}>
            We hope to continue building projects like this—projects that will
            hopefully be used in the real world but most importantly none of this would have been
            possible without our mentors: <strong>Mr. Akash Deep Rawat</strong> and{" "}
            <strong>Mr. Chirag Saraswat</strong>.
          </p>
        </div>

        {/* SMALL WHITE BOX — OUR MENTORS (TEXT ONLY) */}
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
            Our Mentors
          </h2>

          <p
            style={{
              textAlign: "center",
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            We sincerely thank our mentors  
            <strong> Mr. Akash Deep Rawat </strong>  
            and  
            <strong> Mr. Chirag Saraswat </strong>  
            for their constant guidance, support, and motivation in turning this dream of ours to a reality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
