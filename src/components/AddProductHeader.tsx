import React, { useState } from 'react'
import AddProductPanel from './AddProductPanel'

const AddProductHeader = () => {
  const [openAddProductPanel, setOpenAddProductPanel] = useState(false)

  const openPanel = (open: boolean) => {
    setOpenAddProductPanel(open)
  }

  return (
    <div className='px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg'>
      <AddProductPanel open={openAddProductPanel} setOpen={openPanel} />
      <div className='sm:flex items-center justify-between'>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800'>
          Products being tracked
        </p>
        <div>
          <button
            onClick={() => openPanel(!openAddProductPanel)}
            className='inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded'>
            <p className='text-sm font-medium leading-none text-white'>
              Add product
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProductHeader
