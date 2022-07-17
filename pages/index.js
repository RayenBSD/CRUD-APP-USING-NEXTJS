import { useState } from 'react';
import styles from '../styles/Home.module.css'

let id = 0, data1 = [], index1 = 0;

export default function Home() {

  const [data, setData] = useState([]);
  //console.log(data, data1);

  //true if data.length > 0 else false
  const [none, setNone] = useState(false);

  const [activeTable, setActiveTable] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  //console.log(name, email, number);

  const reset = () => {
    setName('');
    setEmail('');
    setNumber('');
  }

  const createData = (e) => {
    e.preventDefault();
    
    //console.log(name, email, typeof number);
    if (isNaN(name) && !isNaN(number) && isNaN(email)) {
      const newData = {
        id: ++id,
        name: name,
        email: email,
        number: number,
      }

      data1.push(newData);
      setData(data1);
      setNone(true);
      setActiveTable(true);
      reset();

      return;
    }
    alert("Check your Data");
  }

  const generate = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let name1 = '', email1 = '', number1 = '';

    for (let i = 0; i < 8; i++) {
      name1 += chars[Math.floor(Math.random() * (chars.length-1))];
    }
    setName(name1);

    for (let i = 0; i < 8; i++) {
      email1 += chars[Math.floor(Math.random() * (chars.length-1))];
    }
    setEmail(`${email1}@gmail.com`);

    for (let i = 0; i < 10; i++) {
      number1 += chars[Math.floor(Math.random() * 9)];
    }
    setNumber(number1);
  }

  const removeData = (id) => {
    data1 = data1.filter(dt => dt.id !== id);
    setData(data1);
    if (data1.length === 0) {
      setNone(false);
      setActiveTable(false);
    }
  }

  const deleteAll = () => {
    data1 = [];
    setData(data1);
    setNone(false);
    setActiveTable(false);
    reset();
    setOnEdit(false);
  }

  const edit = (id) => {
    index1 = data1.findIndex(dt => dt.id === id);
    //console.log(index1);

    setOnEdit(true);

    setName(data1[index1]?.name);
    setEmail(data1[index1]?.email);
    setNumber(data1[index1]?.number);
  }

  const update = (e) => {
    e.preventDefault();

    if (isNaN(name) && !isNaN(number) && isNaN(email)) {
      data1[index1].name = name;
      data1[index1].email = email;
      data1[index1].number = number;
      setData(data1);
      setOnEdit(false);
      reset();
      return;
    }
    alert("Check your Data");
  }

  return (
    <div className={styles.Home}>
      <h1>CURD APP USING NEXT.JS</h1>

      {!onEdit && <form onSubmit={(e) => createData(e)}>
        <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}/>

        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>

        <input type="text" placeholder='Enter your phone-number' value={number} onChange={(e) => setNumber(e.target.value)}/>

        <input type="submit" value="Save"/>
      </form>}

      {onEdit && <form onSubmit={(e) => update(e)}>
        <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}/>

        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>

        <input type="text" placeholder='Enter your phone-number' value={number} onChange={(e) => setNumber(e.target.value)}/>
        
        <input type="submit" value="Update"/>
      </form>}

      <div>
        {!onEdit && <button onClick={generate}>Generate</button>}
        {(none && !onEdit) && <button onClick={deleteAll}>Delete All</button>}
      </div>

      {activeTable && (<table border="2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
          data.map (dt => (
            <tr key={dt.id}>
              <td>{dt.id}</td>
              <td>{dt.name}</td>
              <td>{dt.email}</td>
              <td>{dt.number}</td>
              <td><button onClick={() => edit(dt.id)}>Edit</button></td>
              <td><button onClick={() => removeData(dt.id)}>Delete</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>)}
    </div>
  )
}
