import React,{Component} from 'react';
import {Button} from '../../reusables/Button/Button';
import './Modal.css'

class Modal extends Component {

    render() {
        const {size, open, title, closeSettings} = this.props;

        if (open) {
        return (
        <div className='overlay'>
            <div className={`modal-container ${size}`} >
                <header className='modal-header'>
                <div>{title}</div>    
                <Button classes={'close-button'} content={'X'} onClick={closeSettings}/>
                </header>
               {this.props.children}
            </div>
        </div>
        )}
        else return <div className={'closed'} />

    }
}

export {Modal};