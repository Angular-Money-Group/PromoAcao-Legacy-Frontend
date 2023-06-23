// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import { ReactSortable } from 'react-sortablejs'

// ** Reactstrap Imports
import { ListGroupItem } from 'reactstrap'

const ItineraryListGroup = ({
  items: listItems
}) => {
  // ** State
  const [listArr, setListArr] = useState(listItems)

  return (
    <ReactSortable
      ag='ul'
      className='list-group'
      list={listArr}
      setList={setListArr}
    >
      {listArr.map(item => {
        return (
          <ListGroupItem className='draggable' key={item.name}>
            <div className='d-flex align-items-center'>
              <h5 className='mb-0'>
                {item.name}
              </h5>
            </div>
          </ListGroupItem>
        )
      })}
    </ReactSortable>
  )
}

export default ItineraryListGroup
