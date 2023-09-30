import { useContext } from 'react';
import { UserContext } from '../../context/UserContext'; // Update the import path

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    return { user, setUser };
};
