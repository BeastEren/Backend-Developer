import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [node, setNode] = useState([]);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDescription, setTypedDescription] = useState('');


  // console.log("Just a test to see how many time the component is rendered");


  function fetchData() {
    axios.get('http://localhost:3000/api/nodes')
      .then((res) => {
        // console.log(res.data.node);
        setNode(res.data.node);
      })
  }
  useEffect(() => {
    fetchData();
  }, [])

  function handelSubmit(e) {
    e.preventDefault();

    // const oldData = [...node];
    // setNode([...oldData, { typedTitle, typedDescription }]); //Just for reference and for remembering to to write it without backend and database.

    if (typedTitle === '' || typedDescription === '') {
      alert('Please fill all the fields');
      return;
    }

    axios.post('http://localhost:3000/api/nodes', {
      title: typedTitle,
      description: typedDescription
    }).then((res) => {
      // setNode([...oldData, res.data.node]); //:p I thought I have to manually add new nodes but the database will automatically append the new node.
      console.log(res.data);
      fetchData();
    })

    setTypedTitle('');
    setTypedDescription('');
    // console.log(typedTitle, typedDescription, e);
  }

  function handelDelete(id) {
    axios.delete(`http://localhost:3000/api/nodes/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchData();
      })
  }

  // function handelUpdate(id) {
  //   axios.patch(`http://localhost:3000/api/nodes/${id}`, {
  //     title: typedTitle,
  //     description: typedDescription
  //   }).then((res) => {
  //     console.log(res.data);
  //     fetchData();
  //   }) 
  // }

  return (
    <>
      <form action="post" onSubmit={(e) => { handelSubmit(e) }}>
        <input type="text" name="title" placeholder="Title"
          value={typedTitle}
          onChange={(e) => setTypedTitle(e.target.value)}
        />
        <input type="text" name="description" placeholder="Description"
          value={typedDescription}
          onChange={(e) => setTypedDescription(e.target.value)}
        />
        <button type="submit">Add Node</button>
      </form>

      <div className="nodes">
        {node.map((node, index) => {
          return <div className="node" key={index}>
            <h1>{node.title}</h1>
            <p>{node.description}</p>
            <button onClick={() => { handelDelete(node._id) }}>Delete</button>
            {/* <button onClick={() => { handelUpdate(node._id) }}>Edit</button> */}
          </div>
        }
        )}
      </div>
    </>
  )
}

export default App;
