import { ImageResponse } from "next/og";

export const alt = "Grade Calculator - Free Online Student Grade & GPA Suite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "white",
          padding: "60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "12px 28px",
            borderRadius: "50px",
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "24px",
            color: "#a5b4fc",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <span>⚡ Fast • 100% Private • Free Academic Suite</span>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "900",
            letterSpacing: "-0.03em",
            marginBottom: "20px",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Grade<span style={{ color: "#818cf8" }}>Calculator</span>.click
        </div>

        <div
          style={{
            fontSize: "26px",
            color: "#cbd5e1",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "36px",
          }}
        >
          Calculate Course Grades, Final Exam Targets, Weighted Categories, and 4.0 GPA Instantly.
        </div>

        <div
          style={{
            display: "flex",
            gap: "14px",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          <div
            style={{
              background: "#4f46e5",
              padding: "10px 24px",
              borderRadius: "12px",
            }}
          >
            Final Grade Calculator
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              padding: "10px 24px",
              borderRadius: "12px",
            }}
          >
            4.0 GPA Calculator
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              padding: "10px 24px",
              borderRadius: "12px",
            }}
          >
            Weighted Grades
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
