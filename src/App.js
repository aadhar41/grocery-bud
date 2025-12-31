import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'please enter value', 'danger')
    } else {
      if (isEditing) {
        const editedList = list.map((item) =>
          item.id === editId ? { ...item, name } : item
        )
        setList(editedList)
        showAlert(true, 'item edited', 'success')
        setIsEditing(false)
        setEditId(null)
      } else {
        const newItem = { id: new Date().getTime().toString(), name }
        setList([...list, newItem])
        setName('')
        showAlert(true, 'item added to the list', 'success')
      }
    }
  }

  const showAlert = (show = false, msg = '', type = 'info') => {
    setAlert({ show, msg, type })
  }

  const clearList = () => {
    showAlert(true, 'empty list', 'danger')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'item removed', 'danger')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const editedItem = list.find((item) => item.id === id)
    setName(editedItem.name)
    setList(list.filter((item) => item.id !== id))
    showAlert(true, 'item edited', 'success')
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  useEffect(() => {
    const storedList = localStorage.getItem('list')
    if (storedList) {
      setList(JSON.parse(storedList))
    }
    const clearList = () => {
      localStorage.removeItem('list')
    }
    clearList()
  }, [])

  return (
    <main>
      <section className="container card col-lg-6 col-md-6 col-sm-12 col-12 p-3">
        <form onSubmit={handleSubmit} className='grocery-form'>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              className='grocery'
              type="text"
              placeholder='e.g. eggs'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="btn">{isEditing ? 'edit' : 'submit'}</button>
          </div>
        </form>
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      </section>
    </main>
  );
}

export default App
