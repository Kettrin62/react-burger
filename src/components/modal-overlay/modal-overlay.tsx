import * as React from 'react';
import * as ReactDOM from 'react-dom';
import modaloverlayStyles from './modal-overlay.module.css';
import { FC } from 'react';

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose })=> {
  return (
    <div className={modaloverlayStyles.overlay} onClick={onClose}>
    </div>
  );
};