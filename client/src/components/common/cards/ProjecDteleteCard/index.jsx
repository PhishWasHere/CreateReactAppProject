import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import Auth from '../../../../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_PROJECT } from '../../../../utils/mutations';

export default function ProjectDelete () {
    const [showComponent, setShowComponent] = useState(true);
    const { id } = useParams();

    const [removeProject, {error}] = useMutation(REMOVE_PROJECT);

    const handleClick = () => {
        setShowComponent((prevShowComponent) => !prevShowComponent);
    }

    const navigate = useNavigate();
    const handleDelete = async () => { 
        try {
             await removeProject({
                variables: {
                    projectId: id,
                    userid: Auth.getProfile().data._id
                },
            });
            navigate ("/"); //figure out how to reload data
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <form>
            <div className={showComponent ? "overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0 md:h-full" : 'hidden'}>
                <div className="p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative p-4 text-center bg-base-100 border border-base-200 rounded-lg shadow sm:p-5">
                        <p className="mb-4 text-gray-500 dark:text-gray-300 mt-3">Are you sure you want to delete this project?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <button onClick={handleClick} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button>
                            <button type="submit" onClick={() => handleDelete()} className="py-2 px-3 text-sm font-medium text-center rounded-lg btn-error text-gray-900 focus:ring-4 focus:outline-none ">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

{/* <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
<span className="sr-only">Close modal</span>
</button> */}