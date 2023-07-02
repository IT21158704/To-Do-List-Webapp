import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function UpdateForm({ item, onUpdate, onCancel }) {
  const [updatedItem, setUpdatedItem] = useState(item.todo);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedItem);
    axios
      .put("http://localhost:8070/todo/update/" + item._id, { todo: updatedItem })
      .then((response) => {
        console.log(response.data);
        alert("Item Updated");
        onUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="add-item" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={updatedItem}
        onChange={(e) => setUpdatedItem(e.target.value)}
      />
      <button type="submit" className="btn btn-success">Update</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

function App() {
  const [item, setItem] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);
  const [items, setItems] = useState([]);

  function sendData(e) {
    e.preventDefault();

    const newItem = {
      item,
    };

    axios
      .post("http://localhost:8070/todo/add", newItem)
      .then(() => {
        setItem("");
        getItems();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getItems() {
    axios
      .get("http://localhost:8070/todo/")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getItems();
  }, []);

  function deleteData(i) {
    axios
      .delete("http://localhost:8070/todo/delete/" + i._id)
      .then(() => {
        getItems();
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleUpdate = () => {
    setIsUpdating(null);
    getItems();
  };

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="https://github.com/IT21158704">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA0lJREFUWEft2FnotVMUx/HPa8x4g8xCmW8MmUlCyJB4TReSEEIkRDLLTIYyKyWSSIaEKJlnkTKHkCI3knnq97aPnv/ueZ7znPecizdZd+e/91rru9dee631/OdZxGTeIsbjPwO0DQ7D9lgdq2AxfIvv8DruwQuT3sAkEVoSR+M0bDDQ0ee4Hjfj1yE6Q4Hm40asNsRoy55ELgdJ1HplCNDpuJKZ5Ns5uLSPaBxQQM4Yd6oJ13OFp3bp9AGdPe40E4I0t5+LS9r0u4AOxv2Vwn5YFSdh84EwH5Xc+wBPVdd+aIuP1rzIa4qhdRtO38emjd8H4ih8hU/xGX4vr299rIN7cR/+LnqvIuViJF+U/dH7V9oidAxuryKQ0+05MCpd2x7CAdXisbhjHNCH2LBSfBtbTgn0MrarbMTXxn1Am+G9FscxtsOUQI9hnxYbAQrYAqmv7DxcWCn9VU7x8ZRAayB5s0RlJ6/58i6gR5DX1JRnsPuUMCP1R7FvZevhZm7VEXoNW1cKV+HMGQFdgPP78rMGSkjzZJuSApZCNgtJP7umMvQ9Vu66si+xVqVwC06YBQ0uw1mVrZ+wXBfQW9iiUngSe80I6AEcVNnKiLJeF9Dj2LtS+A0r4ccpoZYuw9sKlZ0XsVMXUHLlohbHKQcXTwmUqSHTQy1zHk2d1Cl+Ia7lF+yKVxYSais8j2Va9NOS0poWSA2U36nUo0aahrgJVixXdgruQorlEFkcR5SOv3yLwifYqGmvrbkeWZxGP4327tIAYziS0vB06fTX4ofK0bLIlJlpIQV17R7y43Frc70NKH97o9FMTyxAz5avjJF+RovDO5zdhnTyPnm3+PhzHFDWt0UaauB+xpolrKkjh5R5KVF4qcNj5qUHe2gyI+1YfMzZ1jfCnowbyu4rWgpa3+l3xnM9G5KLI9uDgbIxZT7lPpJykKr9zYBs3gW54ja5uu/DYdxXRwzmNNe1WN4f6d5tsltJ/OZarinz+E19BxoCFP3Upzur6a4PKLXliYbjlJK82JSRXhkKFCNL4bjypDMR7NEShZGzfPMn4b8un1KZ0ecM811UkwCNbOSfCmnAb445bKrzO/hjXFSa6wsDNIn9iff+DzQuZP8AsgGUJfU7z6YAAAAASUVORK5CYII="  class='d-inline-block align-top' alt="github logo"/>
          Github 
        </a>
      </nav>
      <div className="container">
        <h1 className="display-4">Todo App</h1>
        <div >
          <form onSubmit={sendData} className="add-item">
            <input type="text" placeholder="Add an item" id="name" className="form-control" required
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button type="submit"  className="btn btn-primary">Add</button>
          </form>
          <div>
                {items.map((item, index) => (
                  <div key={item._id}>
                    {isUpdating === item._id ? (
                      <UpdateForm
                        item={item}
                        onUpdate={handleUpdate}
                        onCancel={() => setIsUpdating(null)}
                      />
                    ) : (
                      <React.Fragment>
                        <div  className="add-item" >
                          <span className="form-control" >{index + 1}. {item.todo}</span>
                          <button onClick={() => setIsUpdating(item._id)} className="btn btn-info">Edit</button>
                          <button onClick={() => deleteData(item)} className="btn btn-danger">Delete</button>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;