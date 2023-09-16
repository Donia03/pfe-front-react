import { useContext } from 'react';
import { DiffusionsContext } from '../../context/DiffusionsContext';

export const useDiffusionLists = () => {
    const { diffusionLists, setDiffusionLists } = useContext(DiffusionsContext);
    return { diffusionLists, setDiffusionLists };
};
