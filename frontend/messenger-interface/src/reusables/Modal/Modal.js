import React,{Component} from 'react';
import {Button} from '../../reusables/Button/Button';
import './Modal.css'

class Modal extends Component {

    render() {
        const {size, open, closeSettings} = this.props;

        if (open) {
        return (
        <div className='overlay'>
            <div className={`modal-container ${size}`}   >
                <Button classes={'close-button'} content={'X'} onClick={closeSettings}/>
               {this.props.children}
            </div>
        </div>
        )}
        else return <div className={'closed'} />

    }
}

export {Modal};