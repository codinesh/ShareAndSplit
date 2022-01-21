import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'

const FullScreenModal: React.FC<{
  open: boolean
  onClose: () => void
  title?: string
}> = (props) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed z-10 inset-0 overflow-y-auto'
        open={props.open}
        onClose={props.onClose}>
        <div className='flex w-full'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-white bg-opacity-100 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div className='inline-block h-screen w-screen transform transition-all  '>
              <div className='flex flex-col'>
                <div>
                  <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                    <button
                      type='button'
                      className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={() => props.onClose()}>
                      <span className='sr-only'>Close</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  {props.title && (
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'>
                        {props.title}
                      </Dialog.Title>
                    </div>
                  )}
                </div>
                <div className=' my-10 mx-4 print:mx-0 print:my-0'>
                  {props.children}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default FullScreenModal
