import Blockies from 'react-blockies';

export const identiconTemplate = (address) => {
    return <Blockies size={14} scale={4} className="identicon border-2 border-white rounded-full" seed={address}>{address}</Blockies>
}