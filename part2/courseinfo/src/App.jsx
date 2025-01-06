import React from 'react';
import Course from './Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 }
      ]
    }
  ];

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => (
        // 用map遍历，用id区分不同course 逐个显示
        <Course key={course.id} course={course} />
        // 使用 <Course course={course} /> 调用 Course 组件，并将 course 数据通过 props 传递给它。
      ))}
    </div>
  );
};

export default App;
