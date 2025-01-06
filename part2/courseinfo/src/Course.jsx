
// 接收 App 传递的 course 数据。
// 将 course 的子数据（如 name 和 parts）传递给子组件（Header、Content、Total）。
// 子组件渲染：

// Header 显示课程名称。
// Content 遍历并渲染课程的每个部分。
// Total 计算并显示练习总数。


const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
      // 接收 course 数据。
      // 调用 Header 显示课程名称。
      // 调用 Content 显示每个部分。
      // 调用 Total 显示总练习数。
      
    );
  };
  
  const Header = ({ courseName }) => <h2>{courseName}</h2>;
  // courseName 是从 Course 组件传递过来的，表示课程名称。
  
  const Content = ({ parts }) => {
    return (
      <div>
        {/* Content 遍历 parts：使用 map 遍历数组，每个元素生成一个 Part 组件  只有先生成part（里面包括name exercises）后面才能传给Part*/}
        {parts.map(part => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };

  // 遍历 parts 数组，调用 Part 组件，渲染每个部分的信息。
  // 参数：
  
  // parts 是一个数组，每个元素包含：
  // name：部分名称。
  // exercises：练习数。
  // id：唯一标识。
  // 逻辑：
  
  // map 方法遍历 parts 数组，每个部分生成一个 Part 组件。
  // key={part.id} 用来标识每个部分，避免 React 报错。
  

  // 每次调用 Part 时，name 和 exercises 会被传递到 Part，并显示在页面上：
  const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;




  
  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><strong>Total exercises: {totalExercises}</strong></p>;
    // parts 是一个数组，reduce 方法会遍历其中的每个元素。sum 是累加器，用于保存累加的结果。part 是当前遍历的元素
//     3.2 遍历过程
// reduce 遍历 parts 数组，并对每个 part 执行回调函数 (sum, part) => sum + part.exercises：

// 第一次迭代：

// sum = 0
// part = { id: 1, name: 'Fundamentals of React', exercises: 10 }
// 计算：sum + part.exercises = 0 + 10 = 10
// 更新 sum：sum = 10


  };


  
  export default Course;
  