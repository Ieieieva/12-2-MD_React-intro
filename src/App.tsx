import { useState, useEffect } from 'react'
import './App.css'

interface Item {
  id: number,
  value: string,
}

function App() {
  const [newItem, setNewItem] = useState<string>("");
  const [items, setItems] = useState<Item[]>(() => {
    const localData = localStorage.getItem('item');
    return localData ? JSON.parse(localData) : []
  });
  

  const addItem = () => {
    if (!newItem) {
      alert("Enter task!");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 10),
      value: newItem
    }

    setItems((oldList) => [...oldList, item])
    setNewItem("")
  }

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(items));
  }, [items]);

  const deleteItem = (id: number) => {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray)
  }

  return (
    <div className='app'>
      <header>
        <h1 className='app__heading'>My TO - DO list</h1>
      </header>
      <section className='main'>
        <form 
          className='main__form'
          onSubmit={(e) => {
            e.preventDefault()
          }}>
          <label className='main__input--label'>
            Add new task:
            <input 
              className='main__input' 
              type='text'
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              placeholder='learn React'>
            </input>
          </label>
          <button 
            className='button btn-add'
            onClick={() => addItem()}>
              ADD
          </button>
        </form>
        <ul className='todo-list'>
          {items.map((item: any) => {
            return (
              <li 
                className='list-tems' 
                key={item.id}>
                  <label className="checkbox">
                    <input className="checkbox__input" type="checkbox" name="agreed"></input>
                      <div className="checkbox__box"></div>
                  </label>
                  {item.value}
                  <button 
                    className='button btn-delete' 
                    onClick={() => deleteItem(item.id)}>
                      DELETE
                  </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )

}

export default App
