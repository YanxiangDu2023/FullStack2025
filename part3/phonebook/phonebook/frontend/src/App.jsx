import { useState, useEffect } from 'react';
import personsService from './services/persons'; // 导入服务模块
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const [notification, setNotification] = useState({ message: '', type: '' });
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000); // 通知显示5秒后消失
  };
  


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
        setPersons([]); // 遇到错误时设置为空数组
      });
  }, []);
  

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName); // 检查是否已存在相同姓名的联系人

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }; // 创建一个包含新号码的更新对象
        personsService
          .update(existingPerson.id, updatedPerson) // 调用 update 方法向服务器发送 PUT 请求
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            // 调用 setPersons(persons.concat(returnedPerson)) 会将新联系人添加到 persons 数组中，并触发 React 的重新渲染。
            // 更新状态，将新联系人添加到列表中
            setNewName(''); // 清空输入框
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}'s number`, 'success');
        })
        .catch(error => {
          showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error');
          });
      }
    } else { // 如果联系人不存在
      const newPerson = { name: newName, number: newNumber }; // 创建新的联系人对象
      personsService
        .create(newPerson) // 调用 create 方法向服务器发送 POST 请求
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          // 更新状态，将新联系人添加到列表中
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${returnedPerson.name}`, 'success');
      })
      .catch(error => {
        showNotification('Failed to add the contact', 'error');
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${person.name}`, 'success');
        })
        .catch(error => {
          showNotification(`Information of ${person.name} has already been removed from server`, 'error');
        });
    }
  };
  

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
