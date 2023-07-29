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

