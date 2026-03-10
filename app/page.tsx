"use client";

import { useEffect, useState } from "react";

type Course = {
  id: number;
  title: string;
  author: string;
  level: string;
  price: string;
  rating: number;
};

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load courses:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 18 }}>JumpToTech</div>
          <div style={{ flex: 1 }} />
          <button
            style={{
              border: "1px solid #111",
              background: "#111",
              color: "white",
              padding: "8px 12px",
              borderRadius: 10,
              fontWeight: 700,
            }}
          >
            Sign up
          </button>
        </div>
      </header>

      <section style={{ background: "linear-gradient(180deg,#f7f7ff,white)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "48px 16px 24px",
          }}
        >
          <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: "0 0 10px" }}>
            Learn DevOps with real projects
          </h1>
          <p style={{ fontSize: 16, opacity: 0.8, maxWidth: 620 }}>
            Kubernetes, AWS, Terraform, GitOps, CI/CD. A simple Udemy-like learning platform built with
            microservices.
          </p>
        </div>
      </section>

      <section style={{ background: "#fafafa", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "26px 16px 44px" }}>
          <h2 style={{ fontSize: 22, margin: 0 }}>Popular courses</h2>

          {loading ? (
            <p style={{ marginTop: 16 }}>Loading courses...</p>
          ) : (
            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              {courses.map((course) => (
                <article
                  key={course.id}
                  style={{
                    border: "1px solid #eee",
                    borderRadius: 16,
                    background: "white",
                    overflow: "hidden",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      height: 120,
                      background:
                        "linear-gradient(135deg, rgba(84,67,255,0.18), rgba(17,17,17,0.08))",
                      padding: 14,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 12,
                        background: "#111",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: 999,
                      }}
                    >
                      Bestseller
                    </div>
                    <div style={{ fontSize: 20 }}>🎓</div>
                  </div>

                  <div style={{ padding: 14 }}>
                    <div style={{ fontWeight: 900, lineHeight: 1.25 }}>{course.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
                      {course.author}
                    </div>

                    <div style={{ marginTop: 10, fontSize: 13 }}>
                      <span style={{ fontWeight: 900 }}>{course.rating}</span>{" "}
                      <span style={{ opacity: 0.8 }}>⭐</span>
                    </div>

                    <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
                      {course.level}
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontWeight: 1000, fontSize: 16 }}>{course.price}</div>
                      <button
                        style={{
                          border: "1px solid #111",
                          background: "#111",
                          color: "white",
                          padding: "9px 12px",
                          borderRadius: 12,
                          cursor: "pointer",
                          fontWeight: 800,
                          fontSize: 13,
                        }}
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
