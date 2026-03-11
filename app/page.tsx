"use client"

import { useState } from "react"

export default function Home() {
  const [courses, setCourses] = useState<any[]>([])

  const loadCourses = async () => {
    const res = await fetch("/api/courses")
    const data = await res.json()
    setCourses(data)
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>JumpToTech Learning Platform</h1>

      <button
        onClick={loadCourses}
        style={{
          padding: "10px 20px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px"
        }}
      >
        Load Courses
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
        {courses.map((course, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px"
            }}
          >
            <h3>{course.title}</h3>
            <p>Author: {course.author}</p>
            <p>Level: {course.level}</p>
            <p>Rating: {course.rating}</p>
            <p><b>{course.price}</b></p>
          </div>
        ))}
      </div>
    </div>
  )
}
