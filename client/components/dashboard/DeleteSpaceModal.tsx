import React from 'react';

const DeleteSpaceModal = ({
  deleteSpace,
  setDeleteModalOpen,
  spaceId
}: {
  deleteSpace: () => void;
  setDeleteModalOpen: (value: boolean) => void;
  spaceId: string;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div className="relative z-50 m-10 flex max-w-lg flex-col items-center rounded-md border px-8 py-6 text-gray-800 shadow-lg bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 rounded-xl bg-red-50 p-2 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <p className="mt-4 text-center text-xl font-bold">Deleting Space</p>
        <p className="mt-2 text-center text-lg">
          Are you sure you want to delete the Space with Space ID {' '}
          <span className="truncate font-medium">{spaceId}</span>?
        </p>
        <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            onClick={deleteSpace}
            className="whitespace-nowrap rounded-md bg-red-500 px-4 py-3 font-medium text-white"
          >
            Yes, delete the user
          </button>
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
          >
            Cancel, keep the user
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSpaceModal;
