// filter 状态通过 props 传递到 Persons 组件：

const Persons = ({ persons, filter }) => (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            {/* 遍历 persons 数组，筛选出名字中包含 filter 的联系人。忽略大小写（toLowerCase()）。 */}
          </li>
        ))}
    </ul>
  );
  
  export default Persons;
  